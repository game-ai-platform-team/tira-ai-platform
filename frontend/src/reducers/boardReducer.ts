import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "kokopu";
import MoveStatistics from "../interfaces/MoveStatistics";

const boardSlice = createSlice({
    name: "board",
    initialState: [new Position().fen()],
    reducers: {
        newBoard(state, action: PayloadAction<MoveStatistics>) {
            const oldPosition = state[state.length - 1];
            const position = new Position(oldPosition);

            position.play(position.uci(action.payload.move));

            state.push(position.fen());
        },
        resetBoards() {
            return [new Position().fen()];
        },
    },
});

export default boardSlice.reducer;

export const { newBoard, resetBoards } = boardSlice.actions;
