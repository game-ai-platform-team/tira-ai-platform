import store from "../store";
import { resetBoardIndex } from "./boardIndexReducer";
import { resetBoards } from "./boardReducer";
import { resetGame } from "./gameReducer";
import { resetMoves } from "./moveReducer";
import { resetAlLLog } from "./allLogReducer.ts";

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
