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
    moves = color != undefined? filterByColor(moves, color) : moves;

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
} {
    moves = color != undefined? filterByColor(moves, color) : moves;

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

type AdvantageArray = number[];

function getMoveClasses(advantages: AdvantageArray): string[] {
    const moveClasses: string[] = [];

    for (let i = 0; i < advantages.length; i++) {
        const thisAdvantage: number = advantages[i];
        const prevAdvantage: number = getPreviousAdvantage(i, advantages, STARTING_ADVANTAGE);
        const change: number = Math.abs(prevAdvantage - thisAdvantage);
        const increasing: boolean = isAdvantageIncreasing(i, thisAdvantage, prevAdvantage);
        const mult: number = calculateMultiplier(thisAdvantage);

        if (isGreatMove(i, increasing)) {
            moveClasses.push("GREAT");
        } else {
            moveClasses.push(getMoveClass(change, mult));
        }
    }

    return moveClasses;
}

function getPreviousAdvantage(index: number, advantages: AdvantageArray, startingAdvantage: number): number {
    return index > 0 ? advantages[index - 1] : startingAdvantage;
}

function isAdvantageIncreasing(_: number, thisAdvantage: number, prevAdvantage: number): boolean {
    return thisAdvantage > prevAdvantage;
}

function calculateMultiplier(thisAdvantage: number): number {
    return Math.abs(thisAdvantage) > 0.8 ? 0.1 : (Math.abs(thisAdvantage) > 0.5 ? 0.5 : 1);
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



export default {
    getStatistics,
    getEvaluations,
    uciToPGN,
    _getMoveClass: getMoveClasses,
};
