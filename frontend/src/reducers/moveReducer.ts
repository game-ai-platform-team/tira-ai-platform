import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MoveStatistics from "../interfaces/MoveStatistics.ts";

console.log("move")

const moveSlice = createSlice({
    name: "moves",
    initialState: new Array<MoveStatistics>(),
    reducers: {
        createMove(state, action: PayloadAction<MoveStatistics>) {
            state.push(action.payload);
        },
    },
});

export default moveSlice.reducer;

export const { createMove } = moveSlice.actions;
