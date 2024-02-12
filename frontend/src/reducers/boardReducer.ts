import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "kokopu";
import MoveStatistics from "../interfaces/MoveStatistics.ts";

console.log("game");

const boardSlice = createSlice({
    name: "board",
    initialState: { position: [new Position()], boardIndex: 0},
    reducers: {
        newBoard(state, action: PayloadAction<MoveStatistics>) {
            const oldPosition: Position = state.position[state.position.length-1] as Position
            const newPos = new Position (oldPosition)
            newPos.play(newPos.uci(action.payload.move));
            const newArray = [...state.position, newPos];
            return { ...state, position: newArray, moveNumber: newArray.length-1};
        },
        increaseMoveNumber(state) {
            const next = state.boardIndex + 1;
            const clamped = next < state.position.length ? next : state.boardIndex;
            return { ...state, moveNumber: clamped}
        },
        decreaseMoveNumber(state) {
            const next = state.boardIndex - 1;
            const clamped = next >= 0 ? next : state.boardIndex;
            return { ...state, moveNumber: clamped}
        }
    },
});

export default boardSlice.reducer;

export const { newBoard, increaseMoveNumber, decreaseMoveNumber} = boardSlice.actions;
