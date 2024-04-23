# Architecture

## Sequence diagrams

### Submitting AI and playing a game

```mermaid
sequenceDiagram

participant Frontend

box Back-end
    participant App
    participant API
    participant Image
    participant HPCService
    participant SSHConnection
end

Frontend ->>+ App: ws://.../gameconnection startgame

App ->>+ API: start(game, repo, difficulty)
API ->>+ Image: Image(game, repo, difficulty)
    Image ->> Image: build()
Image -->>- API: image

API ->>+ HPCService: HPCService(image.id)
    HPCService ->>+ SSHConnection: connect()
    SSHConnection ->>+ HPC: Connect over SSH
    HPC -->>- SSHConnection: 
    SSHConnection -->>- HPCService: connection
HPCService -->>- API: service

API ->>+ HPCService: submit(image_path)
    HPCService ->>+ SSHConnection: send_file(image_path)
        SSHConnection ->>+ HPC: image file
        HPC -->>- SSHConnection: 
    SSHConnection -->>- HPCService: remote_path

    HPCService ->> HPCService: create_script(id)

    HPCService ->>+ SSHConnection: send_file(script_path)
        SSHConnection ->>+ HPC: script file
        HPC -->>- SSHConnection: 
    SSHConnection -->>- HPCService: remote_path

    HPCService ->>+ SSHConnection: execute("sbatch script")
        SSHConnection -)+ HPC: sbatch script
        
    SSHConnection -->>- HPCService: 
HPCService -->>- API: 

loop Every second
    API ->>+ HPCService: read_output()
        HPCService ->>+ SSHConnection: read_file(output_file)
        SSHConnection ->>+ HPC: Read output_file
        HPC -->>- SSHConnection: file content
        SSHConnection -->>- HPCService: file content

        HPCService -->> HPCService: Remove duplicate lines

    HPCService -->>- API: new lines in file

    loop while new lines
        API ->> Frontend: ws://.../newmove {move: "e1e6", state: "CONTINUE", time: 100, evaluation: 1, logs: "Logs" }
    end
end

deactivate HPC

API -->>- App: 
App -->>- Frontend: 
```

> [!NOTE]
> Python context manager closes connections and removes temporary files.

## Backend

```mermaid
classDiagram

App --> API

API ..> SocketService
API ..> HPCService
API ..> Image
HPCService --> SSHConnection

Image ..> run_image: Dockerfile
run_image ..> Game
run_image --> GameFactory
run_image --> PlayerFactory

PlayerFactory --> Player

GameFactory ..> Judge
GameFactory ..> Player
GameFactory --> Game
Game --> Player
Game --> Judge
Game --> Move
Judge --> GameState

SocketService ..> Move

namespace backend {
    class App

    class API {
        start(socket_service: SocketService, repository_url: str, difficulty: int, game: str)
    }

    class HPCService {
        <<AbstractContextManager>>
        +submit(image_path: Path)
        +read_output() list[str]
        -create_script(image_path: Path) Path
    }

    class Image {
        <<AbstractContextManager>>
        +id: str
        +path: Path
    }

    class SSHConnection {
        <<AbstractContextManager>>
        +execute(command: str)
        +send_file(file: Path)
        +read_file(file: Path) list[str]
    }

    class SocketService {
        +send(move: Move)
    }
}

namespace game-image {
    class run_image

    class GameFactory {
        +get_game(game: str, player1: Player, player2: Player) Game
    }

    class PlayerFactory {
        +get_local_player(game: str, difficulty: int) Player
        +get_remote_player(repository: Repo) Player
    }
}

namespace duo-game-lib {
    class Game {
        <<AbstractContextManager>>

        -players: list[Player]
        -judge: Judge
        -logger: Callable

        +play(turns: int, debug: bool)
    }

    class Judge {
        +validate(move: str) GameState
        +is_game_over() GameState
        +add_move(move: str)
        +get_all_moves() list[str]
        +get_debug_info() str
        +analyze() float | int
    }

    class Player {
        <<AbstractContextManager, ABC>>
        +play(move: str) str
        +pop_logs() str
    }

    class GameState {
        <<Enum>>

        CONTINUE
        WIN
        DRAW
        INVALID
        ILLEGAL
        MAX_TURNS
    }

    class Move {
        +move: str,
        +state: GameState,
        +time: int,
        +evaluation: int
    }
}
```

> [!NOTE]
>
> - `Player` represents AI, both local and repository-based.
>   It is responsible for providing unified interface across different engines.
> - `game-image` currently contains chess-related classes that should be moved to own repository, see [#18](https://github.com/game-ai-platform-team/tira-ai-platform/issues/18)

## Frontend

Frontend uses React Redux to store and access states.

### UI architecture

```mermaid
classDiagram
store -- App: Provider

App --> NavigationBar
App --> GameView

NavigationBar --> LoginView
LoginView --> LoginService

GameView --> SubmitForm
GameView --> StatisticsService
GameView --> MoveList
GameView --> Board
GameView --> AdvantageBar

Board <|-- ChessBoard
Board --> BoardProps

MoveList --> Move
Move --> MoveStatistics

SubmitForm --> gameReducer: newGame
SubmitForm --> toastReducer: setToast
Board -- store
MoveList -- store
AdvantageBar -- store

namespace interfaces {
    class MoveStatistics {
    <<interface>>
    move: string
    time: number
    evaluation: number
    logs: string
    }

    class BoardProps {
        <<interface>>
        increaseMove?: MouseEventHandler
        decreaseMove?: MouseEventHandler
    }
}

namespace services {
    class StatisticsService {
        +getStatistics()
        +getEvaluations()
        +uciToPGN()
    }

    class LoginService {
        + login()
        + logout()
    }
}

namespace UI {
    class App
    class NavigationBar
    class GameView
    class SubmitForm
    class AdvantageBar
    class Board
    class ChessBoard
    class Move
    class MoveList
    class LoginView
    class Notification
}
```

### React Redux part

#### The structure of store

```ts
{
    moves: Array<MoveStatistics>(),
    game: {
        isGameRunning: boolean,
        state: GameState,
        config: GameConfig,
    },
    boards: {
        chessBoards: Array<string>,
        connectFourBoards: Array<Array<number>>,
    },
    boardIndex: number,
    logs: string,
    notification: {
        title: string,
        text: string,
        color: string,
    }
}
```

#### Actions

- moves
  - createMove
  - resetMoves
- game
  - newGame
  - resetGame
  - updateState
- boards
  - new\<GameName\>Board
  - reset\<GameName\>Boards
- boardIndex
  - setBoardIndex
  - nextBoard
  - previousBoard
  - resetBoardIndex
- logs
  - setLog
  - resetLogs
- notification
  - setToast
