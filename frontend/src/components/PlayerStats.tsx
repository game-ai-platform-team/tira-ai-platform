import React, { useState } from "react";
import { Statistics, Evaluations } from "../services/StatisticsService";
import MoveStatistics from "../interfaces/MoveStatistics";
import { useDispatch } from "react-redux";
import { setBoardIndex } from "../reducers/boards/boardIndexReducer";
import { useAppSelector } from "../hook";
import "../scss/PlayerStats.scss";

interface MoveInfoProps {
    whiteStats: Statistics;
    blackStats: Statistics;
    evals: Evaluations;
    moves: MoveStatistics[];
}

/**
 * Renders statistics for player moves including accuracy, longest and shortest moves,
 * average move time, categorized moves (blunders, mistakes, inaccuracies), and all moves.
 *
 * @param {Statistics} whiteStats - Statistics object for white player.
 * @param {Statistics} blackStats - Statistics object for black player.
 * @param {Evaluations} evals - Object containing evaluations data.
 * @param {MoveStatistics[]} moves - Array of move statistics objects.
 *
 * @returns {JSX.Element} JSX element containing the rendered player statistics.
 */
const PlayerStats: React.FC<MoveInfoProps> = ({
    whiteStats,
    blackStats,
    evals,
    moves,
}) => {
    const dispatch = useDispatch();
    const moveClasses = evals.moveClasses;

    const activeMoveIndex = useAppSelector((state) => state.boardIndex);

    const bLong = blackStats.longest.move;
    const bShort = blackStats.shortest.move;
    const wLong = whiteStats.longest.move;
    const wShort = whiteStats.shortest.move;

    const findMoveIndex = (move: string): number => {
        return moves.findIndex((item) => item.move === move) + 1;
    };

    const bLongIndex = findMoveIndex(bLong);
    const bShortIndex = findMoveIndex(bShort);
    const wLongIndex = findMoveIndex(wLong);
    const wShortIndex = findMoveIndex(wShort);

    const handleMoveClick = (index: number) => {
        dispatch(setBoardIndex(index));
    };

    const renderMoveList = (
        isWhite: boolean,
        moveClassFilter?: string,
    ): JSX.Element[] => {
        const filteredMoves = moves.filter((_, i) =>
            isWhite ? i % 2 === 0 : i % 2 !== 0,
        );

        const moveList = filteredMoves.map((move, index) => {
            const moveIndex = isWhite ? index * 2 : index * 2 + 1;
            const moveClass = moveClasses[moveIndex];
            const isActive = moveIndex === activeMoveIndex - 1;

            if (!moveClassFilter || moveClass === moveClassFilter) {
                return (
                    <p
                        key={index}
                        onClick={() => handleMoveClick(moveIndex + 1)}
                        className={isActive ? "active-move" : ""}
                    >
                        {moveIndex + 1}: {move.move} | {moveClass} | {move.time}{" "}
                        ms
                    </p>
                );
            }

            return null;
        });

        return moveList.filter(Boolean) as JSX.Element[];
    };

    const whiteMoves = renderMoveList(true);
    const blackMoves = renderMoveList(false);

    const [whiteShowMoves, setWhiteShowMoves] = useState(true);
    const [blackShowMoves, setBlackShowMoves] = useState(true);

    const whiteBlunders = renderMoveList(true, "BLUNDER");
    const whiteMistakes = renderMoveList(true, "MISTAKE");
    const whiteInaccuracies = renderMoveList(true, "INACCURACY");

    const blackBlunders = renderMoveList(false, "BLUNDER");
    const blackMistakes = renderMoveList(false, "MISTAKE");
    const blackInaccuracies = renderMoveList(false, "INACCURACY");

    const [whiteShowBlunders, setWhiteShowBlunders] = useState(false);
    const [whiteShowMistakes, setWhiteShowMistakes] = useState(false);
    const [whiteShowInaccuracies, setWhiteShowInaccuracies] = useState(false);

    const [blackShowBlunders, setBlackShowBlunders] = useState(false);
    const [blackShowMistakes, setBlackShowMistakes] = useState(false);
    const [blackShowInaccuracies, setBlackShowInaccuracies] = useState(false);

    const renderMoveCategory = (
        title: string,
        showState: boolean,
        setShowState: React.Dispatch<React.SetStateAction<boolean>>,
        list: JSX.Element[],
        showCount: boolean,
    ) => (
        <div>
            <h3
                className="move-category"
                onClick={() => setShowState(!showState)}
            >
                {showCount ? list.length : ""} {title}
                <img
                    className="dropdown-arrow"
                    src={
                        showState
                            ? "dropdown_mark_open.svg"
                            : "dropdown_mark.svg"
                    }
                    alt=""
                />
            </h3>
            {showState && <div>{list}</div>}
        </div>
    );

    return (
        <div className="stats-container">
            <div className="stats-column">
                <h2 className="card-header">White Stats</h2>
                <div>
                    <p>Accuracy: {evals.accuracyWhite} %</p>
                    <p onClick={() => handleMoveClick(wLongIndex)}>
                        Longest Move: {wLongIndex}. {wLong} @{" "}
                        {whiteStats.longest.time} ms
                    </p>
                    <p onClick={() => handleMoveClick(wShortIndex)}>
                        Shortest Move: {wShortIndex}. {wShort} @{" "}
                        {whiteStats.shortest.time} ms
                    </p>
                    <p>Average: {Math.round(whiteStats.average)} ms</p>
                    {renderMoveCategory(
                        "Blunders",
                        whiteShowBlunders,
                        setWhiteShowBlunders,
                        whiteBlunders,
                        true,
                    )}
                    {renderMoveCategory(
                        "Mistakes",
                        whiteShowMistakes,
                        setWhiteShowMistakes,
                        whiteMistakes,
                        true,
                    )}
                    {renderMoveCategory(
                        "Inaccuracies",
                        whiteShowInaccuracies,
                        setWhiteShowInaccuracies,
                        whiteInaccuracies,
                        true,
                    )}
                    {renderMoveCategory(
                        "All Moves",
                        whiteShowMoves,
                        setWhiteShowMoves,
                        whiteMoves,
                        false,
                    )}
                </div>
            </div>
            <div className="stats-column">
                <h2 className="card-header">Black Stats</h2>
                <div>
                    <p>Accuracy: {evals.accuracyBlack} %</p>
                    <p onClick={() => handleMoveClick(bLongIndex)}>
                        Longest Move: {bLongIndex}. {bLong} @{" "}
                        {blackStats.longest.time} ms
                    </p>
                    <p onClick={() => handleMoveClick(bShortIndex)}>
                        Shortest Move: {bShortIndex}. {bShort} @{" "}
                        {blackStats.shortest.time} ms
                    </p>
                    <p>Average: {Math.round(blackStats.average)} ms</p>
                    {renderMoveCategory(
                        "Blunders",
                        blackShowBlunders,
                        setBlackShowBlunders,
                        blackBlunders,
                        true,
                    )}
                    {renderMoveCategory(
                        "Mistakes",
                        blackShowMistakes,
                        setBlackShowMistakes,
                        blackMistakes,
                        true,
                    )}
                    {renderMoveCategory(
                        "Inaccuracies",
                        blackShowInaccuracies,
                        setBlackShowInaccuracies,
                        blackInaccuracies,
                        true,
                    )}
                    {renderMoveCategory(
                        "All Moves",
                        blackShowMoves,
                        setBlackShowMoves,
                        blackMoves,
                        false,
                    )}
                </div>
            </div>
        </div>
    );
};
export default PlayerStats;
