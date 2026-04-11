import { createSlice } from "@reduxjs/toolkit";
import { startGameSessionActions } from "./actions";

export interface SessionState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  token: null,
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
        state.loading = true;
        state.error = null;
      })
      .addCase(startGameSessionActions.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(startGameSessionActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const sessionReducer = sessionSlice.reducer;
