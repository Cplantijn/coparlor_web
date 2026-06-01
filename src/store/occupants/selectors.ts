import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store";
import { selectGameHandsByOccupantSessionId } from "@store/gameState";
import { occupantsAdapter } from "./reducer";
import type {
  SeatPosition,
  SpectatorPosition,
} from "./model";

const selectOccupantsState = (state: RootState) => state.occupants;

export const occupantsSelectors = occupantsAdapter.getSelectors(
  selectOccupantsState,
);

export const getAllOccupants = occupantsSelectors.selectAll;
export const selectOccupantEntities = occupantsSelectors.selectEntities;

export const selectRoomOwnerId = createSelector(
  selectOccupantsState,
  (occupants) => occupants.roomOwnerId,
);

export const selectSpectatorIds = createSelector(
  selectOccupantsState,
  (occupants) => occupants.spectatorIds,
);

export const selectPlayerOccupantIdsBySeat = createSelector(
  selectOccupantsState,
  (occupants) => occupants.playerOccupantIdsBySeat,
);

export const selectRoomOwner = createSelector(
  selectRoomOwnerId,
  selectOccupantEntities,
  (roomOwnerId, occupantsById) =>
    roomOwnerId ? occupantsById[roomOwnerId] : undefined,
);

export const selectIsSelfRoomOwner = createSelector(
  (state: RootState) => state.auth.sessionId,
  selectRoomOwnerId,
  (sessionId, roomOwnerId) => Boolean(sessionId && sessionId === roomOwnerId),
);

export const selectSpectators = createSelector(
  selectSpectatorIds,
  selectOccupantEntities,
  (spectatorIds, occupantsById) =>
    spectatorIds.flatMap((spectatorId) => {
      const occupant = occupantsById[spectatorId];
      return occupant ? [occupant] : [];
    }),
);

export const selectPlayerOccupantsBySeat = createSelector(
  selectPlayerOccupantIdsBySeat,
  selectOccupantEntities,
  (occupantIdsBySeat, occupantsById) => {
    const occupantsBySeat: Record<
      number,
      ReturnType<typeof getAllOccupants>[number] | undefined
    > = {};

    for (const [seatNumber, occupantId] of Object.entries(occupantIdsBySeat)) {
      if (occupantId) {
        occupantsBySeat[Number(seatNumber)] = occupantsById[occupantId];
      }
    }

    return occupantsBySeat;
  },
);

export const selectOccupantBySeat = createSelector(
  selectPlayerOccupantsBySeat,
  (_state: RootState, seatNumber: number) => seatNumber,
  (occupantsBySeat, seatNumber) => occupantsBySeat[seatNumber],
);

export const selectSeatPosition = createSelector(
  selectOccupantBySeat,
  selectGameHandsByOccupantSessionId,
  (state: RootState) => state.auth.sessionId,
  selectIsSelfRoomOwner,
  (_state: RootState, seatNumber: number) => seatNumber,
  (
    occupant,
    handsByOccupantSessionId,
    selfSessionId,
    isSelfRoomOwner,
    seatNumber,
  ): SeatPosition => {
    if (!occupant) {
      return {
        kind: "empty",
        seatNumber,
        canJoin: Boolean(selfSessionId),
        canAddBot: isSelfRoomOwner,
      };
    }

    const occupantSessionId = occupant.publicAccountSession.sessionAccountId;

    return {
      kind: "occupied",
      seatNumber,
      occupant,
      hand: handsByOccupantSessionId[occupantSessionId],
      isRoomOwner: occupant.isRoomOwner,
      isSelf: occupantSessionId === selfSessionId,
    };
  },
);

export const selectSpectatorPositions = createSelector(
  selectSpectators,
  selectGameHandsByOccupantSessionId,
  (state: RootState) => state.auth.sessionId,
  (spectators, handsByOccupantSessionId, selfSessionId): SpectatorPosition[] =>
    spectators.map((occupant) => {
      const occupantSessionId = occupant.publicAccountSession.sessionAccountId;

      return {
        occupant,
        hand: handsByOccupantSessionId[occupantSessionId],
        isRoomOwner: occupant.isRoomOwner,
        isSelf: occupantSessionId === selfSessionId,
      };
    }),
);
