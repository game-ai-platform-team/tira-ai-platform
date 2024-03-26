import { combineReducers } from "@reduxjs/toolkit";
import { AppThunkAction } from "../store";
import chessboardReducer, { resetChessboards } from "./board/chessboardReducer";

const boardReducer = combineReducers({ chessboards: chessboardReducer });

const resetBoards = (): AppThunkAction => (dispatch) => {
    dispatch(resetChessboards());
};

export default boardReducer;
export { resetBoards };
