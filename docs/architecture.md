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

## Architecture draft

```mermaid
sequenceDiagram

Frontend ->> App: socketio /gameconnection startgame
App ->> Api: start(Github Url)
GitHub ->> Api: Clone the given repository
Api ->> SocketIOService: create a new service
Api ->> GameFactory: Create a chess game
GameFactory ->> Chess: Create

Api ->> Chess: Play

Chess ->> player1: play("")
player1 -->> Chess: move1

Chess ->> judge: validate(move1)
judge -->> Chess: True
Chess ->> SocketIOService: send game state
SocketIOService ->> Frontend: socketio /gameconnection newmove

Chess ->> player2: play(move1)
player2 -->> Chess: move2

Chess ->> judge: validate(move2)
judge -->> Chess: False

Note over Chess: The game ends, either invalid move or player2 lost
Chess ->> SocketIOService: send game state
SocketIOService ->> Frontend: socketio /gameconnection newmove


box Container
    participant Frontend
    participant App
    participant Api
    participant Chess
    participant player1
    participant player2
    participant judge
end
```

## Backend

```mermaid
classDiagram

App --> Api
Api ..> Game
Api --> GameFactory
Game --> Player
Game --> Judge
Game --> Move
Game --> SocketIOService
GameFactory --> Game
GameFactory ..> Judge
GameFactory ..> Player
GameFactory ..> SocketIOService
Judge --> GameState
Player --> PlayerLogger

SocketIOService ..> Move

class GameFactory {
    get_chess_game(player1_file: Path, player2_file: Path, judge: Judge, socketio_service: SocketIOService) Game
    get_othello_game(player1_file: Path, player2_file: Path, judge: Judge, socketio_service: SocketIOService) Game
}

class Game {
    -players: list[Player]
    -judge: Judge
    -socketio_service: SocketIOService

    play(turns: int, delay: float, debug: bool) dict
}

class SocketIOService {
    +send(move: Move)
}

class Judge {
    validate(move: str) bool
    add_move(move: str)
    get_all_moves() list[str]
    get_debug_info() str
}

class Player {
    +play(move: str) str
}

class GameState {
    CONTINUE
    WIN
    DRAW
    INVALID
    ILLEGAL
    MAX_TURNS
}

class PlayerLogger {
    logs: str[]
}

class Move {
    move: str,
    state: GameState,
    time: int,
    evaluation: int
}

class Api {
    start(file: str) dict
}

class App {
    route1()
    route2()
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

gameReducer --> SocketService
moveReducer <-- SocketService

boardIndexReducer ..> nextBoard
boardIndexReducer ..> previousBoard

SocketService ..> gameConfig

resetReducer ..> moveReducer
resetReducer ..> boardReducer
resetReducer ..> gameReducer
resetReducer ..> boardIndexReducer

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
        newBoard(board: BoardProps) newBoard
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
        payload: BoardProps
    }

    class newGame {
        payload: gameConfig
    }

    class nextBoard

    class previousBoard
}

```
