import { createSlice } from "@reduxjs/toolkit";
import { emitGameSessionUpdated, gameSessionActions } from "./actions";
import { gameRoomActions } from "@store/gameRoom";

export interface GameSessionState {
  sessionId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameSessionState = {
  sessionId: null,
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
      .addCase(gameRoomActions.joinGameRoom.fulfilled, (state, action) => {
        state.sessionId = action.payload.activeGameSessionId ?? null;
      })
      .addCase(emitGameSessionUpdated, (state, action) => {
        console.log({ action });
        state.sessionId = action.payload.gameSessionId ?? null;
        state.loading = false;
        state.error = null;
      })
      .addCase(gameSessionActions.createGameSession.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const gameSessionReducer = gameSessionSlice.reducer;
