/**
 * Interface representing game configuration data.
 *
 * This interface defines the structure of game configuration data.
 * It includes the properties Elo rating, GitHub URL, and game type.
 * In games like Connect Four Elo referes to the difficulty/time given for the ai to make a move.
 */
interface GameConfig {
    elo: number;
    githubUrl: string;
    game: string;
}

export default GameConfig;
