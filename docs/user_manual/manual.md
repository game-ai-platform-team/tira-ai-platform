# User Manual

The server assumes that provided AIs manage tracking previous moves themselves. Therefore the server will only provide input from one AI to another and read outputs. [Here's an example of a simple Connect Four application compatible with Tira-AI-Platform](https://github.com/game-ai-platform-team/stupid-connect-four-ai)


## Step-by-Step Guide on How to Use the Application
Steps:

    1. Create your own project with the correct project structure as specified in the "Submitting Code From GitHub" section.
    2. Copy the HTTPS link to your project's GitHub repository.
    3. Paste it in the submit form.
    4. Select the difficulty of the opponent AI.
    5. Press "Submit" and wait for the game to start.
    6. Review your game stats, moves, etc.
    7. Download statistics or export the game (PGN for chess, other games specified in their manuals).
    8. Navigate through the board by pressing the back and forth buttons, clicking on moves in the moves list, or clicking on the corresponding points on the time or advantage charts.
    9. All logs are displayed in the logs box.
    10. If you want to play another game, press "Reset" and then "Submit" to play a new game.

## Submitting Code From GitHub

Your GitHub repository must contain a directory ``tiraconfig``, where there are two files:
* ``setup.sh``, a shell script, that will be run before running the AI itself. 
* ``runcommand``, a simple text file that contains the command that will be used to run the program. The working directory will be the root of the git project. 

## Logs vs Moves

Let's take a look at the sample ``ai.py`` script. We can see that there are two types of lines:

```python
print(f"{choice}\n")
```

```python
print(f"MOVE: {choice}\n")
```

The first line indicates free-form logs. This will be visible to you in the front-end for debugging purposes. This basically applies to all print-statements, except for the ``MOVE`` line, which outputs a move to the game. The ``MOVE`` line should only contain a singular move in the relevant syntax. Only one ``MOVE`` be given. All other prints should be logs that you wish to receive.

## Supported Games

- [Chess](https://github.com/game-ai-platform-team/tira-ai-platform/blob/dev/docs/user_manual/chess.md)
- [Connect Four](https://github.com/game-ai-platform-team/tira-ai-platform/blob/dev/docs/user_manual/connect_four.md)

## Supported Progamming Languages

- Python 3.x

## Feedback and Suggestions

- You can provide feedback, feature requests and bug reports on our GitHub issues page. The link is in the navigationbar under ``Feedback``.
