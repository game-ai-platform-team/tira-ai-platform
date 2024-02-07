import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoveProps } from "../components/Move";

const moveSlice = createSlice({
    name: "moves",
    initialState: new Array<MoveProps>(),
    reducers: {
        newMove(state, action: PayloadAction<MoveProps>) {
            state.push(action.payload);
        },
    },
});

export default moveSlice.reducer;

export const { newMove } = moveSlice.actions;
