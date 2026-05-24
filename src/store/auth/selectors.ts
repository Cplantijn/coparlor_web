import type { RootState } from "@store";

export const selectAuthUid = (state: RootState) => state.auth.uid;
export const selectAuthIsAnonymous = (state: RootState) => state.auth.isAnonymous;
export const selectSessionId = (state: RootState) => state.auth.sessionId;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
