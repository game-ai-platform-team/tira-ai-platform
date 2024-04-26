import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../services/CookieService";

const themeSlice = createSlice({
    name: "theme",
    initialState: getCookie("theme") || "original",
    reducers: {
        setTheme(_, action: PayloadAction<string>) {
            setCookie("theme", action.payload);
            return action.payload;
        },
    },
});

export default themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
