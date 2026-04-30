import { createSlice } from "@reduxjs/toolkit";
import { emitGameSessionStarted, gameSessionActions } from "./actions";
import type { GameSession, GameType } from "@api";

export interface GameSessionState {
  gameType: GameType | null;
  session: GameSession | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameSessionState = {
  gameType: null,
  session: null,
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
      )
      .addCase(emitGameSessionStarted, (state, action) => {
        state.loading = false;
        state.session = action.payload.gameSession;
      });
  },
});

export const gameSessionReducer = gameSessionSlice.reducer;
