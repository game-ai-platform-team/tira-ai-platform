import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "kokopu";
import MoveStatistics from "../interfaces/MoveStatistics.ts";

const boardSlice = createSlice({
    name: "board",
    initialState: { position: [new Position()], boardIndex: 0 },
    reducers: {
        newBoard(state, action: PayloadAction<MoveStatistics>) {
            const oldPosition = state.position[
                state.position.length - 1
            ] as Position;
            const position = new Position(oldPosition);

            position.play(position.uci(action.payload.move));

            state.boardIndex++;
            state.position.push(position);
        },
        increaseMoveNumber(state) {
            const next = state.boardIndex + 1;
            const clamped =
                next < state.position.length ? next : state.boardIndex;
            return { ...state, moveNumber: clamped };
        },
        decreaseMoveNumber(state) {
            const next = state.boardIndex - 1;
            const clamped = next >= 0 ? next : state.boardIndex;
            return { ...state, moveNumber: clamped };
        },
    },
});

export default boardSlice.reducer;

export const { newBoard, increaseMoveNumber, decreaseMoveNumber } =
    boardSlice.actions;
