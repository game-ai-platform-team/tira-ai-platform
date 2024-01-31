import React from 'react';

interface EvaluationBarProps {
  linePosition?: number; // Prop to control the position of the red line (percentage)
}

const EvaluationBar: React.FC<EvaluationBarProps> = ({ linePosition = 0 }) => {
  // Ensure linePosition is within the range [-1, 1]
  const clampedLinePosition = Math.max(-1, Math.min(1, linePosition));

  const barStyle: React.CSSProperties = {
    width: '50px',
    height: '490px',
    background: 'linear-gradient(to bottom, #b5876b, #f0dec7)',
    position: 'relative',
  };

  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    top: `calc(${(clampedLinePosition + 1) * 50}% - 1px)`, // Adjusted to place the line based on linePosition
    left: '0',
    width: '100%',
    height: '2px',
    backgroundColor: 'red',
  };

  return (
    <div style={barStyle}>
      <div style={lineStyle}></div>
      {/* Add any additional content or styling if needed */}
    </div>
  );
};

export default EvaluationBar;
