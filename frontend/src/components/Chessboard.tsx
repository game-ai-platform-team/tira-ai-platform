import { Chessboard as KokopuChessboard } from "kokopu-react";
import "../scss/Chessboard.scss";
import { nextBoard, previousBoard } from "../reducers/boardIndexReducer";
import { useAppDispatch, useAppSelector } from "../hook";
import BoardProps from "../interfaces/BoardProps";

const Chessboard = ({ increaseMove, decreaseMove }: BoardProps) => {
    let arrow: string = "G";
    const dispatch = useAppDispatch();
    const boards = useAppSelector((state) => state.boards);
    const moves = useAppSelector((state) => state.moves);
    const boardIndex = useAppSelector((state) => state.boardIndex);

    if (boardIndex >= 1) {
        console.log(moves);
        console.log(boardIndex);
        arrow = arrow + moves[boardIndex - 1].move.slice(0, 4);
    }

    increaseMove =
        increaseMove ||
        (() => {
            if (boardIndex + 1 >= boards.length) {
                return;
            }

            dispatch(nextBoard());
        });
    decreaseMove =
        decreaseMove ||
        (() => {
            if (boardIndex - 1 < 0) {
                return;
            }

            dispatch(previousBoard());
        });

    return (
        <div id="chessboard">
            <h2 id="chessboard-header">Player1 vs Player2</h2>
            <KokopuChessboard
                position={boards[boardIndex]}
                squareSize={60}
                arrowMarkers={arrow}
            />
            <div>
                <button onClick={decreaseMove} id="previousChessboardButton">
                    {"<"}
                </button>
                <button onClick={increaseMove} id="nextChessboardButton">
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Chessboard;
