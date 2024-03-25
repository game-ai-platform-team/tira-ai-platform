import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "kokopu";

const boardSlice = createSlice({
    name: "board",
    initialState: [new Position().fen()],
    reducers: {
        newBoard(state, action: PayloadAction<string>) {
            state.push(action.payload);
        },
        resetBoards(state, action: PayloadAction<string>) {
            return [action.payload];
        },
    },
});

export default boardSlice.reducer;

export const { newBoard, resetBoards } = boardSlice.actions;
