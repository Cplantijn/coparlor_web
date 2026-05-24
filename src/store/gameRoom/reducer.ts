import { createSlice } from "@reduxjs/toolkit";
import { gameRoomActions } from "./actions";
import type { GameType } from "@api";

export interface GameRoomState {
  name: string | null;
  loading: boolean;
  error: string | null;
  pendingGameType: GameType | null;
}

const initialState: GameRoomState = {
  name: null,
  loading: false,
  error: null,
  pendingGameType: null,
};

const gameRoomSlice = createSlice({
  name: "gameRoom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gameRoomActions.joinGameRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gameRoomActions.joinGameRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.gameRoom?.name ?? null;
      })
      .addCase(gameRoomActions.joinGameRoom.rejected, (state) => {
        state.loading = false;
        state.pendingGameType = null;
      })
      .addCase(gameRoomActions.createGameRoom.fulfilled, (state, action) => {
        state.pendingGameType = action.requestPayload.gameType;
      });
  },
});

export const gameRoomReducer = gameRoomSlice.reducer;
