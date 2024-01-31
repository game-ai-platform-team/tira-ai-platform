// EvaluationBar.tsx
import React from "react";
import "./EvaluationBar.css"; // Import the associated CSS file

interface EvaluationBarProps {
  linePosition?: number;
}

const EvaluationBar: React.FC<EvaluationBarProps> = ({ linePosition = 0 }) => {
  // Ensure linePosition is within the range [-1, 1]
  const clampedLinePosition = Math.max(-1, Math.min(1, linePosition));

  return (
    <div className="evaluation-bar">
      <div className="division-line top"></div>
      <div className="division-line middle"></div>
      <div className="division-line bottom"></div>
      <div className="red-line" style={{ top: `calc(${(clampedLinePosition + 1) * 50}% - 2px)` }}></div>
      {/* Add any additional content or styling if needed */}
    </div>
  );
};

export default EvaluationBar;
