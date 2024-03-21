import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GameConfig from "../interfaces/GameConfig";
import { startGame } from "../services/SocketService";
import { GameState } from "../types";

const initialState: {
    isGameRunning: boolean;
    state: GameState;
    config: GameConfig;
} = {
    isGameRunning: false,
    state: GameState.INVALID,
    config: { elo: -1, githubUrl: "example.repo", game: "chess" },
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        newGame(state, action: PayloadAction<GameConfig>) {
            const config = action.payload;

            startGame(config);

            return {
                ...state,
                isGameRunning: true,
                state: GameState.CONTINUE,
                config,
            };
        },
        resetGame() {
            return initialState;
        },
        updateState(state, action: PayloadAction<GameState>) {
            return { ...state, state: action.payload };
        },
    },
});

export default gameSlice.reducer;

export const { newGame, resetGame, updateState } = gameSlice.actions;
