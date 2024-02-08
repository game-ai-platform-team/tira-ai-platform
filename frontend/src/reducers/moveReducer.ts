import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoveProps } from "../components/Move";

const moveSlice = createSlice({
    name: "moves",
    initialState: new Array<MoveProps>(),
    reducers: {
        createMove(state, action: PayloadAction<MoveProps>) {
            state.push(action.payload);
        },
    },
});

export default moveSlice.reducer;

export const { createMove } = moveSlice.actions;
