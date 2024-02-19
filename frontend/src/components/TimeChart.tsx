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
import { CustomTooltip } from "./CustomTooltip";
import { setBoardIndex } from "../reducers/boardIndexReducer";
import store from "../store";
import { useAppSelector } from "../hook";

interface LineChartProps {
    data: number[];
}

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
                width={1200}
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
                <ReferenceLine x={referenceIndex} stroke="#FF9999" />
            </LineChart>
        </div>
    );
};

export default TimeChart;
