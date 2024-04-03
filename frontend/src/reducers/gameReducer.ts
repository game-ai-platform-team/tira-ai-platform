import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GameConfig from "../interfaces/GameConfig";
import { GameState } from "../types";

const initialState: {
    isGameRunning: boolean;
    state: GameState;
    config: GameConfig;
} = {
    isGameRunning: false,
    state: GameState.CONTINUE,
    config: { elo: -1, githubUrl: "example.repo", game: "chess" },
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        newGame(state, action: PayloadAction<GameConfig>) {
            const config = action.payload;

            return {
                ...state,
                isGameRunning: true,
                state: GameState.CONTINUE,
                config,
            };
        },
        updateGame(state, action: PayloadAction<string>) {
            const config = { ...state.config, game: action.payload };
            return { ...state, config };
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

export const { newGame, resetGame, updateState, updateGame } =
    gameSlice.actions;
