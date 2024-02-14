import SubmitForm from "./SubmitForm";
import MoveList from "./MoveList";
import "../scss/GameView.scss";
import AdvantageChart from "./AdvantageChart";
import statisticsService from "../services/StatisticsService";
import TimeChart from "./TimeChart";
import AdvantageBar from "./AdvantageBar";
import { ReactNode } from "react";
import { useAppSelector } from "../hook";

function GameView({ children }: { children: ReactNode }) {
    const moveIndex = useAppSelector((state) => state.boardIndex) - 1;
    const moves = useAppSelector((state) => state.moves);

    const stats = statisticsService.getStatistics(moves);
    const evals = statisticsService.getEvaluations(
        moves,
        true,
    );

    const handleCopyPGN = () => {
        const text = statisticsService.uciToPGN(moves);
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
