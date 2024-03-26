import { combineReducers } from "@reduxjs/toolkit";
import chessboardReducer from "./board/chessboardReducer";

const boardReducer = combineReducers({ chessboards: chessboardReducer });

export default boardReducer;
