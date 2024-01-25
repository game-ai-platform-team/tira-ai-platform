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

Frontend ->> App: HTTP POST /api/chess/submit file

App ->> Api: start(file)
Api ->> Chess: Chess(file)
Chess -->> Api: chess object
Api ->> Chess: start()

Chess ->> player1: play("")
player1 -->> Chess: move1

Chess ->> judger: validate(move1)
judger -->> Chess: True

Chess ->> player2: play(move1)
player2 -->> Chess: move2

Chess ->> judger: validate(move2)
judger -->> Chess: False
Note over Chess: The game ends, either invalid move or player2 lost

Chess -->> Api: game result as dict
Api -->> App: game result as dict

App -->> Frontend: HTTP Response game result as JSON

box Container
    participant Frontend
    participant App
    participant Api
    participant Chess
    participant player1
    participant player2
    participant judger
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
Game --> SocketIOService
GameFactory --> Game
GameFactory ..> Judge
GameFactory ..> Player
GameFactory ..> SocketIOService
Judge --> GameState

class GameFactory {
    initialize_chess_game(player1_file: Path, player2_file: Path, judge: Judge, socketio_service: SocketIOService) Game
    initialize_othello_game(player1_file: Path, player2_file: Path, judge: Judge, socketio_service: SocketIOService) Game
}

class Game {
    players: list[Player]
    judge: Judge
    socketio_service: SocketIOService

    play(turns: int, delay: float, debug: bool) dict
}

class SocketIOService {
    +send(move: str)
}

class Judge {
    validate(move: str) bool
    add_move(move: str)
    get_all_moves() list[str]
    get_debug_info() str
}

class Player {
    +play(move) str
}

class GameState {
    CONTINUE
    WIN
    DRAW
    INVALID
    ILLEGAL
}

class Api {
    start(file: JSON) dict
}

class App {
    route1()
    route2()
}
```
