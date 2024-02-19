import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";

interface LineChartProps {
    data: number[];
}

const TimeChart: React.FC<LineChartProps> = ({ data }) => {
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
                width={800}
                height={400}
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="turn" />
                <YAxis />
                <Tooltip
                    cursor={{ stroke: "red" }}
                    content={<CustomTooltip />}
                />
                <CartesianGrid stroke="#f5f5f5" />
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
