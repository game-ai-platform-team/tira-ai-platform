# User-Manual 

## Running the project

To run the project, the easiest way is to have docker installed and running the following in the main directory

```
sudo bash buildrun.sh
```

## Logging vs Moves
Let's have a look at the sample ai.py script. We can see that there are two types of lines

```
print(f"{choice}\n")
```
```        
print(f"MOVE: {choice}\n")
```

First line indicates free-form logging. This will be visible to you in the front-end for debugging purposes. This basically applies to all print-statements, except...

the MOVE line, which outputs a move to the game, and should only contain a singular move in the relevant syntax. Only one of MOVE be given, after all logging that you wish to receive.