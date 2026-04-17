import { createSlice } from "@reduxjs/toolkit";
import { gameRoomActions } from "./actions";

export interface GameRoomState {
  name: string | null;
  occupants: string[];
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
      })
      .addCase(gameRoomActions.joinGameRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const gameRoomReducer = gameRoomSlice.reducer;
