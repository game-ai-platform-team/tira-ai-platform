import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: "toast",
    initialState: "",
    reducers: {
        setToast(_, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
