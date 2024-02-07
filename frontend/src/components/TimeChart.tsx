import React from "react";

interface LineChartProps {
    data: number[];
}

const TimeChart: React.FC<LineChartProps> = ({ data }) => {
    const viewBoxWidth = 400; // Width of the viewBox
    const viewBoxHeight = 200; // Height of the viewBox
    const padding = 24; // Padding for the chart within the viewBox
    const chartWidth = viewBoxWidth - 2 * padding; // Width of the chart area
    const chartHeight = viewBoxHeight - 2 * padding; // Height of the chart area

    // Calculate the maximum value in the data array
    const maxDataValue = Math.max(...data);

    // Calculate the y-axis interval for the horizontal lines
    const yInterval = 100;

    // Generate the y-axis values for the horizontal lines
    const yValues = Array.from(
        { length: Math.floor(maxDataValue / yInterval) + 1 },
        (_, index) => index * yInterval,
    );

    // Calculate the x and y coordinates of each point
    const points = data.map((value, index) => ({
        x: (index / (data.length - 1)) * chartWidth + padding,
        y: (1 - value / maxDataValue) * chartHeight + padding,
    }));

    // Generate the path string for the line connecting the points
    const path = points
        .map(
            (point, index) =>
                `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
        )
        .join(" ");

    return (
        <svg
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            width="100%"
            height="100%"
        >
            {/* Title */}
            <text
                x={viewBoxWidth / 2}
                y={padding / 2}
                textAnchor="middle"
                fontSize="16"
                fill="black"
            >
                Time Taken
            </text>

            {/* Box around the chart */}
            <rect
                x={padding}
                y={padding}
                width={chartWidth}
                height={chartHeight}
                fill="none"
                stroke="black"
                strokeWidth="2"
            />

            {/* Horizontal lines */}
            {yValues.map((value, index) => (
                <line
                    key={index}
                    x1={padding}
                    y1={
                        viewBoxHeight -
                        padding -
                        (value / maxDataValue) * chartHeight
                    }
                    x2={viewBoxWidth - padding}
                    y2={
                        viewBoxHeight -
                        padding -
                        (value / maxDataValue) * chartHeight
                    }
                    stroke="gray"
                    strokeWidth="1"
                />
            ))}

            {/* Line chart */}
            <path d={path} fill="none" stroke="blue" strokeWidth="2" />

            {/* Points on the line */}
            {points.map((point, index) => (
                <text
                    key={index}
                    x={point.x}
                    y={point.y - 10}
                    textAnchor="middle"
                    fill="blue"
                >
                    {data[index]}
                </text>
            ))}
        </svg>
    );
};

export default TimeChart;
