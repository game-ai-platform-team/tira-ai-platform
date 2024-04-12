import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: "toast",
    initialState: {text: "", color: "Secondary"},
    reducers: {
        setToast(_, action: PayloadAction<{text: string, color: string}>) {
            return action.payload;
        },
    },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
