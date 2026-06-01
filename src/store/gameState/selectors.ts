import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store";
import { gameHandsAdapter } from "./reducer";

const selectGameStateSlice = (state: RootState) => state.gameState;
const selectGameHandsState = (state: RootState) => state.gameState.hands;

export const gameHandsSelectors = gameHandsAdapter.getSelectors(
  selectGameHandsState,
);

export const selectGamePhase = (state: RootState) => state.gameState.gamePhase;
export const selectGameState = (state: RootState) => state.gameState.gameState;
export const selectGameHands = gameHandsSelectors.selectAll;
export const selectLastGameAction = (state: RootState) =>
  state.gameState.lastGameAction;

export const selectGameHandsByOccupantSessionId = createSelector(
  selectGameHandsState,
  (hands) => hands.entities,
);

export const selectHandByOccupantSessionId = (
  state: RootState,
  occupantSessionId: string | undefined,
) =>
  occupantSessionId
    ? gameHandsSelectors.selectById(state, occupantSessionId)
    : undefined;

export const selectHasGameState = createSelector(
  selectGameStateSlice,
  (gameState) => gameState.gameState !== null,
);
