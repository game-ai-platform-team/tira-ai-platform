import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "kokopu";
import MoveStatistics from "../interfaces/MoveStatistics.ts";

const boardSlice = createSlice({
    name: "board",
    initialState: [new Position()],
    reducers: {
        newBoard(state, action: PayloadAction<MoveStatistics>) {
            const oldPosition = state[state.length - 1] as Position;
            const position = new Position(oldPosition);

            position.play(position.uci(action.payload.move));

            state.push(position);
        },
    },
});

export default boardSlice.reducer;

export const { newBoard } = boardSlice.actions;
