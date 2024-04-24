import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: "original",
    reducers: {
        setTheme(_, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export default themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
