import { createAction } from "@reduxjs/toolkit";
import type {
  GameRoomCreatedPayload,
  JoinGameRoomRequest,
  JoinGameRoomResponse,
} from "@api";
import { createActionSet } from "../createActionSet";

export const gameRoomCreatedNotificationReceived =
  createAction<GameRoomCreatedPayload>("gameRoom/createdNotificationReceived");

export const gameRoomActions = {
  joinGameRoom: createActionSet<JoinGameRoomRequest, JoinGameRoomResponse>(
    "gameRoom/join",
  ),
};
