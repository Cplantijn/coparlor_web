import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { gameRoomActions } from "../gameRoom/actions";
import { emitRoomOccupantsUpdated } from "../gameRoom/actions";
import { toOccupantEntities } from "./model";
import { isPlayerOccupant, type OccupantEntity } from "./model";

const adapter = createEntityAdapter<OccupantEntity, string>({
  selectId: (occ) => occ.publicAccountSession.sessionAccountId,
});

const initialState = adapter.getInitialState({
  playerOccupantIdsBySeat: {} as Record<number, string | undefined>,
  spectatorIds: [] as string[],
  roomOwnerId: undefined as string | undefined,
});

const occupantsSlice = createSlice({
  name: "occupants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gameRoomActions.joinGameRoom.pending, (state) => {
        setAllOccupants(state, []);
      })
      .addCase(gameRoomActions.joinGameRoom.fulfilled, (state, action) => {
        setAllOccupants(
          state,
          toOccupantEntities(action.payload.gameRoom?.occupants ?? []),
        );
      })
      .addCase(gameRoomActions.joinGameRoom.rejected, (state) => {
        setAllOccupants(state, []);
      })
      .addCase(emitRoomOccupantsUpdated, (state, action) => {
        setAllOccupants(state, toOccupantEntities(action.payload));
      });
  },
});

function setAllOccupants(
  state: typeof initialState,
  occupants: OccupantEntity[],
) {
  adapter.setAll(state, occupants);
  state.playerOccupantIdsBySeat = {};
  state.spectatorIds = [];
  state.roomOwnerId = undefined;

  for (const occupant of occupants) {
    const sessionId = occupant.publicAccountSession.sessionAccountId;

    if (occupant.isRoomOwner) {
      state.roomOwnerId = sessionId;
    }

    if (isPlayerOccupant(occupant)) {
      state.playerOccupantIdsBySeat[occupant.seat] = sessionId;
      continue;
    }

    state.spectatorIds.push(sessionId);
  }
}

export const occupantsAdapter = adapter;
export const occupantsReducer = occupantsSlice.reducer;
