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
