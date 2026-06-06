import { configureStore } from "@reduxjs/toolkit";
import type { Action } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./rootEpic";
import { authReducer } from "./auth/reducer";
import { gameSessionReducer } from "./gameSession/reducer";
import { gameRoomReducer } from "./gameRoom/reducer";
import { gameStateReducer } from "./gameState/reducer";
import { gameMessageReducer } from "./gameMessage/reducer";
import { occupantsReducer } from "./occupants/reducer";
import { legalActionReducer } from "./legalAction/reducer";

const epicMiddleware = createEpicMiddleware<Action, Action, any>();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gameSession: gameSessionReducer,
    gameRoom: gameRoomReducer,
    gameState: gameStateReducer,
    gameMessage: gameMessageReducer,
    occupants: occupantsReducer,
    legalAction: legalActionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
