/**
 * Redux reducer for resetting other reducers' states.
 * This reducer dispatches actions to reset various parts of the application state.
 * This reducer is called in SubmitForm when reset button is pressed
 * @see /../components/SubmitForm.tsx
 *
 * @module resetStateReducer
 * @returns {AppThunkAction} A thunk action to dispatch all reset actions.
 */

import { AppThunkAction } from "../store";
import { resetLogs } from "./logReducer.ts";
import { resetBoardIndex } from "./boards/boardIndexReducer.ts";
import { resetBoards } from "./boards/boardReducer.ts";
import { resetGame } from "./gameReducer";
import { resetMoves } from "./moveReducer";

/**
 * Action creator for resetting the stae of the entire game.
 *
 * @returns {AppThunkAction} A thunk action to dispatch reset actions for all parts of the state.
 */
const resetStateReducer = (): AppThunkAction => (dispatch) => {
    dispatch(resetBoardIndex());
    dispatch(resetBoards());
    dispatch(resetMoves());
    dispatch(resetGame());
    dispatch(resetLogs());
};

export default resetStateReducer;
