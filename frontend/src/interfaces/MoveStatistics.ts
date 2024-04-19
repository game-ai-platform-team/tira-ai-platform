import { GameState } from "../types";
/**
 * Interface representing statistics for a move in a game.
 *
 * This interface defines the statistics associated with a move in a game.
 * It includes properties such as the move notation, time taken for the move,
 * evaluation score, logs, and optional game state.
 */
interface MoveStatistics {
    move: string;
    time: number;
    evaluation: number;
    logs: string;
    state?: GameState;
}

export default MoveStatistics;
