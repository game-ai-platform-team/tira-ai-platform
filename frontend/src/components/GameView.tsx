import SubmitForm from "./SubmitForm.tsx";
import MoveList from "./MoveList.tsx";
import "../scss/GameView.scss";
import AdvantageChart from "./AdvantageChart.tsx";
import {
    getEvaluations,
    getStatistics,
    uciToPGN,
} from "../services/StatisticsService.tsx";
import TimeChart from "./TimeChart.tsx";
import AdvantageBar from "./AdvantageBar.tsx";
import store from "../store.ts";
import { ReactNode } from "react";
import { useAppSelector } from "../hook.ts";

function GameView({ children }: { children: ReactNode }) {
    const winnerMessage = <p>winner: {"testwinner"}</p>;
    const moveIndex = useAppSelector((state) => state.boardIndex) - 1;

    const stats = getStatistics(store.getState().moves);
    const evals = getEvaluations(store.getState().moves, true);

    const handleCopyPGN = () => {
        uciToPGN(store.getState().moves);
    };

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
            <a href="#" onClick={handleCopyPGN}>Copy PGN</a>
        </div>
    );
}

export default GameView;
