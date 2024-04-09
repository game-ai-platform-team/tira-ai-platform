# Architecture

## Submitting file from front-end and run chess game

## Container Game Flow

```mermaid
graph LR
    client -- Github Url --> frontend

    frontend -- start socketio message with github Url --> app

    game -. Periodic move data \n after validation .-> app
    app -. Periodic socketio messages  \n containing move data .-> frontend
    app -- Github Url  --> game
    game <-- move --> player1
    game <-- move --> player2
    game <-- validate move --> validator
    game -- game state --> app
    game -- save file --> game
    app -- Finishing socketio message --> frontend


    GitHub -- Clone a github repository --> game

    subgraph appContainer
    app
    end
    subgraph gameContainer
    game
    player1
    validator
    player2
    end

    subgraph Clientside
    client
    frontend
    end

    style Clientside fill:#FFC0CB,stroke:#333,stroke-width:2px
```

- Periodic data is sent every time a move is validated. This is described by the dotted arrow.
- The cycle described by the line arrow only occurs once.
- Container architecture will probably change
- Factory class is responsible for instantiating correct player1, player2, validator

## Sequence diagram

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

API ->>+ HPCService: HPCService()
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
API ..> SSHConnection
API ..> HPCService
API ..> Image
HPCService --> SSHConnection

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

namespace Factories {
    class GameFactory {
        +get_game(game: str, player1: Player, player2: Player) Game
    }

    class PlayerFactory {
        +get_local_player(game: str, difficulty: int) Player
        +get_remote_player(repository: Repo) Player
    }
}

namespace Network {
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

### Notes

- `Player` represents AI, both local and repository-based.
  It is responsible for providing unified interface across different engines.

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

### React Redux part and logic

```mermaid
classDiagram

store -- moveReducer
store -- gameReducer
store -- boardReducer
store -- toastReducer

gameReducer ..> newGame
gameReducer ..> updateGame
gameReducer ..> updateState
gameReducer ..> resetGame
moveReducer ..> newMove
boardReducer ..> newBoard
newGame ..> gameConfig
toastReducer ..> setToast


moveReducer <-- SocketService

boardIndexReducer ..> nextBoard
boardIndexReducer ..> previousBoard

SocketService ..> gameConfig

resetReducer ..> moveReducer
resetReducer ..> boardReducer
resetReducer ..> gameReducer
resetReducer ..> boardIndexReducer

note for newBoard "Each game has own newBoard action"

namespace services {
    class SocketService {
        +startGame(config: gameConfig)
    }
}

class gameConfig {
    elo: string | number
    depth: number
    GithubUrl: string 
}

class store {
    moves: MoveStatistics[]
    boards: BoardProps[]
    boardIndex: number
    in_progress: boolean
    game_result: GameResult
    notification: string
}


namespace ReducersAndActionCreators {
    class moveReducer {
        <<module>>
        moveReducer(state, action)
        newMove(move: MoveStatistics) newMove
        resetMoves() resetMoves
    }

    class gameReducer {
        <<module>>
        gameReducer(state, action)
        newGame(gameConfig) newGame
        updateGame(state, action)
        resetGame() resetGame
        updateState(state, action)
    }

    class boardReducer {
        <<module>>
        boardReducer(state, action)
        resetBoards() resetBoards
    }

    class boardIndexReducer {
        <<module>>
        nextBoard(state, action)
        previousBoard(state, action)
        newBoard(board: BoardProps) newBoard
        resetBoardIndex() resetBoardIndex
    }
    
    class resetReducer {
    }

    class toastReducer {
        <<module>>
        setToast(_, action)
    }
}

namespace Actions {
    class newMove {
        payload: MoveStatistics
    }

    class newBoard {
        payload: MoveStatistics
    }

    class newGame {
        payload: gameConfig
    }

    class updateGame {
        payload: string
    }

    class updateState {
        payload: GameState
    }

    class setToast {
        payload: string
    }

    class nextBoard

    class previousBoard

    class resetGame
}

```
