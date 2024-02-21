import MoveStatistics from "../interfaces/MoveStatistics";
import { AbstractNode, Game, Position, pgnWrite } from "kokopu";
import _ from "lodash";

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
    color?: 0 | 1,
): Statistics | null {
    moves = color != undefined ? filterByColor(moves, color) : moves;

    if (moves.length === 0) {
        return null;
    }

    const longestMove = _(moves).maxBy("time") as MoveStatistics;
    const shortestMove = _(moves).minBy("time") as MoveStatistics;
    const average = _(moves).meanBy("time");
    const times = _(moves).map("time").value();

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
): {
    advantages: number[];
    moveClasses: string[];
    accuracyWhite: number;
    accuracyBlack: number;
} {
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
    const advantages: number[] = [];
    for (let i = 0; i < moves.length; i++) {
        const advantage = moves[i].evaluation;
        advantages.push(advantage);
    }
    return advantages;
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
    return Math.abs(thisAdvantage) > 0.8
        ? 0.1
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
    } else if (change <= 0.2 * mult) {
        return "MISTAKE";
    } else {
        return "BLUNDER";
    }
}

function getAccuracy(advantages: number[]): number[] {
    const whiteAccuracy: number[] = [];
    const blackAccuracy: number[] = [];

    let prevAdvantage: number = advantages[0];

    for (let i = 1; i < advantages.length; i++) {
        const advantage = advantages[i];

        if (i % 2 === 0) {
            const accuracy = calculateAccuracy(
                calculateWinChance(centipawnFromAdvantage(prevAdvantage)),
                calculateWinChance(centipawnFromAdvantage(advantage)),
            );

            whiteAccuracy.push(accuracy);
        } else {
            const accuracy = calculateAccuracy(
                calculateWinChance(-centipawnFromAdvantage(prevAdvantage)),
                calculateWinChance(-centipawnFromAdvantage(advantage)),
            );

            blackAccuracy.push(accuracy);
        }

        prevAdvantage = advantage;
    }

    return [calculateAverage(whiteAccuracy), calculateAverage(blackAccuracy)];
}

function calculateAccuracy(winBefore: number, winAfter: number): number {
    return 103 * Math.exp(-0.04354 * (winBefore - winAfter)) - 3;
}

function calculateWinChance(cp: number): number {
    return 50 + 50 * (2 / (1 + Math.exp(-0.004 * cp)) - 1);
}

function centipawnFromAdvantage(advantage: number): number {
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
