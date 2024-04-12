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
import { Button } from "react-bootstrap";
import Chessboard from "./Chessboard.tsx";
import CFourboard from "./CFourboard.tsx";


interface GameViewProps {
    game: string;
}

function GameView(props: GameViewProps) {
    const moves = useAppSelector((state) => state.moves);

    const stats = statisticsService.getStatistics(moves);
    const evals = statisticsService.getEvaluations(moves, true);

    const wStats = statisticsService.getStatistics(moves, 0);
    const bStats = statisticsService.getStatistics(moves, 1);

    const gameBoard = (props.game === "chess" ? <Chessboard /> : <CFourboard />)

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
            {gameBoard}
            <Button
                onClick={() => {
                    let instructionsWindow = undefined
                    if (props.game === "chess") {
                        instructionsWindow = window.open(
                            "chessmanual",
                            "_blank",
                            "width=600,height=400",
                        );
                    }
                    if (props.game === "connect_four") {
                        instructionsWindow = window.open(
                            "cfourmanual",
                            "_blank",
                            "width=600,height=400",
                        );
                    }

                    if (instructionsWindow !== undefined && instructionsWindow !== null) {
                        instructionsWindow.focus();
                    } else {
                        console.error("Popup blocked by browser");
                    }
                }}
                className="instruction-button"
                variant="flat"
                size="lg"
                aria-label="Instructions"
                style={{ color: "black" }}
            >
                Instructions
            </Button>

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
