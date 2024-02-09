import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "./reducers/GameReducer";
import moveReducer from "./reducers/moveReducer";

console.log("store");

const store = configureStore({
    reducer: { moves: moveReducer, game: GameReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
