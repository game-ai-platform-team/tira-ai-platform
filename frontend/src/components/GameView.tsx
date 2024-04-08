import SubmitForm from "./SubmitForm";
import MoveList from "./MoveList";
import "../scss/GameView.scss";
import statisticsService from "../services/StatisticsService";
import { useAppSelector } from "../hook";
import AdvantageChart from "./AdvantageChart";
import TimeChart from "./TimeChart";
import CSVCreator from "./CSVCreator.tsx";
import { LogBox } from "./LogBox.tsx";
import PlayerStats from "./PlayerStats.tsx";
import { Route, Routes } from "react-router-dom";
import Chessboard from "./Chessboard.tsx";
import CFourboard from "./CFourboard.tsx";
import Gomokuboard from "./Gomokuboard.tsx";
import Othelloboard from "./Othelloboard.tsx";
import { Home } from "./Home.tsx";

function GameView() {
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
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chess" element={<Chessboard />} />
                <Route path="/connect_four" element={<CFourboard />} />
                <Route path="/gomoku" element={<Gomokuboard />} />
                <Route path="/othello" element={<Othelloboard />} />
            </Routes>
            <div className="card">
                <MoveList handleCopyPGN={handleCopyPGN} />
                <CSVCreator moves={moves} />
            </div>

            {stats && (
                <div id="statistics" className="card">
                    <AdvantageChart data={evals.advantages} />
                    <TimeChart data={stats.times} />
                </div>
            )}

            {wStats && bStats && stats && (
                <div id="player-stats" className="card">
                    <PlayerStats
                        whiteStats={wStats}
                        blackStats={bStats}
                        evals={evals}
                        moves={moves}
                    />
                </div>
            )}

            <div className="card">
                <LogBox />
            </div>
        </div>
    );
}

export default GameView;
