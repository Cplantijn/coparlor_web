import { combineEpics } from "redux-observable";
import { gameSessionEpics } from "@store/gameSession";
import { gameRoomEpics } from "@store/gameRoom";
import { authEpics } from "@store/auth";
import { notificationEpics } from "@store/notifications";

export const rootEpic = combineEpics(...gameSessionEpics, ...gameRoomEpics, ...authEpics, ...notificationEpics);
