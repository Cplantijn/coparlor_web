import type { RootState } from "@store";

export const selectSessionId = (state: RootState) =>
  state.gameSession.sessionId;
