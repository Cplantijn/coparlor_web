import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { gameRoomActions } from "../gameRoom/actions";
import { emitRoomOccupantsUpdated } from "../gameRoom/actions";
import { toOccupantEntities } from "./model";
import type { OccupantEntity } from "./model";

const adapter = createEntityAdapter<OccupantEntity, string>({
  selectId: (occ) => occ.publicAccountSession.sessionAccountId as string,
});

const occupantsSlice = createSlice({
  name: "occupants",
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gameRoomActions.joinGameRoom.pending, (state) => {
        adapter.removeAll(state);
      })
      .addCase(gameRoomActions.joinGameRoom.fulfilled, (state, action) => {
        adapter.setAll(
          state,
          toOccupantEntities(action.payload.gameRoom?.occupants ?? []),
        );
      })
      .addCase(gameRoomActions.joinGameRoom.rejected, (state) => {
        adapter.removeAll(state);
      })
      .addCase(emitRoomOccupantsUpdated, (state, action) => {
        console.log(
          "emitRoomOccupantsUpdated Setting all occupants",
          action.payload,
        );
        adapter.setAll(state, toOccupantEntities(action.payload));
      });
  },
});

export const occupantsAdapter = adapter;
export const occupantsReducer = occupantsSlice.reducer;
