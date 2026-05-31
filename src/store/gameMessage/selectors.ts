import type { RootState } from "@store";

export const selectVisibleGameMessages = (state: RootState) =>
  state.gameMessage.messages.slice(0, 2);
