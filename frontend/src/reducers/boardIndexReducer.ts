import { createSlice } from "@reduxjs/toolkit";
/**
 * Redux slice for changing the board state.
 * The functions are called from various places.
 */
const boardIndexSlice = createSlice({
    name: "boardIndex",
    initialState: 0,
    reducers: {
        setBoardIndex(_, action) {
            return action.payload;
        },
        nextBoard(state) {
            return state + 1;
        },
        previousBoard(state) {
            return state - 1;
        },
        resetBoardIndex() {
            return 0;
        },
    },
});

export default boardIndexSlice.reducer;

export const { setBoardIndex, nextBoard, previousBoard, resetBoardIndex } =
    boardIndexSlice.actions;
