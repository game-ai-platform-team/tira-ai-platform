/**
 * Slice for managing logs state in the Redux store.
 *
 * This slice manages the state of all logs in the Redux store.
 * It provides reducers for setting all logs and for resetting all logs.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const logSlice = createSlice({
    name: "logs",
    initialState: "",
    reducers: {
        setLog(_, logsPayload: PayloadAction<string>) {
            return logsPayload.payload;
        },
        resetLogs() {
            return "";
        },
    },
});

export default logSlice.reducer;

export const { setLog, resetLogs } = logSlice.actions;
