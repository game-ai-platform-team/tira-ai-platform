import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers/gameReducer";
import moveReducer from "./reducers/moveReducer";
import boardReducer from "./reducers/boardReducer";
import boardIndexReducer from "./reducers/boardIndexReducer";
import allLogReducer from "./reducers/allLogReducer.ts";

const store =  configureStore({
    reducer: {
        moves: moveReducer,
        game: gameReducer,
        boards: boardReducer,
        boardIndex: boardIndexReducer,
        allLog: allLogReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
