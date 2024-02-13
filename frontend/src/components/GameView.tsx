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
    const moveIndex = useAppSelector((state) => state.boardIndex) - 1;

    const stats = getStatistics(store.getState().moves);
    const evals = getEvaluations(store.getState().moves, true);

    const handleCopyPGN = () => {
        const text = uciToPGN(store.getState().moves);
        const pgn = document.createElement("textarea");
        pgn.value = text;
        pgn.style.position = "fixed";

        pgn.select();
        try {
            navigator.clipboard.writeText(pgn.value);
            console.log("Text copied to clipboard:", text);
        } catch (error) {
            console.error("Unable to copy text to clipboard:", error);
        }

        document.body.removeChild(pgn);
    };

    return (
        <div id="game-view">
            <SubmitForm />
            {children}
            <AdvantageBar linePosition={evals.advantages.at(moveIndex)} />

            <MoveList handleCopyPGN={handleCopyPGN} />

            <div id="statistics">
                <AdvantageChart data={evals.advantages} />
                <TimeChart data={stats.times} />
            </div>
        </div>
    );
}

export default GameView;
