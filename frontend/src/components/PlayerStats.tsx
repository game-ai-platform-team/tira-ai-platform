import React from "react";
import { Statistics, Evaluations } from "../services/StatisticsService";
import MoveStatistics from "../interfaces/MoveStatistics";
import { useDispatch } from "react-redux";
import { setBoardIndex } from "../reducers/boardIndexReducer";

interface MoveInfoProps {
    whiteStats: Statistics;
    blackStats: Statistics;
    evals: Evaluations;
    moves: MoveStatistics[];
}

const PlayerStats: React.FC<MoveInfoProps> = ({
    whiteStats,
    blackStats,
    evals,
    moves,
}) => {
    const dispatch = useDispatch();

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

    return (
        <div>
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
            </div>
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
            </div>
        </div>
    );
};

export default PlayerStats;
