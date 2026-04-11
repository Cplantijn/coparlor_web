import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { rootEpic } from "./rootEpic";
import { sessionReducer } from "./session/reducer";

const epicMiddleware = createEpicMiddleware<Action>();

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
