import { Chessboard as KokopuChessboard } from "kokopu-react";
import "../scss/Chessboard.scss";
import store from "../store";
import {
    increaseMoveNumber,
    decreaseMoveNumber,
} from "../reducers/BoardReducer";

const Chessboard = () => {
    let arrow: string = "G";
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
                <button
                    onClick={() => {
                        store.dispatch(decreaseMoveNumber());
                    }}
                    id="previousChessboardButton"
                >
                    {"<"}
                </button>
                <button
                    onClick={() => {
                        store.dispatch(increaseMoveNumber());
                    }}
                    id="nextChessboardButton"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Chessboard;
