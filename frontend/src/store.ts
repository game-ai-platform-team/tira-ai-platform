import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "./reducers/GameReducer";
import moveReducer from "./reducers/moveReducer";


const store = configureStore({
    reducer: { moves: moveReducer, game: GameReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
