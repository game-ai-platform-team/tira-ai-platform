import { createSlice } from "@reduxjs/toolkit";
/**
 * Redux slice for changing the board state.
 * setBoardIndex changes index to any given number
 * nextBoard increases the given state
 * previousBoard decreases the given state
 * resetBoardIndex resets game to the initial state
 * @returns {Object} The slice containing reducer and actions.
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
