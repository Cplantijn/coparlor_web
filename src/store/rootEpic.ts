import { combineEpics } from "redux-observable";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { gameSessionEpics } from "@store/gameSession";
import { gameRoomEpics } from "@store/gameRoom";
import { authEpics } from "@store/auth";
import { notificationEpics } from "@store/notifications";

const allEpics = [
  ...gameSessionEpics,
  ...gameRoomEpics,
  ...authEpics,
  ...notificationEpics,
] as Epic<Action, Action, any>[];

export const rootEpic: Epic<Action, Action, any> = combineEpics(...allEpics);
