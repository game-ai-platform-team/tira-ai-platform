import { MoveProps } from "../components/Move";

export function getStatistics(moves: MoveProps[]): {
    longest: MoveProps;
    shortest: MoveProps;
    average: number;
    advantages: number[];
} {
    if (moves.length === 0) {
        const defaultMove: MoveProps = { move: "", time: 0, advantage: 0 };
        return {
            longest: defaultMove,
            shortest: defaultMove,
            average: 0,
            advantages: [0],
        };
    }

    const longestMove = calculateLongestMove(moves);
    const shortestMove = calculateShortestMove(moves);
    const average = calculateAverageTime(moves);
    const advantages = getAdvantages(moves);

    return {
        longest: longestMove,
        shortest: shortestMove,
        average: average,
        advantages: advantages,
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
