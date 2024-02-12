import SubmitForm from "./SubmitForm.tsx";
import Chessboard from "./Chessboard.tsx";
import MoveList from "./MoveList.tsx";
import "./GameView.css";
import AdvantageChart from "./AdvantageChart.tsx";
import {
    getEvaluations,
    getStatistics,
} from "../services/StatisticsService.tsx";
import TimeChart from "./TimeChart.tsx";
import AdvantageBar from "./AdvantageBar.tsx";
import store from "../store.ts";

function GameView() {
    const winnerMessage = <p>winner: {"testwinner"}</p>;

    const stats = getStatistics(store.getState().moves);
    const evals = getEvaluations(store.getState().moves);

    return (
        <div id="game-view">
            <SubmitForm />
            <Chessboard />
            <div id="winner-message">{winnerMessage}</div>
            <AdvantageBar linePosition={0.5} />

            <MoveList />

            <div id="statistics">
                <AdvantageChart data={evals.advantages} />
                <TimeChart data={stats.times} />
            </div>
        </div>
    );
}

export default GameView;
