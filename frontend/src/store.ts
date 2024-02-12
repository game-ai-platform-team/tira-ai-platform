import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "./reducers/gameReducer";
import moveReducer from "./reducers/moveReducer";
import BoardReducer from "./reducers/boardReducer";

const store = configureStore({
    reducer: { moves: moveReducer, game: GameReducer, chessboard: BoardReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
