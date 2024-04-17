# Connect Four API

In short, the server will always provide a move and then ask for your AI to play the next move. The only output your AI needs to make is `MOVE:<move>` when the server inputs the `PLAY:` command.

[Example of a simple connect four application compatible with Tira-AI-Platform](https://github.com/game-ai-platform-team/stupid-connect-four-ai)


## Notation

Moves are indicated by the number of the column into which the piece is to be dropped. Columns are numbered starting from the left:
```
|0|1|2|3|4|5|6|
```

## AI Communication Protocol (Input)

The server communicates with your AI using the standard pipe (command line). Your AI should read these commands as it would read any other input from the command line. In Python this would be `input()`. 

There are two commands that are being used. The commands follow the format:

```
TAG:DATA
```

`TAG` represents the type of command and `DATA` is the accompanying data.

### Tags

-   `MOVE:<move>`

    -   Server will provide its move in this format.
    -   Your AI should give its move in this format.
    -   **Data Format**: The move made.
    -   **Example**: `MOVE:3` indicates a move made into the middle column.

-   `PLAY:`

    -   This is the command the server will use to ask for your AI to make a new move.
    -   **Data Format**: None.

## Example

1. Your AI waits for server to input `PLAY:`.
2. Your AI makes a new move by printing `MOVE:<move>`.
3. The server will answer with `MOVE:<move>` and `PLAY:`.
2. Your AI saves the move and makes a new move by printing `MOVE:<move>`.

The only output your AI needs to make is `MOVE:<move>`. **Do not use the `PLAY:` tag, as a new move will be given automatically to your AI by the server!**

## Logs

Incase you want to display any logs on the server, you need to add a normal print without any tags.

```terminal
MOVE: <number of column 0-6>
The above line would be treated as a move. This line would be treated as a log.
```

## Statistics and Export

After the game, you can review all moves, times, advantages, and logs. You can navigate through the game and view the board situation for a specific move by:
  - Clicking the back and forth buttons.
  - Clicking the move in the moves list.
  - Clicking the corresponding circle on the advantage or time chart.

You also have the option to download a CSV file containing all the mentioned statistics.
