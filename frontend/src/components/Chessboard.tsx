import { Chessboard as KokopuChessboard } from "kokopu-react";
import "../scss/Chessboard.scss";
import store from "../store";
import {
    increaseMoveNumber,
    decreaseMoveNumber,
} from "../reducers/boardReducer";
import { useAppDispatch, useAppSelector } from "../hook";
import BoardProps from "../interfaces/BoardProps";

const Chessboard = ({ increaseMove, decreaseMove }: BoardProps) => {
    let arrow: string = "G";
    const dispatch = useAppDispatch();
    const board = useAppSelector((state) => state.chessboard);

    if (board.boardIndex > 1) {
        console.log(store.getState().moves);
        console.log(board.boardIndex);
        arrow =
            arrow +
            store.getState().moves[board.boardIndex - 1].move.slice(0, 4);
    }

    increaseMove = increaseMove || (() => dispatch(increaseMoveNumber()));
    decreaseMove = decreaseMove || (() => dispatch(decreaseMoveNumber()));

    return (
        <div id="chessboard">
            <h2 id="chessboard-header">Player1 vs Player2</h2>
            <KokopuChessboard
                position={board.position[board.boardIndex]}
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
