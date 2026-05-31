import type { RootState } from "@store";

export const selectGamePhase = (state: RootState) => state.gameState.gamePhase;
export const selectGameState = (state: RootState) => state.gameState.gameState;
export const selectGameHands = (state: RootState) => state.gameState.hands;
export const selectLastGameAction = (state: RootState) =>
  state.gameState.lastGameAction;
