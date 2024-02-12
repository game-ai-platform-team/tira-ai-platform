import SubmitForm from "./SubmitForm.tsx";
import MoveList from "./MoveList.tsx";
import "../scss/GameView.scss";
import AdvantageChart from "./AdvantageChart.tsx";
import {
    getEvaluations,
    getStatistics,
} from "../services/StatisticsService.tsx";
import TimeChart from "./TimeChart.tsx";
import AdvantageBar from "./AdvantageBar.tsx";
import store from "../store.ts";
import { ReactNode } from "react";
import { useAppSelector } from "../hook.ts";
import { Game, Position, pgnWrite } from "kokopu";

function GameView({ children }: { children: ReactNode }) {
    const winnerMessage = <p>winner: {"testwinner"}</p>;
    const moveIndex = useAppSelector((state) => state.boardIndex) - 1;
    const moveStats = useAppSelector((state) => state.moves)
    const boards = useAppSelector((state) => state.boards)

    const stats = getStatistics(store.getState().moves);
    const evals = getEvaluations(store.getState().moves, true);
    
    const game = new Game();
    let current = game.mainVariation();
    for (let i = 0; i < moveStats.length; i++) {
        const position = new Position(boards[i]);
        const move = moveStats[i].move;
        const san = position.notation(position.uci(move));
        current = current.play(san);
    }
    const pgnString = pgnWrite(game);

    return (
        <div id="game-view">
            <SubmitForm />
            {children}
            <div id="winner-message">{winnerMessage}</div>
            <AdvantageBar linePosition={evals.advantages.at(moveIndex)} />

            <MoveList />

            <div id="statistics">
                <AdvantageChart data={evals.advantages} />
                <TimeChart data={stats.times} />
            </div>
        </div>
    );
}

export default GameView;
