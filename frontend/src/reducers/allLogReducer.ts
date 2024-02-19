import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const allLogSlice = createSlice({
    name: "allLog",
    initialState: "",
    reducers: {
        setAllLog(_, logsPayload: PayloadAction<string>) {
            return logsPayload.payload;
        },
        resetAlLLog() {
            return "0";
        }
    }
});

export default allLogSlice.reducer;

export const { setAllLog, resetAlLLog } = allLogSlice.actions;
