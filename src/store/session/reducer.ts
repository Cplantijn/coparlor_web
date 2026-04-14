import { createSlice } from "@reduxjs/toolkit";
import { startGameSessionActions } from "./actions";

export interface SessionState {
  gameSessionId: string | null;
  gameRoomName: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  gameSessionId: null,
  gameRoomName: null,
  loading: false,
  error: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startGameSessionActions.pending, (state) => {
        console.log("startGameSessionActions.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(startGameSessionActions.fulfilled, (state, action) => {
        console.log("startGameSessionActions.fulfilled", action.payload);
        state.loading = false;
        state.gameSessionId = action.payload.gameSessionId;
        state.gameRoomName = action.payload.roomName;
      })
      .addCase(startGameSessionActions.rejected, (state, action) => {
        console.log("startGameSessionActions.rejected", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const sessionReducer = sessionSlice.reducer;
