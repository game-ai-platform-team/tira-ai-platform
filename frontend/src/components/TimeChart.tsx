import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from "recharts";
import "../scss/CustomTooltip.scss";
import { CustomTooltip } from "./CustomTooltip";
import { setBoardIndex } from "../reducers/boards/boardIndexReducer";
import store from "../store";
import { useAppSelector } from "../hook";

interface LineChartProps {
    data: number[];
}
/**
 * Draws a line chart depicting how much time AIs take for each move.
 * Clicking the chart will display the corresponding turn on the game board.
 *
 * @returns {JSX.Element} A line chart describing how much time making each move took.
 */
const TimeChart: React.FC<LineChartProps> = ({ data }) => {
    const referenceIndex = useAppSelector((state) => state.boardIndex);

    const handleChartClick = (move: string) => {
        store.dispatch(setBoardIndex(move));
    };

    const chartData = [
        { turn: 0, w_time: undefined, b_time: undefined },
        ...data.map((value, index) => ({
            turn: index + 1,
            [index % 2 === 0 ? "w_time" : "b_time"]: value,
        })),
    ];

    return (
        <div>
            <h2 className="card-header">Time Chart</h2>
            <LineChart
                style={{ cursor: "pointer" }}
                width={1000}
                height={400}
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                onClick={(data) => {
                    if (data.activeLabel !== undefined) {
                        handleChartClick(data.activeLabel);
                    }
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="turn" />
                <YAxis />
                <Tooltip
                    cursor={{ stroke: "red" }}
                    content={<CustomTooltip />}
                />
                <ReferenceLine x={referenceIndex} stroke="#FF9999" />
                <Line
                    animationDuration={0}
                    connectNulls
                    type="linear"
                    dataKey="w_time"
                    stroke="#d6baa9"
                    fill="white"
                />
                <Line
                    animationDuration={0}
                    connectNulls
                    type="linear"
                    dataKey="b_time"
                    stroke="#706056"
                    fill="black"
                />
            </LineChart>
        </div>
    );
};

export default TimeChart;
