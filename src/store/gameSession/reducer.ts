import { createSlice } from "@reduxjs/toolkit";
import { emitGameSessionUpdated, gameSessionActions } from "./actions";
import { gameRoomActions } from "@store/gameRoom";

export interface GameSessionState {
  sessionId: string | null;
  /**
   * True when the current session started while we were watching the room, as
   * opposed to already being in progress when we joined. Drives whether UI
   * transitions (e.g. the seat rotation) animate or snap into place.
   */
  sessionStartObserved: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: GameSessionState = {
  sessionId: null,
  sessionStartObserved: false,
  loading: false,
  error: null,
};

/**
 * Session ids arrive as plain proto3 strings, so "no session" reaches us as ""
 * rather than as undefined. Normalize here so nothing downstream has to treat an
 * empty string as meaningful.
 */
function toSessionId(sessionId: string | undefined): string | null {
  return sessionId ? sessionId : null;
}

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
      .addCase(gameRoomActions.joinGameRoom.pending, (state) => {
        state.sessionId = null;
        state.sessionStartObserved = false;
      })
      .addCase(gameRoomActions.joinGameRoom.fulfilled, (state, action) => {
        state.sessionId = toSessionId(action.payload.activeGameSessionId);
        state.sessionStartObserved = false;
      })
      .addCase(emitGameSessionUpdated, (state, action) => {
        state.sessionId = toSessionId(action.payload.gameSessionId);
        state.sessionStartObserved = state.sessionId !== null;
        state.loading = false;
        state.error = null;
      })
      .addCase(gameSessionActions.createGameSession.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const gameSessionReducer = gameSessionSlice.reducer;
