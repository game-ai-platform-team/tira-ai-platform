import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startGame } from "../services/SocketService.ts";
import { GameConfig, GameState } from "../types.ts";


const gameSlice = createSlice({
    name: "game",
    initialState: { isGameRunning: false, state: GameState.INVALID },
    reducers: {
        newGame(state, action: PayloadAction<GameConfig>) {
            startGame(action.payload);
            return { ...state, isGameRunning: true, state: GameState.CONTINUE };
        }
    }
});

export default gameSlice.reducer;

export const { newGame } = gameSlice.actions;
