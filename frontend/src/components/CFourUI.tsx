import MoveStatistics from "../interfaces/MoveStatistics";

interface CFourUIProps {
    row: number;
    column: number;
    moves: MoveStatistics[];
}

const CFourUI = ({ row, column, moves }: CFourUIProps) => {
    const style = { backgroundColor: "#a0522d" };

    const createBoardFromMoves = () => {
        const board: number[][] = [];
        for (let i = 0; i <= column; i++) {
            board.push(new Array(row).fill(0));
        }

        if (moves) {
            moves.forEach((move, index) => {
                const moveValue = parseInt(move.move);
                if (!isNaN(moveValue)) {
                    const valueToAdd = index % 2 === 0 ? 1 : 2;
                    const boardRow = board[moveValue];
                    const colorIndex = boardRow.lastIndexOf(0);
                    if (colorIndex !== -1) {
                        boardRow[colorIndex] = valueToAdd;
                    }
                }
            });
        }

        return board;
    };

    const getCircle = (row: number, column: number, board: number[][]) => {
        let fillColor = "white";
        const colorCode = board[column][row];
        if (colorCode === 1) {
            fillColor = "red";
        } else if (colorCode === 2) {
            fillColor = "yellow";
        }

        return (
            <circle
                key={`${row}-${column}`}
                cx={column * 80 + 40}
                cy={row * 80 + 40}
                r={32}
                fill={fillColor}
            ></circle>
        );
    };

    const board = createBoardFromMoves();

    const generateCircles = () => {
        const circles = [];
        for (let columnIndex = 0; columnIndex < column; columnIndex++) {
            for (let rowIndex = 0; rowIndex < row; rowIndex++) {
                circles.push(getCircle(rowIndex, columnIndex, board));
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
