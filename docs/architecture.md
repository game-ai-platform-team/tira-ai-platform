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
    participant HPCService
    participant SSHConnection
    participant BatchBuilder
end

Frontend ->>+ App: ws://.../gameconnection startgame

App ->>+ API: start(game, repo, difficulty)

API ->>+ HPCService: HPCService()
    HPCService ->>+ SSHConnection: connect()
    SSHConnection ->>+ HPC: Connect over SSH
    HPC -->>- SSHConnection: 
    SSHConnection -->>- HPCService: connection
HPCService -->>- API: service

API ->>+ HPCService: submit(game, repo, difficulty)
    HPCService ->>+ BatchBuilder: create_script(game, repo, difficulty, id)
    BatchBuilder -->>- HPCService: script_path

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

API ->>+ HPCService: close()
    HPCService ->>+ SSHConnection: close()
    SSHConnection ->>+ HPC: Close connection
    HPC -->>- SSHConnection: 
    SSHConnection -->>- HPCService: 
HPCService -->>- API: 

API -->>- App: 
App -->>- Frontend: 
```

## Backend

```mermaid
classDiagram

App --> API

API ..> SocketService
API ..> SSHConnection
API ..> HPCService
HPCService --> SSHConnection
HPCService --> BatchBuilder

Image --> GameFactory
Image ..> Game

GameFactory ..> Judge
GameFactory ..> Player
GameFactory --> Game
Game --> Player
Game --> Judge
Game --> Move
Judge --> GameState
Player --> PlayerLogger

SocketService ..> Move

class API {
    start(socket_service: SocketService, repository_url: str, difficulty: int, game: str)
}

class GameFactory {
    +get_game(game: str, repository: Repo, difficulty: int) Game
}

class HPCService {
    <<AbstractContextManager>>
    +submit(game: str, repository_url: str, difficulty: int)
    +read_output() list[str]
}

class BatchBuilder {
    +create_script(game: str, repository_url: str, difficulty: int, id: str) Path
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
        -players: list[Player]
        -judge: Judge

        +play(turns: int, delay: float, debug: bool) dict
    }

    class Judge {
        +validate(move: str) bool
        +add_move(move: str)
        +get_all_moves() list[str]
        +get_debug_info() str
        +analyze() float
    }

    class Player {
        +play(move: str) str
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

    class PlayerLogger {
        +logs: str[]
    }

    class Move {
        +move: str,
        +state: GameState,
        +time: int,
        +evaluation: int
    }
}
```

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
}
```

### React Redux part and logic

```mermaid
classDiagram

store -- moveReducer
store -- gameReducer
store -- boardReducer

gameReducer ..> newGame
moveReducer ..> newMove
boardReducer ..> newBoard
newGame ..> gameConfig

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
        resetGame() resetGame
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

    class nextBoard

    class previousBoard
}

```
