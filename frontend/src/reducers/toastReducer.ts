import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/**
 * Redux slice for managing toast notifications.
 * This slice defines actions for setting toast notifications with text and color.
 * When a toast is dispatched, the message will be visible in SubmitForm
 * @see /../components/SubmitForm.tsx
 *
 * @module toastSlice
 * @returns {Object} The slice containing reducer and actions.
 */
const toastSlice = createSlice({
    name: "toast",
    initialState: { title: "", text: "", color: "Secondary" },
    reducers: {
        setToast(
            _,
            action: PayloadAction<{
                title: string;
                text: string;
                color: string;
            }>,
        ) {
            return action.payload;
        },
    },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
