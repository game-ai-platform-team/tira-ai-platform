# Architecture

## Submitting file from front-end and run chess game

## Container Game Flow

```mermaid
graph LR
    client -- Zip File --> frontend

    frontend -- Zip File --> app

    game -. Periodic move data \n after validation .-> app
    app -. Periodic HTTP packet \n containing move data .-> frontend
    app -- Zip File  --> game
    game <-- move --> player1
    game <-- move --> player2
    game <-- validate move --> validator
    game -- game state --> app
    game -- save file --> game
    app -- HTTP 200 finishing packet --> frontend

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
- Game container is separate from app because we're running a foreign script in it.
- Factory class is responsible for instantiating correct player1, player2, validator

## Initial architecture draft

```mermaid
sequenceDiagram

Frontend ->> App: socketio /gameconnection postcode

App ->> Api: start(file)
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
Player ..> PlayerLogger

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
GameView --> MoveList
GameView --> Board
GameView --> AdvantageBar

Board <|-- ChessBoard
Board --> BoardProps

MoveList --> Move
Move --> MoveProps

SubmitForm --> gameReducer: NEW_GAME
Board -- store
MoveList -- store
AdvantageBar -- store

namespace interfaces {
    class MoveProps {
    <<interface>>
    move: string
    time: number
    advantage:
    }

    class BoardProps {
        <<interface>>
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

gameReducer ..> NEW_GAME
gameReducer ..> END_GAME
moveReducer ..> NEW_MOVE
boardReducer ..> NEW_BOARD
NEW_GAME ..> gameConfig

gameReducer --> SocketService
gameReducer --> StatisticsService
moveReducer <-- SocketService

SocketService ..> gameConfig

namespace services {
    class SocketService {
        +startGame(config: gameConfig)
    }

    class StatisticsService {
        +getStatistics()
    }
}

class gameConfig {
    difficulty: string | number
    depth: number
    player1File: string
    player2File: string
}

class store {
    moves: MoveProps[]
    boards: BoardProps[]
    boardIndex: number
    in_progress: boolean
    game_result: GameResult
}


namespace ReducersAndActionCreators {
    class moveReducer {
        <<module>>
        moveReducer(state, action)
        newMove(move: MoveProps) NEW_MOVE
    }

    class gameReducer {
        <<module>>
        gameReducer(state, action)
        newGame(gameConfig) NEW_GAME
        endGame() END_GAME
    }

    class boardReducer {
        <<module>>
        boardReducer(state, action)
        newBoard(board: BoardProps) NEW_BOARD
    }
}

namespace Actions {
    class NEW_MOVE {
        payload: MoveProps
    }

    class NEW_BOARD {
        payload: BoardProps
    }

    class NEW_GAME {
        payload: gameConfig
    }

    class END_GAME
}

```
