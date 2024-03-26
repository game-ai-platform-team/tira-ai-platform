import { AppThunkAction } from "../store";
import { resetAlLLog } from "./allLogReducer.ts";
import { resetBoardIndex } from "./boardIndexReducer";
import { resetBoards } from "./boardReducer.ts";
import { resetGame } from "./gameReducer";
import { resetMoves } from "./moveReducer";

const resetStateReducer = (): AppThunkAction => (dispatch) => {
    dispatch(resetBoardIndex());
    dispatch(resetBoards());
    dispatch(resetMoves());
    dispatch(resetGame());
    dispatch(resetAlLLog());
};

export default resetStateReducer;
