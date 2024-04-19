/**
 * Redux reducer for managing various game boards.
 * This reducer combines multiple board reducers.
 * It is used as a part of resetReducer
 * @see /resetReducer.ts
 *
 * @module boardReducer
 * @returns {Function} The combined reducer function.
 */

import { combineReducers } from "@reduxjs/toolkit";
import { AppThunkAction } from "../store";
import chessboardReducer, { resetChessboards } from "./board/chessboardReducer";
import connectFourBoardReducer, {
    resetConnectFourBoards,
} from "./board/connectFourBoardReducer";

const boardReducer = combineReducers({
    chessboards: chessboardReducer,
    connectFourBoards: connectFourBoardReducer,
});

/**
 * Action creator for resetting all game boards.
 * @returns {AppThunkAction} A thunk action to dispatch reset actions for all boards.
 */
const resetBoards = (): AppThunkAction => (dispatch) => {
    dispatch(resetChessboards());
    dispatch(resetConnectFourBoards());
};

export default boardReducer;
export { resetBoards };
