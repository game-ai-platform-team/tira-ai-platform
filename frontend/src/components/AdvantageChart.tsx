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

interface AdvantageChartProps {
    data: number[];
}
/**
 * Draws a line chart depicting who is in the lead during each step of the game.
 * Clicking the chart will display the corresponding turn on the game board.
 *
 * @returns {JSX.Element} A line chart describing which player is in the lead.
 */
const AdvantageChart: React.FC<AdvantageChartProps> = ({
    data,
}): JSX.Element => {
    const referenceIndex = useAppSelector((state) => state.boardIndex);

    const handleChartClick = (move: string) => {
        store.dispatch(setBoardIndex(move));
    };
    const isOverOne = data.reduce((a, b) => Math.max(a, b), -Infinity) > 1;
    const isUnderMinusOne =
        data.reduce((a, b) => Math.min(a, b), Infinity) < -1;

    return (
        <div>
            <h2 className="card-header">Advantage Chart</h2>
            <LineChart
                style={{ cursor: "pointer" }}
                width={1000}
                height={400}
                data={
                    isOverOne || isUnderMinusOne
                        ? data.map((value, index) => ({
                              value:
                                  (Math.max(Math.min(500, value), -500) + 500) *
                                      0.002 -
                                  1,
                              index,
                          }))
                        : data.map((value, index) => ({
                              value,
                              index,
                          }))
                }
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                onClick={(data) => {
                    if (data.activeLabel !== undefined) {
                        handleChartClick(data.activeLabel);
                    }
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <YAxis ticks={[-1, 0, 1]} />
                <XAxis />
                <Tooltip
                    cursor={{ stroke: "red" }}
                    content={<CustomTooltip />}
                />
                <ReferenceLine x={referenceIndex} stroke="#FF9999" />
                <Line
                    animationDuration={0}
                    type="linear"
                    dataKey="value"
                    stroke="#b5876b"
                    dot={({ cx, cy, index }) => {
                        const color =
                            index === 0
                                ? "#f0dec7"
                                : index % 2 === 0
                                  ? "black"
                                  : "white";
                        return (
                            <circle
                                key={index}
                                cx={cx}
                                cy={cy}
                                r={4}
                                stroke="#b5876b"
                                fill={color}
                            />
                        );
                    }}
                />
            </LineChart>
        </div>
    );
};

export default AdvantageChart;
