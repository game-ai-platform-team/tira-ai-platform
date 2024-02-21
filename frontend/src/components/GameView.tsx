import { ReactNode } from "react";
import SubmitForm from "./SubmitForm";
import MoveList from "./MoveList";
import "../scss/GameView.scss";
import statisticsService from "../services/StatisticsService";
// import AdvantageBar from "./AdvantageBar";
import { useAppSelector } from "../hook";
import AdvantageChart from "./AdvantageChart";
import TimeChart from "./TimeChart";
import CSVCreater from "./CSVCreater.tsx";
import { LogBox } from "./LogBox.tsx";
import PlayerStats from "./PlayerStats.tsx";

interface GameViewProps {
    selectedGame: string;
    children: ReactNode;
}

function GameView({ children }: GameViewProps) {
    // const moveIndex = useAppSelector((state) => state.boardIndex) - 1;
    const moves = useAppSelector((state) => state.moves);

    const stats = statisticsService.getStatistics(moves);
    const evals = statisticsService.getEvaluations(moves, true);

    const wStats = statisticsService.getStatistics(moves, 0);
    const bStats = statisticsService.getStatistics(moves, 1);

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
            <div className="card">
                <SubmitForm />
            </div>
            {children}
            {
                // <AdvantageBar linePosition={evals.advantages[moveIndex]} />
            }
            <div className="card">
                <MoveList handleCopyPGN={handleCopyPGN} />
                <CSVCreater moves={moves} />
            </div>
            <div id="statistics" className="card">
                {stats && <AdvantageChart data={evals.advantages} />}
                {stats && <TimeChart data={stats.times} />}
            </div>
            <div id="player-stats" className="card">
                {wStats && bStats && (
                    <PlayerStats
                        whiteStats={wStats}
                        blackStats={bStats}
                        evals={evals}
                    />
                )}
            </div>
            <div className="card">
                <LogBox />
            </div>
        </div>
    );
}

export default GameView;
