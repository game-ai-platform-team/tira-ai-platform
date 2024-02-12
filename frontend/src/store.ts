import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "./reducers/gameReducer";
import moveReducer from "./reducers/moveReducer";
import BoardReducer from "./reducers/boardReducer";
import boardIndexReducer from "./reducers/boardIndexReducer";

const store = configureStore({
    reducer: {
        moves: moveReducer,
        game: GameReducer,
        chessboard: BoardReducer,
        boardIndex: boardIndexReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
