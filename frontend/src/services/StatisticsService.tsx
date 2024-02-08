import { MoveProps } from "../components/Move";
const STARTING_ADVANTAGE: number = 0.066;

export function getStatistics(
    moves: MoveProps[],
    color?: "white" | "black",
): {
    longest: MoveProps;
    shortest: MoveProps;
    average: number;
    times: number[];
    logs: string;
} {
    let movesOfColor: MoveProps[];
    if (color === "white") {
        movesOfColor = moves.filter((_, index) => index % 2 === 0);
    } else if (color === "black") {
        movesOfColor = moves.filter((_, index) => index % 2 !== 0);
    } else {
        movesOfColor = moves;
    }

    if (movesOfColor.length === 0) {
        return {
            longest: { move: "none", time: 0, advantage: 0, logs: "" },
            shortest: { move: "none", time: 0, advantage: 0, logs: "" },
            average: 0,
            times: [0],
            logs: "",
        };
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

export function getEvaluations(moves: MoveProps[]): {
    advantages: number[];
    moveClasses: string[];
} {
    const advantages = getAdvantages(moves);
    const moveClasses = getMoveClasses(advantages);
    advantages.splice(0, 0, STARTING_ADVANTAGE);
    return { advantages, moveClasses };
}

function calculateLongestMove(moves: MoveProps[]): MoveProps {
    let longestMove: MoveProps = moves[0];
    for (let i = 1; i < moves.length; i++) {
        const move = moves[i];
        if (move.time > longestMove.time) {
            longestMove = move;
        }
    }
    return longestMove;
}

function calculateShortestMove(moves: MoveProps[]): MoveProps {
    let shortestMove: MoveProps = moves[0];
    for (let i = 1; i < moves.length; i++) {
        const move = moves[i];
        if (move.time < shortestMove.time) {
            shortestMove = move;
        }
    }
    return shortestMove;
}

function calculateAverageTime(moves: MoveProps[]): number {
    let total = 0;
    for (let i = 0; i < moves.length; i++) {
        total += moves[i].time;
    }
    return total / moves.length;
}

function getAdvantages(moves: MoveProps[]): number[] {
    const advantages: number[] = [];
    for (let i = 0; i < moves.length; i++) {
        const advantage = moves[i].advantage;
        advantages.push(advantage);
    }
    return advantages;
}

function getTimes(moves: MoveProps[]): number[] {
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
