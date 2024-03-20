import MoveStatistics from "../interfaces/MoveStatistics";
import { AbstractNode, Game, Position, pgnWrite } from "kokopu";
import _ from "lodash";

const STARTING_ADVANTAGE: number = 0.066;

export interface Statistics {
    longest: MoveStatistics;
    shortest: MoveStatistics;
    average: number;
    times: number[];
    logs: string;
}

export interface Evaluations {
    advantages: number[];
    moveClasses: string[];
    accuracyWhite: number;
    accuracyBlack: number;
}

function getStatistics(
    moves: MoveStatistics[],
    color?: 0 | 1,
): Statistics | null {
    const filteredMoves =
        color != undefined ? filterByColor(moves, color) : moves;

    if (filteredMoves.length === 0) {
        return null;
    }

    const longestMove = _(filteredMoves).maxBy("time") as MoveStatistics;
    const shortestMove = _(filteredMoves).minBy("time") as MoveStatistics;
    const average = _(filteredMoves).meanBy("time");
    const times = _(filteredMoves).map("time").value();

    return {
        longest: longestMove,
        shortest: shortestMove,
        average,
        times,
        logs: "",
    };
}

function filterByColor(moves: MoveStatistics[], color: number) {
    return moves.filter((_, index) => index % 2 === color);
}

function getEvaluations(
    moves: MoveStatistics[],
    startingAdvantage: boolean,
    color?: 0 | 1,
): Evaluations {
    moves = color != undefined ? filterByColor(moves, color) : moves;

    const advantages = getAdvantages(moves);
    const moveClasses = getMoveClasses(advantages);
    const [accuracyWhite, accuracyBlack] = getGameAccuracy(advantages);

    if (startingAdvantage) {
        advantages.splice(0, 0, STARTING_ADVANTAGE);
    }

    return { advantages, moveClasses, accuracyWhite, accuracyBlack };
}

function uciToPGN(
    moves: MoveStatistics[],
    whiteName?: string,
    blackName?: string,
    whiteElo?: number,
    blackElo?: number,
): string {
    const game = new Game();
    game.date(new Date());
    game.site("tira-ai-platform");
    game.playerName("w", whiteName);
    game.playerName("b", blackName);
    game.playerElo("w", whiteElo);
    game.playerElo("b", blackElo);

    const position = new Position("start");

    let current: AbstractNode = game.mainVariation();
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        const san = position.notation(position.uci(move.move));
        position.play(san);
        current = current.play(san);
    }

    const text = pgnWrite(game);

    return text;
}

function getAdvantages(moves: MoveStatistics[]): number[] {
    return moves.map((move) => move.evaluation);
}

function getMoveClasses(advantages: number[]): string[] {
    const moveClasses: string[] = [];

    for (let i = 0; i < advantages.length; i++) {
        const thisAdvantage: number = advantages[i];
        const prevAdvantage: number = getPreviousAdvantage(
            i,
            advantages,
            STARTING_ADVANTAGE,
        );
        const change: number = Math.abs(prevAdvantage - thisAdvantage);
        const increasing: boolean = isAdvantageIncreasing(
            i,
            thisAdvantage,
            prevAdvantage,
        );

        if (isGreatMove(i, increasing)) {
            moveClasses.push("GREAT");
        } else {
            moveClasses.push(getMoveClass(change));
        }
    }

    return moveClasses;
}

function getPreviousAdvantage(
    index: number,
    advantages: number[],
    startingAdvantage: number,
): number {
    return index > 0 ? advantages[index - 1] : startingAdvantage;
}

function isAdvantageIncreasing(
    _: number,
    thisAdvantage: number,
    prevAdvantage: number,
): boolean {
    return thisAdvantage > prevAdvantage;
}

function isGreatMove(index: number, increasing: boolean): boolean {
    return (index % 2 === 0 && increasing) || (index % 2 !== 0 && !increasing);
}

function getMoveClass(change: number): string {
    if (change <= 0.05) {
        return "EXCELLENT";
    } else if (change <= 0.1) {
        return "GOOD";
    } else if (change <= 0.2) {
        return "INACCURACY";
    } else if (change <= 0.3) {
        return "MISTAKE";
    } else {
        return "BLUNDER";
    }
}

function getGameAccuracy(advantages: number[]): number[] {
    const whiteAccuracyAll: number[] = [];
    const blackAccuracyAll: number[] = [];
    const distanceFromMeanFactor: number = 1;

    for (let i = 0; i < advantages.length; i++) {
        const advantage = advantages[i];
        const prevAdvantage = getPreviousAdvantage(
            i,
            advantages,
            STARTING_ADVANTAGE,
        );

        if (i % 2 === 0) {
            const accuracy = calculateMoveAccuracy(
                calculateWinChance(centipawnFromAdvantage(prevAdvantage)),
                calculateWinChance(centipawnFromAdvantage(advantage)),
            );

            whiteAccuracyAll.push(accuracy);
        } else {
            const accuracy = calculateMoveAccuracy(
                calculateWinChance(-centipawnFromAdvantage(prevAdvantage)),
                calculateWinChance(-centipawnFromAdvantage(advantage)),
            );

            blackAccuracyAll.push(accuracy);
        }
    }

    const whiteAccuracyHarmonic = calculateHarmonicMean(whiteAccuracyAll);
    const blackAccuracyharmonic = calculateHarmonicMean(blackAccuracyAll);

    const whiteAccuracyWeighted = calculateWeightedAverage(
        whiteAccuracyAll,
        distanceFromMeanFactor,
    );
    const blackAccuracyWeighted = calculateWeightedAverage(
        blackAccuracyAll,
        distanceFromMeanFactor,
    );

    const whiteAccuracy = Math.round(
        (whiteAccuracyHarmonic + whiteAccuracyWeighted) / 2,
    );
    const blackAccuracy = Math.round(
        (blackAccuracyharmonic + blackAccuracyWeighted) / 2,
    );

    return [
        isNaN(whiteAccuracy) ? 100 : whiteAccuracy,
        isNaN(blackAccuracy) ? 100 : blackAccuracy,
    ];
}

function calculateMoveAccuracy(winBefore: number, winAfter: number): number {
    return Math.min(
        Math.max(103 * Math.exp(-0.04354 * (winBefore - winAfter)) - 2, 0),
        100,
    );
}

function calculateWinChance(cp: number): number {
    return 50 + 50 * (2 / (1 + Math.exp(-0.004 * cp)) - 1);
}

function centipawnFromAdvantage(advantage: number): number {
    if (advantage === 0) return 0;
    return -Math.log(2 / (advantage + 1) - 1) / 0.004;
}

function calculateWeightedAverage(
    numbers: number[],
    distanceFromMeanFactor: number,
): number {
    if (numbers.length === 0) {
        return 0;
    }

    const mean = calculateMean(numbers);
    const standardDeviation = calculateStandardDeviation(numbers);

    const weightedSum = numbers.reduce((accumulator, currentValue) => {
        const weight = Math.exp(
            (distanceFromMeanFactor * Math.abs(currentValue - mean)) /
                standardDeviation,
        );
        return accumulator + currentValue * weight;
    }, 0);

    const weightsSum = numbers.reduce((accumulator, currentValue) => {
        const weight = Math.exp(
            (distanceFromMeanFactor * Math.abs(currentValue - mean)) /
                standardDeviation,
        );
        return accumulator + weight;
    }, 0);

    return weightedSum / weightsSum;
}

function calculateMean(numbers: number[]): number {
    const sum = numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
    return sum / numbers.length;
}

function calculateStandardDeviation(numbers: number[]): number {
    const mean = calculateMean(numbers);
    const squaredDifferences = numbers.map((value) =>
        Math.pow(value - mean, 2),
    );
    const variance =
        squaredDifferences.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
        ) / numbers.length;
    return Math.sqrt(variance);
}

function calculateHarmonicMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0;
    }

    const sumReciprocals = numbers.reduce((sum, num) => sum + 1 / num, 0);
    return numbers.length / sumReciprocals;
}

export default {
    getStatistics,
    getEvaluations,
    uciToPGN,
    _getMoveClass: getMoveClasses,
};
