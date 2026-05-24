import { createAction } from "@reduxjs/toolkit";
import { createActionSet } from "../createActionSet";

// Action set for the asynchronous sign-in process
export const signInAnonymouslyActions = createActionSet<void, { uid: string; isAnonymous: boolean }>(
  "auth/signInAnonymously"
);

// Initialization action triggered on app startup
export const initAuthAction = createAction("auth/initAuth");

// Action for when the auth state changes (e.g., from onIdTokenChanged)
export const authStateChanged = createAction<{ uid: string | null; isAnonymous: boolean | null }>(
  "auth/authStateChanged"
);

// Dispatched when the backend AccountSession.id has been resolved for the current uid
export const sessionResolved = createAction<{ sessionId: string }>(
  "auth/sessionResolved"
);
