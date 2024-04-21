/**
 * This slice manages the state of the cfourboard in the Redux store.
 * It provides reducers for updating the cfourboard state based on incoming moves
 * and for resetting the cfourboard state.
 *
 * newConnectFourBoard is called from SocketService
 * @see /../services/SocketService.ts
 * resetConnectFourBoards is used as a part of resetBoards in BoardReducer
 * @see /../reducers/boardReducer.ts
 */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toNumber } from "lodash";
import MoveStatistics from "../../interfaces/MoveStatistics";

const connectFourSlice = createSlice({
    name: "connectFour",
    initialState: new Array<Array<number>>(),
    reducers: {
        newConnectFourBoard(state, action: PayloadAction<MoveStatistics>) {
            const move = toNumber(action.payload.move);
            const previousBoard = state[state.length - 1] || [];

            state.push(previousBoard.concat(move));
        },

        resetConnectFourBoards() {
            return new Array<Array<number>>();
        },
    },
});

export default connectFourSlice.reducer;
export const { newConnectFourBoard, resetConnectFourBoards } =
    connectFourSlice.actions;
