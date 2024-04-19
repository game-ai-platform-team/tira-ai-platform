import { createSlice } from "@reduxjs/toolkit";
/**
 * Redux slice for changing the board state.
 * The functions are called whenever a new move is made and when user browses through game states in UI
 * @see /../components/Chessboard.tsx
 * @see /../components/CFourBoard.tsx
 * @see /../components/AdvantageChart.tsx
 * @see /../components/TimeChart.tsx
 * @see /../components/PlayerStats.tsx
 * 
 * resetBoardIndex is only called as a part of ResetReducer
 * @see /../reducers/ResetReducer.ts
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
