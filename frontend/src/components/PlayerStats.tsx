import React from "react";
import { Statistics, Evaluations } from "../services/StatisticsService";

interface MoveInfoProps {
    whiteStats: Statistics;
    blackStats: Statistics;
    evals: Evaluations;
}

const PlayerStats: React.FC<MoveInfoProps> = ({ whiteStats, blackStats, evals }) => {
    return (
        <div>
            <h2 className="card-header">Black Stats</h2>
                <div>
                    <p>Accuracy: {evals.accuracyBlack} %</p>
                    <p>Longest Move: {blackStats.longest.move} @ {blackStats.longest.time} ms</p>
                    <p>Shortest Move: {blackStats.shortest.move} @ {blackStats.shortest.time} ms</p>
                    <p>Average: {Math.round(blackStats.average)} ms</p>
                </div>
            <h2 className="card-header">White Stats</h2>
                <div>
                    <p>Accuracy: {evals.accuracyWhite} %</p>
                    <p>Longest Move: {whiteStats.longest.move} @ {whiteStats.longest.time} ms</p>
                    <p>Shortest Move: {whiteStats.shortest.move} @ {whiteStats.shortest.time} ms</p>
                    <p>Average: {Math.round(whiteStats.average)} ms</p>
                </div>
        </div>
    );
};

export default PlayerStats;
