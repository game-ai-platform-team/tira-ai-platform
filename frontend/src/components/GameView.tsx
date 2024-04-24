import SubmitForm from "./SubmitForm";
import MoveList from "./MoveList";
import "../scss/GameView.scss";
import statisticsService from "../services/StatisticsService";
import { useAppDispatch, useAppSelector } from "../hook";
import AdvantageChart from "./AdvantageChart";
import TimeChart from "./TimeChart";
import CSVCreator from "./CSVCreator.tsx";
import { LogBox } from "./LogBox.tsx";
import PlayerStats from "./PlayerStats.tsx";
import Chessboard from "./Chessboard.tsx";
import CFourboard from "./CFourboard.tsx";
import { setToast } from "../reducers/toastReducer.ts";
import Notification from "../components/Notification";

interface GameViewProps {
    game: string;
}

/**
 * Draws the entire app other than the navigationbar.
 * Components include: Chessboard, CFourboard, SubmitForm, MoveList,
 * CSVCreator, AdvantageChart, TimeChart, PlayerStats, LogBox
 *
 * @param string game: a string representing the currently active game
 *
 * @returns {JSX.Element} the entire view of the app when a game is chosen
 */
function GameView(props: GameViewProps): JSX.Element {
    const dispatch = useAppDispatch();
    const moves = useAppSelector((state) => state.moves);

    const stats = statisticsService.getStatistics(moves);
    const evals = statisticsService.getEvaluations(moves, true);

    const wStats = statisticsService.getStatistics(moves, 0);
    const bStats = statisticsService.getStatistics(moves, 1);

    const gameBoard = props.game === "chess" ? <Chessboard /> : <CFourboard />;

    const handleCopyPGN = () => {
        const text = statisticsService.uciToPGN(moves);
        const pgn = document.createElement("textarea");
        pgn.value = text;
        pgn.style.position = "fixed";

        pgn.select();
        try {
            navigator.clipboard.writeText(pgn.value);
            dispatch(
                setToast({
                    title: "PGN copied successfully!",
                    text: pgn.value,
                    color: "Success",
                }),
            );
            console.log("Text copied to clipboard:", text);
        } catch (error) {
            dispatch(
                setToast({
                    title: "Copying PGN failed.",
                    text: `Unable to copy text to clipboard: ${error}`,
                    color: "Danger",
                }),
            );
            console.error("Unable to copy text to clipboard:", error);
        }

        document.body.removeChild(pgn);
    };

    return (
        <div id="game-view">
            <Notification />
            <div>
                <SubmitForm />
                <LogBox />
            </div>
            {gameBoard}
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

            {wStats && bStats && stats && props.game === "chess" && (
                <div id="player-stats" className="card">
                    <PlayerStats
                        whiteStats={wStats}
                        blackStats={bStats}
                        evals={evals}
                        moves={moves}
                    />
                </div>
            )}
        </div>
    );
}

export default GameView;
