/**
 * Redux reducer for managing various game boards.
 * 
 * This reducer combines multiple board reducers for different games,
 * such as chessboards and Connect Four boards.
 * It also exports an action creator for resetting all boards.
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

/**
 * Reducer function combining chessboard and Connect Four board reducers.
 * 
 * @param {Object} state - The current state of the boards.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} The updated state.
 */
const boardReducer = combineReducers({
    chessboards: chessboardReducer,
    connectFourBoards: connectFourBoardReducer,
});

/**
 * Action creator for resetting all game boards.
 * 
 * @returns {AppThunkAction} A thunk action to dispatch reset actions for all boards.
 */
const resetBoards = (): AppThunkAction => (dispatch) => {
    dispatch(resetChessboards());
    dispatch(resetConnectFourBoards());
};

export default boardReducer;
export { resetBoards };
