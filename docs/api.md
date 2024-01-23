# API documentation

## Game move JSON format

```typescript
{
    move: string,
    time: int,
    advantage: int
}
```

Time unit is ms.
Advantage score by stockfish.

## Game result JSON format

```typescript
{
    statistics: {...},
    player: string,
    state: int
}
```
