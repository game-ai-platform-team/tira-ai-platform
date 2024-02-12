import { createSlice } from "@reduxjs/toolkit";

const boardIndexSlice = createSlice({
    name: "boardIndex",
    initialState: 0,
    reducers: {
        increaseMoveNumber(state) {
            return state + 1;
        },
        decreaseMoveNumber(state) {
            return state - 1;
        },
    },
});

export default boardIndexSlice.reducer;

export const { increaseMoveNumber, decreaseMoveNumber } =
    boardIndexSlice.actions;
