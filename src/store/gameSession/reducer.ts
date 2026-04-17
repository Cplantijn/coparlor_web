import { createSlice } from "@reduxjs/toolkit";
import { gameSessionActions } from "./actions";
import type { GameType } from "@api";

export interface GameSessionState {
  gameType: GameType | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameSessionState = {
  gameType: null,
  loading: false,
  error: null,
};

const gameSessionSlice = createSlice({
  name: "gameSession",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gameSessionActions.createGameSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gameSessionActions.createGameSession.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        gameSessionActions.createGameSession.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const gameSessionReducer = gameSessionSlice.reducer;
