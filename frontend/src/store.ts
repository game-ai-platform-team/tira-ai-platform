import { configureStore } from "@reduxjs/toolkit";
import moveReducer from "./reducers/moveReducer";

const store = configureStore({
    reducer: { moves: moveReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
