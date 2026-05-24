import { createSlice } from "@reduxjs/toolkit";
import { signInAnonymouslyActions, authStateChanged, sessionResolved } from "./actions";

export interface AuthState {
  uid: string | null;
  isAnonymous: boolean | null;
  sessionId: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  uid: null,
  isAnonymous: null,
  sessionId: null,
  loading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authStateChanged, (state, action) => {
        if (action.payload.uid !== state.uid) {
          state.sessionId = null;
        }
        state.uid = action.payload.uid;
        state.isAnonymous = action.payload.isAnonymous;
        state.initialized = true;
      })
      .addCase(sessionResolved, (state, action) => {
        state.sessionId = action.payload.sessionId;
      })
      .addCase(signInAnonymouslyActions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAnonymouslyActions.fulfilled, (state, action) => {
        state.loading = false;
        state.uid = action.payload.uid;
        state.isAnonymous = action.payload.isAnonymous;
      })
      .addCase(signInAnonymouslyActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
