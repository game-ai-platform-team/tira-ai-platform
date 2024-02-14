import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GameConfig from "../interfaces/GameConfig";
import { startGame } from "../services/SocketService";
import { GameState } from "../types";

const gameSlice = createSlice({
    name: "game",
    initialState: { isGameRunning: false, state: GameState.INVALID },
    reducers: {
        newGame(state, action: PayloadAction<GameConfig>) {
            startGame(action.payload);
            return { ...state, isGameRunning: true, state: GameState.CONTINUE };
        },
        resetGame() {
            return { isGameRunning: false, state: GameState.INVALID };
        },
    },
});

export default gameSlice.reducer;

export const { newGame, resetGame } = gameSlice.actions;
