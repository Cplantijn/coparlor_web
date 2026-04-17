import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store";

const selectGameRoom = (state: RootState) => state.gameRoom;

export const selectGameRoomName = createSelector(
  selectGameRoom,
  (gameRoom) => gameRoom.name,
);

export const selectGameRoomLoading = createSelector(
  selectGameRoom,
  (gameRoom) => gameRoom.loading,
);

export const selectGameRoomError = createSelector(
  selectGameRoom,
  (gameRoom) => gameRoom.error,
);

export const selectGameRoomOccupants = createSelector(
  selectGameRoom,
  (gameRoom) => gameRoom.occupants,
);
