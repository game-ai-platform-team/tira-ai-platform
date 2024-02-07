import { MoveProps } from "../components/Move";

export function getStatistics(
    moves: MoveProps[],
    color?: "white" | "black",
): {
    longest: MoveProps;
    shortest: MoveProps;
    average: number;
    advantages: number[];
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
            advantages: [0],
            times: [0],
            logs: ""
        };
    }

    const longestMove = calculateLongestMove(movesOfColor);
    const shortestMove = calculateShortestMove(movesOfColor);
    const average = calculateAverageTime(movesOfColor);
    const advantages = getAdvantages(moves);
    const times = getTimes(movesOfColor);

    return {
        longest: longestMove,
        shortest: shortestMove,
        average: average,
        advantages: advantages,
        times: times,
        logs: "",
    };
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

function getTimes(moves: MoveProps[]) {
    const times: number[] = [];
    for (let i = 0; i < moves.length; i++) {
        const advantage = moves[i].time;
        times.push(advantage);
    }
    return times;
}
