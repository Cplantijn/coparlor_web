import { createSlice } from "@reduxjs/toolkit";
import type { AskGameCoachResponse } from "@api";
import { gameRoomActions } from "../gameRoom/actions";
import { clearGameCoachResponse, gameCoachActions } from "./actions";

export interface GameCoachState {
  response: AskGameCoachResponse | null;
  loading: boolean;
  error: string | null;
  activePrompt: string | null;
}

const initialState: GameCoachState = {
  response: null,
  loading: false,
  error: null,
  activePrompt: null,
};

const gameCoachSlice = createSlice({
  name: "gameCoach",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gameCoachActions.askGameCoach.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.activePrompt = action.requestPayload.userPrompt ?? null;
      })
      .addCase(gameCoachActions.askGameCoach.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.error = null;
      })
      .addCase(gameCoachActions.askGameCoach.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearGameCoachResponse, (state) => {
        state.response = null;
        state.error = null;
        state.activePrompt = null;
      })
      .addCase(gameRoomActions.joinGameRoom.pending, () => initialState)
      .addCase(gameRoomActions.joinGameRoom.rejected, () => initialState);
  },
});

export const gameCoachReducer = gameCoachSlice.reducer;
