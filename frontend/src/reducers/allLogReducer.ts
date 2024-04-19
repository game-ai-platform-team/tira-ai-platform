/**
 * Slice for managing logs state in the Redux store.
 *
 * This slice manages the state of all logs in the Redux store.
 * It provides reducers for setting all logs and for resetting all logs.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const allLogSlice = createSlice({
    name: "allLog",
    initialState: "",
    reducers: {
        setAllLog(_, logsPayload: PayloadAction<string>) {
            return logsPayload.payload;
        },
        resetAlLLog() {
            return "";
        },
    },
});

export default allLogSlice.reducer;

export const { setAllLog, resetAlLLog } = allLogSlice.actions;
