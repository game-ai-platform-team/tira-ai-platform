import { ThunkAction, UnknownAction, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers/gameReducer";
import moveReducer from "./reducers/moveReducer";
import boardReducer from "./reducers/boards/boardReducer.ts";
import boardIndexReducer from "./reducers/boards/boardIndexReducer.ts";
import logReducer from "./reducers/logReducer.ts";
import toastReducer from "./reducers/toastReducer.ts";
import themeReducer from "./reducers/themeReducer.ts";
/**
 * A store for multiple reducers that can have their state read from store.
 *
 * @returns a thunk of reducers
 *
 */
const store = configureStore({
    reducer: {
        moves: moveReducer,
        game: gameReducer,
        boards: boardReducer,
        boardIndex: boardIndexReducer,
        logs: logReducer,
        notification: toastReducer,
        theme: themeReducer,
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
