import React from "react";
import "./EvaluationBar.css";

interface EvaluationBarProps {
    linePosition?: number;
}

const EvaluationBar: React.FC<EvaluationBarProps> = ({ linePosition = 0 }) => {
    const clampedLinePosition = Math.max(-1, Math.min(1, linePosition));

    return (
        <div className="evaluation-bar">
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

export default EvaluationBar;
