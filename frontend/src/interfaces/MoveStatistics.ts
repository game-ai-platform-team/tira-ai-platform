import { GameState } from "../types";

interface MoveStatistics {
    move: string;
    time: number;
    evaluation: number;
    logs: string;
    state?: GameState;
}

export default MoveStatistics;
