import store from "../store";
import { resetBoardIndex } from "./boardIndexReducer";
import { resetGame } from "./gameReducer";
import { resetMoves } from "./moveReducer";
import { resetAlLLog } from "./allLogReducer.ts";
import { resetChessboards } from "./board/chessboardReducer.ts";

const resetBoards = () => () => {
    store.dispatch(resetChessboards());
};

const resetStateReducer = () => {
    return () => {
        store.dispatch(resetBoardIndex());
        store.dispatch(resetBoards());
        store.dispatch(resetMoves());
        store.dispatch(resetGame());
        store.dispatch(resetAlLLog());
    };
};

export default resetStateReducer;
