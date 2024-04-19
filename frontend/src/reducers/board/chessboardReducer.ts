/**
 * This slice manages the state of the chessboard in the Redux store.
 * It provides reducers for updating the chessboard state based on incoming moves
 * and for resetting the chessboard state.
 *
 * newChessboard is called from SocketService
 * @see /../services/SocketService.ts
 * resetChessboards is used as a part of resetBoards in BoardReducer
 * @see /../reducers/boardReducer.ts
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "kokopu";
import MoveStatistics from "../../interfaces/MoveStatistics";

const chessboardSlice = createSlice({
    name: "chessboard",
    initialState: [new Position().fen()],
    reducers: {
        newChessboard(state, action: PayloadAction<MoveStatistics>) {
            const oldPosition = state[state.length - 1];
            const position = new Position(oldPosition);

            position.play(position.uci(action.payload.move));

            state.push(position.fen());
        },
        resetChessboards() {
            return [new Position().fen()];
        },
    },
});

export default chessboardSlice.reducer;

export const { newChessboard, resetChessboards } = chessboardSlice.actions;
