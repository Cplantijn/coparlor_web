import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./rootEpic";
import { authReducer } from "./auth/reducer";
import { gameSessionReducer } from "./gameSession/reducer";
import { gameRoomReducer } from "./gameRoom/reducer";
import { occupantsReducer } from "./occupants/reducer";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gameSession: gameSessionReducer,
    gameRoom: gameRoomReducer,
    occupants: occupantsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
