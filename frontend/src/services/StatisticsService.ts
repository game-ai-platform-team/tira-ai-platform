import MoveStatistics from "../interfaces/MoveStatistics";
import { AbstractNode, Game, Position, pgnWrite } from "kokopu";
const STARTING_ADVANTAGE: number = 0.066;

interface Statistics {
    longest: MoveStatistics;
    shortest: MoveStatistics;
    average: number;
    times: number[];
    logs: string;
}

function getStatistics(
    moves: MoveStatistics[],
    color?: "white" | "black",
): Statistics | null {
    let movesOfColor: MoveStatistics[] = moves;

    if (color === "white") {
        movesOfColor = moves.filter((_, index) => index % 2 === 0);
    } else if (color === "black") {
        movesOfColor = moves.filter((_, index) => index % 2 !== 0);
    }

    if (movesOfColor.length === 0) {
        return null;
    }

    const longestMove = calculateLongestMove(movesOfColor);
    const shortestMove = calculateShortestMove(movesOfColor);
    const average = calculateAverageTime(movesOfColor);
    const times = getTimes(movesOfColor);

    return {
        longest: longestMove,
        shortest: shortestMove,
        average: average,
        times: times,
        logs: "",
    };
}

function getEvaluations(
    moves: MoveStatistics[],
    startingAdvantage: boolean,
    color?: "white" | "black",
): {
    advantages: number[];
    moveClasses: string[];
} {
    if (color == "white") {
        moves = moves.filter((_, index) => index % 2 === 0);
    } else if (color == "black") {
        moves = moves.filter((_, index) => index % 2 !== 0);
    }

    const advantages = getAdvantages(moves);
    const moveClasses = getMoveClasses(advantages);
    if (startingAdvantage) {
        advantages.splice(0, 0, STARTING_ADVANTAGE);
    }
    return { advantages, moveClasses };
}

function uciToPGN(
    moves: MoveStatistics[],
    whiteName?: string,
    blackName?: string,
    whiteElo?: number,
    blackElo?: number,
): string {
    const game = new Game();
    const position = new Position("start");
    let current: AbstractNode = game.mainVariation();
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        const san = position.notation(position.uci(move.move));
        position.play(san);
        current = current.play(san);
    }
    game.date(new Date());
    game.site("tira-ai-platform");
    if (whiteName != null) game.playerName("w", whiteName);
    if (blackName != null) game.playerName("b", blackName);
    if (whiteElo != null) game.playerElo("w", whiteElo);
    if (blackElo != null) game.playerElo("b", blackElo);

    const text = pgnWrite(game);

    return text;
}

function calculateLongestMove(moves: MoveStatistics[]): MoveStatistics {
    let longestMove: MoveStatistics = moves[0];
    for (let i = 1; i < moves.length; i++) {
        const move = moves[i];
        if (move.time > longestMove.time) {
            longestMove = move;
        }
    }
    return longestMove;
}

function calculateShortestMove(moves: MoveStatistics[]): MoveStatistics {
    let shortestMove: MoveStatistics = moves[0];
    for (let i = 1; i < moves.length; i++) {
        const move = moves[i];
        if (move.time < shortestMove.time) {
            shortestMove = move;
        }
    }
    return shortestMove;
}

function calculateAverageTime(moves: MoveStatistics[]): number {
    let total = 0;
    for (let i = 0; i < moves.length; i++) {
        total += moves[i].time;
    }
    return total / moves.length;
}

function getAdvantages(moves: MoveStatistics[]): number[] {
    const advantages: number[] = [];
    for (let i = 0; i < moves.length; i++) {
        const advantage = moves[i].evaluation;
        advantages.push(advantage);
    }
    return advantages;
}

function getTimes(moves: MoveStatistics[]): number[] {
    const times: number[] = [];
    for (let i = 0; i < moves.length; i++) {
        const advantage = moves[i].time;
        times.push(advantage);
    }
    return times;
}

function getMoveClasses(advantages: number[]): string[] {
    const moveClasses: string[] = [];

    for (let i = 0; i < advantages.length; i++) {
        const thisAdvantage = advantages[i];
        let increasing: boolean = false;
        let mult: number = 1;
        let prevAdvantage: number = 0;
        let change: number = 0;

        if (i > 0) {
            prevAdvantage = advantages[i - 1];
        } else {
            prevAdvantage = STARTING_ADVANTAGE;
        }

        change = Math.abs(prevAdvantage - thisAdvantage);

        if (prevAdvantage < thisAdvantage) {
            increasing = true;
        }

        if (Math.abs(thisAdvantage) > 0.8) {
            mult = 0.1;
        } else if (Math.abs(thisAdvantage) > 0.5) {
            mult = 0.5;
        } else {
            mult = 1;
        }

        switch (true) {
            case (i % 2 == 0 && increasing) || (i % 2 != 0 && !increasing):
                moveClasses.push("GREAT");
                break;
            default:
                switch (true) {
                    case change <= 0:
                        moveClasses.push("BEST");
                        break;
                    case change <= 0.02 * mult:
                        moveClasses.push("EXCELLENT");
                        break;
                    case change <= 0.05 * mult:
                        moveClasses.push("GOOD");
                        break;
                    case change <= 0.1 * mult:
                        moveClasses.push("INACCURACY");
                        break;
                    case change <= 0.2 * mult:
                        moveClasses.push("MISTAKE");
                        break;
                    default:
                        moveClasses.push("BLUNDER");
                }
        }
    }

    return moveClasses;
}

export default { getStatistics, getEvaluations, uciToPGN };
