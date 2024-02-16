import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface LineChartProps {
    data: number[];
}

const TimeChart: React.FC<LineChartProps> = ({ data }) => {
    const chartData = data.map((value, index) => ({
        turn: index,
        [index % 2 === 0 ? 'w_time' : 'b_time']: value
    }));

    return (
        <LineChart width={800} height={400} data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis dataKey="turn"/>
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line connectNulls type="monotone" dataKey="w_time" stroke="#d6baa9" fill="white" />
            <Line connectNulls type="monotone" dataKey="b_time" stroke="#706056" fill="black" />
        </LineChart>
    )
};

export default TimeChart;
