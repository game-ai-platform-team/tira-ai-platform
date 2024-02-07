import React from "react";
import "./AdvantageBar.css";

interface AdvantageBarProps {
    linePosition?: number;
}

const AdvantageBar: React.FC<AdvantageBarProps> = ({ linePosition = 0 }) => {
    const clampedLinePosition = Math.max(-1, Math.min(1, linePosition));

    return (
        <div className="advantage-bar">
            <div className="division-line top"></div>
            <div className="division-line middle"></div>
            <div className="division-line bottom"></div>
            <div
                className="red-line"
                style={{
                    top: `calc(${(clampedLinePosition + 1) * 50}% - 2px)`,
                }}
            ></div>
        </div>
    );
};

export default AdvantageBar;
