import type { RootState } from "@store";

export const selectSessionId = (state: RootState) =>
  state.gameSession.sessionId;

export const selectIsGameSessionActive = (state: RootState) =>
  state.gameSession.sessionId !== null;

export const selectShouldAnimateSeatRotation = (state: RootState) =>
  state.gameSession.sessionStartObserved;
