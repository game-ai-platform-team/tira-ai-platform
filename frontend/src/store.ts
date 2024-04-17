import { ThunkAction, UnknownAction, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers/gameReducer";
import moveReducer from "./reducers/moveReducer";
import boardReducer from "./reducers/boardReducer";
import boardIndexReducer from "./reducers/boardIndexReducer";
import allLogReducer from "./reducers/allLogReducer.ts";
import toastReducer from "./reducers/toastReducer.ts";
/**
 * A store for multiple reducers that can have their state read from store.
 *
 * @returns multiple aka a thunk of reducers
 *
 */
const store = configureStore({
    reducer: {
        moves: moveReducer,
        game: gameReducer,
        boards: boardReducer,
        boardIndex: boardIndexReducer,
        allLog: allLogReducer,
        notification: toastReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkAction = ThunkAction<
    void,
    RootState,
    unknown,
    UnknownAction
>;
