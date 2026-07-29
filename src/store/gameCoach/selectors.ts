import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store";

const selectGameCoach = (state: RootState) => state.gameCoach;

export const selectGameCoachResponse = createSelector(
  selectGameCoach,
  (gameCoach) => gameCoach.response,
);

export const selectGameCoachOutput = createSelector(
  selectGameCoachResponse,
  (response) => response?.output ?? "",
);

export const selectGameCoachLoading = createSelector(
  selectGameCoach,
  (gameCoach) => gameCoach.loading,
);

export const selectGameCoachError = createSelector(
  selectGameCoach,
  (gameCoach) => gameCoach.error,
);

export const selectGameCoachActivePrompt = createSelector(
  selectGameCoach,
  (gameCoach) => gameCoach.activePrompt,
);
