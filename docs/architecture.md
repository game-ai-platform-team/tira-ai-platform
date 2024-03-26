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
Api ->> SocketService: create a new service
Api ->> GameFactory: Create a chess game
GameFactory ->> Chess: Create

Api ->> Chess: Play

Chess ->> player1: play("")
player1 -->> Chess: move1

Chess ->> judge: validate(move1)
judge -->> Chess: True
Chess ->> SocketService: send game state
SocketService ->> Frontend: socketio /gameconnection newmove

Chess ->> player2: play(move1)
player2 -->> Chess: move2

Chess ->> judge: validate(move2)
judge -->> Chess: False

Note over Chess: The game ends, either invalid move or player2 lost
Chess ->> SocketService: send game state
SocketService ->> Frontend: socketio /gameconnection newmove


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
App --> IAMService
Api ..> Game
Api --> GameFactory
Api ..> SocketService
Game --> Player
Game --> Judge
Game --> Move
Game --> SocketService
GameFactory --> Game
GameFactory ..> Judge
GameFactory ..> Player
GameFactory ..> SocketService
Judge --> GameState
Player --> PlayerLogger

SocketService ..> Move

class GameFactory {
    get_game(socket_service: SocketService, game: str, repo: ClonedRepository, elo: int) Game
}

class Game {
    -players: list[Player]
    -judge: Judge
    -socket_service: SocketService

    play(turns: int, delay: float, debug: bool) dict
}

class SocketService {
    +send(move: Move)
}

class Judge {
    validate(move: str) bool
    add_move(move: str)
    get_all_moves() list[str]
    get_debug_info() str
    analyze() float
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
    start(socket_service: SocketService, github_url: str, elo: int, active_game: str,) dict
}

class App {
    route1()
    route2()
}

class IAMService {
    authorize() bool
    get_role() str
    check_access(role: str, action: str)
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
