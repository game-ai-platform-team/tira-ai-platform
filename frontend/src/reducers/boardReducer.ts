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

const resetBoards = (): AppThunkAction => (dispatch) => {
    dispatch(resetChessboards());
    dispatch(resetConnectFourBoards());
};

export default boardReducer;
export { resetBoards };
