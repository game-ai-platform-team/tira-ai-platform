# User manual

The server assumes that provided AIs manage tracks previous moves itself.
Therefore the server will only provide input of one AI to another and read outputs.

## Logs vs Moves

Let's have a look at the sample ai.py script. We can see that there are two types of lines

```python
print(f"{choice}\n")
```

```python
print(f"MOVE: {choice}\n")
```

First line indicates free-form logs. This will be visible to you in the front-end for debugging purposes. This basically applies to all print-statements, except...

the MOVE line, which outputs a move to the game, and should only contain a singular move in the relevant syntax. Only one of MOVE be given, after all logs that you wish to receive.

## Supported games

- [Chess](chess.md)

## Submitting code from GitHub
Your GitHub repository must contain a directory ``tiraconfig``, where there are two files:
* ``setup.sh``, a shell script, which will be run before running the AI itself. 
* ``runcommand``, a simple text file which contains the command that will be used to run the program. The working directory will be the root of the git project. 

## Supported progamming languages

- Python 3.x
