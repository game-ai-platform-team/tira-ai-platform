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

function GameView({ children }: { children: ReactNode }) {
    const winnerMessage = <p>winner: {"testwinner"}</p>;

    const stats = getStatistics(store.getState().moves);
    const evals = getEvaluations(store.getState().moves, true);

    return (
        <div id="game-view">
            <SubmitForm />
            {children}
            <div id="winner-message">{winnerMessage}</div>
            <AdvantageBar linePosition={evals.advantages.at(-1)} />

            <MoveList />

            <div id="statistics">
                <AdvantageChart data={evals.advantages} />
                <TimeChart data={stats.times} />
            </div>
        </div>
    );
}

export default GameView;
