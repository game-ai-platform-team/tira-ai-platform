import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GameConfig from "../interfaces/GameConfig";
import { GameState } from "../types";

/**
 * Redux slice for managing game state.
 * Contains reducer and actions for handling game-related data.
 *
 * @returns {Object} The slice containing reducer and actions.
 */

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
