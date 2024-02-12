import { createSlice } from "@reduxjs/toolkit";

const boardIndexSlice = createSlice({
    name: "boardIndex",
    initialState: 0,
    reducers: {
        nextBoard(state) {
            return state + 1;
        },
        previousBoard(state) {
            return state - 1;
        },
    },
});

export default boardIndexSlice.reducer;

export const { nextBoard, previousBoard } = boardIndexSlice.actions;
