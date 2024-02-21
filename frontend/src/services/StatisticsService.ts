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
    const [accuracyWhite, accuracyBlack] = getAccuracy(advantages);

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
        const mult: number = calculateMultiplier(thisAdvantage);

        if (isGreatMove(i, increasing)) {
            moveClasses.push("GREAT");
        } else {
            moveClasses.push(getMoveClass(change, mult));
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

function calculateMultiplier(thisAdvantage: number): number {
    return Math.abs(thisAdvantage) > 0.9
        ? 0.25
        : Math.abs(thisAdvantage) > 0.5
          ? 0.5
          : 1;
}

function isGreatMove(index: number, increasing: boolean): boolean {
    return (index % 2 === 0 && increasing) || (index % 2 !== 0 && !increasing);
}

function getMoveClass(change: number, mult: number): string {
    if (change <= 0) {
        return "BEST";
    } else if (change <= 0.02 * mult) {
        return "EXCELLENT";
    } else if (change <= 0.05 * mult) {
        return "GOOD";
    } else if (change <= 0.1 * mult) {
        return "INACCURACY";
    } else if (change <= 0.3 * mult) {
        return "MISTAKE";
    } else {
        return "BLUNDER";
    }
}

function getAccuracy(advantages: number[]): number[] {
    const whiteAccuracyAll: number[] = [];
    const blackAccuracyAll: number[] = [];

    for (let i = 0; i < advantages.length; i++) {
        const advantage = advantages[i];
        const prevAdvantage = getPreviousAdvantage(
            i,
            advantages,
            STARTING_ADVANTAGE,
        );

        if (i % 2 === 0) {
            const accuracy = calculateAccuracy(
                calculateWinChance(centipawnFromAdvantage(prevAdvantage)),
                calculateWinChance(centipawnFromAdvantage(advantage)),
            );

            whiteAccuracyAll.push(accuracy);
        } else {
            const accuracy = calculateAccuracy(
                calculateWinChance(-centipawnFromAdvantage(prevAdvantage)),
                calculateWinChance(-centipawnFromAdvantage(advantage)),
            );

            blackAccuracyAll.push(accuracy);
        }
    }

    const whiteAccuracy = Math.round(calculateAverage(whiteAccuracyAll));
    const blackAccuracy = Math.round(calculateAverage(blackAccuracyAll));

    return [whiteAccuracy, blackAccuracy];
}

function calculateAccuracy(winBefore: number, winAfter: number): number {
    return Math.min(
        Math.max(103 * Math.exp(-0.04354 * (winBefore - winAfter)) - 2, 0),
        100,
    );
}

function calculateWinChance(cp: number): number {
    return Math.min(
        Math.max(50 + 50 * (2 / (1 + Math.exp(-0.004 * cp)) - 1), 0),
        100,
    );
}

function centipawnFromAdvantage(advantage: number): number {
    if (advantage === 0) return 0;
    return -Math.log(2 / (advantage + 1) - 1) / 0.004;
}

function calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0;
    }

    const sum = numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
    return sum / numbers.length;
}

export default {
    getStatistics,
    getEvaluations,
    uciToPGN,
    _getMoveClass: getMoveClasses,
};
