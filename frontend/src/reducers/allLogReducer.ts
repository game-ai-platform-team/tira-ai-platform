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
