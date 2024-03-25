import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "kokopu";

const boardSlice = createSlice({
    name: "board",
    initialState: [new Position().fen()],
    reducers: {
        newBoard(state, action: PayloadAction<string>) {
            state.push(action.payload);
        },
        resetBoards() {
            return [new Position().fen()];
        },
    },
});

export default boardSlice.reducer;

export const { newBoard, resetBoards } = boardSlice.actions;
