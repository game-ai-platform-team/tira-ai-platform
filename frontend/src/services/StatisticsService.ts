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

export default {
    getStatistics,
    getEvaluations,
    uciToPGN,
    _getMoveClass: getMoveClasses,
};
