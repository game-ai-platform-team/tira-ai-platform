import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toNumber } from "lodash";
import MoveStatistics from "../../interfaces/MoveStatistics";

const connectFourSlice = createSlice({
    name: "connect",
    initialState: new Array<Array<number>>(),
    reducers: {
        newConnectFourBoard(state, action: PayloadAction<MoveStatistics>) {
            const move = toNumber(action.payload);
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
