import { createAction } from "@reduxjs/toolkit";
import type {
  CreateGameRoomResponse,
  CreateGameRoomRequest,
  JoinGameRoomRequest,
  JoinGameRoomResponse,
  Occupant,
} from "@api";

import { createActionSet } from "../createActionSet";

export const emitOccupantJoinedRoom = createAction<Occupant[]>(
  "gameRoom/emitOccupantJoinedRoom",
);

export const gameRoomActions = {
  createGameRoom: createActionSet<
    CreateGameRoomRequest,
    CreateGameRoomResponse
  >("gameRoom/create"),
  joinGameRoom: createActionSet<JoinGameRoomRequest, JoinGameRoomResponse>(
    "gameRoom/join",
  ),
};
