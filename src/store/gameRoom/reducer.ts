import { createSlice } from "@reduxjs/toolkit";
import { emitRoomOccupantsUpdated, gameRoomActions } from "./actions";
import type { Occupant } from "@api";

export interface GameRoomState {
  name: string | null;
  occupants: Occupant[];
  loading: boolean;
  error: string | null;
}

const initialState: GameRoomState = {
  name: null,
  occupants: [],
  loading: false,
  error: null,
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
        state.occupants = action.payload.gameRoom?.occupants ?? [];
      })
      .addCase(emitRoomOccupantsUpdated, (state, action) => {
        state.occupants = action.payload;
      });
  },
});

export const gameRoomReducer = gameRoomSlice.reducer;
