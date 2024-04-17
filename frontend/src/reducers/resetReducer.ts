/**
 * Redux reducer for resetting the application state.
 * This reducer dispatches actions to reset various parts of the application state.
 * 
 * @module resetStateReducer
 * @returns {AppThunkAction} A thunk action to dispatch all reset actions.
 */

import { AppThunkAction } from "../store";
import { resetAlLLog } from "./allLogReducer.ts";
import { resetBoardIndex } from "./boardIndexReducer";
import { resetBoards } from "./boardReducer.ts";
import { resetGame } from "./gameReducer";
import { resetMoves } from "./moveReducer";

/**
 * Action creator for resetting the entire application state.
 * 
 * @returns {AppThunkAction} A thunk action to dispatch reset actions for all parts of the state.
 */
const resetStateReducer = (): AppThunkAction => (dispatch) => {
    dispatch(resetBoardIndex());
    dispatch(resetBoards());
    dispatch(resetMoves());
    dispatch(resetGame());
    dispatch(resetAlLLog());
};

export default resetStateReducer;
