/**
 * This slice manages the contents of list of moves in the Redux store.
 * createMove is used in SocketService when a new move is received.
 * @see /../services/SocketService.ts
 * The list of moves is shown in the MoveList component.
 * MoveList is rendered in GameView using the move list as a parameter
 * @see /../components/GameView.tsx
 * @see /../components/MoveList.tsx
 * resetBoard is used as a part of ResetReducer
 * @see /../reducers/ResetReducer.ts
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MoveStatistics from "../interfaces/MoveStatistics";

const moveSlice = createSlice({
    name: "moves",
    initialState: new Array<MoveStatistics>(),
    reducers: {
        createMove(state, action: PayloadAction<MoveStatistics>) {
            state.push(action.payload);
        },
        resetMoves() {
            return new Array<MoveStatistics>();
        },
    },
});

export default moveSlice.reducer;

export const { createMove, resetMoves } = moveSlice.actions;
