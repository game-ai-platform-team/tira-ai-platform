import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import "../scss/CustomTooltip.scss";
import { CustomTooltip } from "./CustomTooltip";

interface AdvantageChartProps {
    data: number[];
}

const AdvantageChart: React.FC<AdvantageChartProps> = ({ data }) => {
    return (
        <div>
            <h2 id="card-header">Advantage Chart</h2>
            <LineChart
                width={800}
                height={400}
                data={data.map((value, index) => ({ value, index }))}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                onClick={(data) => {
                    // Set chessboard active move to data.activeLabel
                    console.log(data.activeLabel);
                }}
            >
                <YAxis ticks={[-1, 0, 1]} />
                <XAxis />
                <Tooltip
                    cursor={{ stroke: "red" }}
                    content={<CustomTooltip />}
                />
                <CartesianGrid stroke="#f5f5f5" />
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
