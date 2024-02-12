import { Chessboard as KokopuChessboard } from "kokopu-react";
import "../scss/Chessboard.scss";
import store from "../store";
import {
    increaseMoveNumber,
    decreaseMoveNumber,
} from "../reducers/boardReducer";
import { useAppDispatch } from "../hook";
import BoardProps from "../interfaces/BoardProps";

const Chessboard = ({ increaseMove, decreaseMove }: BoardProps) => {
    let arrow: string = "G";
    const dispatch = useAppDispatch();

    if (store.getState().chessboard.moveNumber > 1) {
        console.log(store.getState().moves);
        console.log(store.getState().chessboard.moveNumber);
        arrow =
            arrow +
            store
                .getState()
                .moves[
                    store.getState().chessboard.moveNumber - 1
                ].move.slice(0, 4);
    }

    increaseMove = increaseMove || (() => dispatch(increaseMoveNumber()));
    decreaseMove = decreaseMove || (() => dispatch(decreaseMoveNumber()));

    return (
        <div id="chessboard">
            <h2 id="chessboard-header">Player1 vs Player2</h2>
            <KokopuChessboard
                position={
                    store.getState().chessboard.position[
                        store.getState().chessboard.moveNumber
                    ]
                }
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
