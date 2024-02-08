import "./AdvantageBar.css";

interface AdvantageBarProps {
    linePosition?: number;
    width?: number;
    height?: number;
    topColor?: string;
    botColor?: string;
}

const AdvantageBar = ({
    linePosition = 0,
    width = 50,
    height = 500,
    topColor = "#b5876b",
    botColor = "#f0dec7",
}: AdvantageBarProps) => {
    const indicatorPosition = ((linePosition + 1) / 2) * height;

    return (
        <div className="advantage-bar">
            <svg
                width={width}
                height={height}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="background"
                        x1="0%"
                        x2="0%"
                        y1="0%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor={topColor} />
                        <stop offset="100%" stopColor={botColor} />
                    </linearGradient>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    rx="10px"
                    ry="10px"
                    fill="url(#background)"
                    style={{ stroke: "black", strokeWidth: "2px" }}
                />
                <line
                    x1="0%"
                    x2="100%"
                    y1="25%"
                    y2="25%"
                    style={{ stroke: "black", width: "2px" }}
                />
                <line
                    x1="0%"
                    x2="100%"
                    y1="50%"
                    y2="50%"
                    style={{ stroke: "black", width: "2px" }}
                />
                <line
                    x1="0%"
                    x2="100%"
                    y1="75%"
                    y2="75%"
                    style={{ stroke: "black", width: "2px" }}
                />
                <line
                    x1="0%"
                    x2="100%"
                    y1={indicatorPosition}
                    y2={indicatorPosition}
                    style={{ stroke: "red", strokeWidth: "5px" }}
                />
            </svg>
        </div>
    );
};

export default AdvantageBar;
