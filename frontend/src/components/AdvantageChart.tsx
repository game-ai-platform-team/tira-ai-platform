import React from "react";

interface LineChartProps {
    data: number[];
}

const AdvantageChart: React.FC<LineChartProps> = ({ data }) => {
    const viewBoxWidth = 500; // Width of the viewBox
    const viewBoxHeight = 200; // Height of the viewBox
    const padding = 24; // Padding for the chart within the viewBox
    const chartWidth = viewBoxWidth - 2 * padding; // Width of the chart area
    const chartHeight = viewBoxHeight - 2 * padding; // Height of the chart area

    // Calculate the x and y coordinates of each point
    const points = data.map((value, index) => {
        // Clamp the value between -1 and 1
        const clampedValue = Math.max(-1, Math.min(1, value));
        return {
            x: (index / (data.length - 1)) * chartWidth + padding,
            y: ((1 - clampedValue) * chartHeight) / 2 + padding,
        };
    });

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
                Game Advantage:
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

            {/* Horizontal line in the middle */}
            <line
                x1={padding}
                y1={padding + chartHeight / 2}
                x2={padding + chartWidth}
                y2={padding + chartHeight / 2}
                stroke="gray"
                strokeWidth="1"
            />

            {/* Vertical lines at data points */}
            {points.map((point, index) => (
                <line
                    key={index}
                    x1={point.x}
                    y1={padding}
                    x2={point.x}
                    y2={padding + chartHeight}
                    stroke="gray"
                    strokeWidth="1"
                />
            ))}

            {/* Line chart */}
            <path d={path} fill="none" stroke="#f0dec7" strokeWidth="3" />

            {/* Points on the line */}
            {points.map((point, index) => (
                <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    stroke="#b5876b"
                    fill={
                        index === 0
                            ? "#f0dec7"
                            : index % 2 === 0
                              ? "black"
                              : "white"
                    }
                />
            ))}
        </svg>
    );
};

export default AdvantageChart;
