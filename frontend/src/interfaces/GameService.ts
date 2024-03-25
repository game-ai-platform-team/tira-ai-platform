interface GameService {
    getBoard(previousBoard: string, move: string): string;
    getInitialBoard(): string;
}

export default GameService;
