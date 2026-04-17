import { combineEpics } from "redux-observable";
import { gameSessionEpics } from "./gameSession/epics";
import { gameRoomEpics } from "./gameRoom/epics";
import { authEpics } from "./auth/epics";
import { notificationEpics } from "./notifications/epics";

export const rootEpic = combineEpics(...gameSessionEpics, ...gameRoomEpics, ...authEpics, ...notificationEpics);
