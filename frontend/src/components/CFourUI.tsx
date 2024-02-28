interface CFourUIProps {
    row: number;
    column: number;
}

const CFourUI = ({ row, column }: CFourUIProps) => {
    const style = { backgroundColor: "#a0522d" };

    const getCircle = (row: number, column: number) => {
        return (
            <circle
                key={`${row}-${column}`}
                cx={column * 80 + 40}
                cy={row * 80 + 40}
                r={32}
                fill="white"
            ></circle>
        );
    };

    const generateCircles = () => {
        const circles = [];
        for (let columnIndex = 0; columnIndex < column; columnIndex++) {
            for (let rowIndex = 0; rowIndex < row; rowIndex++) {
                circles.push(getCircle(rowIndex, columnIndex));
            }
        }
        return circles;
    };

    return (
        <div>
            <svg
                width={column * 80}
                height={row * 80}
                xmlns="http://www.w3.org/2000/svg"
                style={style}
            >
                {generateCircles()}
            </svg>
        </div>
    );
};

export default CFourUI;
