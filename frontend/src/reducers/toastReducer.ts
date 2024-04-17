import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/**
 * Redux slice for managing toast notifications.
 *
 * This slice defines actions for setting toast notifications with text and color.
 *
 * @module toastSlice
 * @returns {Object} The slice containing reducer and actions.
 */
const toastSlice = createSlice({
    name: "toast",
    initialState: { text: "", color: "Secondary" },
    reducers: {
        setToast(_, action: PayloadAction<{ text: string; color: string }>) {
            return action.payload;
        },
    },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
