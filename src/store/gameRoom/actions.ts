import { createAction } from "@reduxjs/toolkit";
import type {
  CreateGameRoomResponse,
  OccupySeatRequest,
  OccupySeatResponse,
  JoinGameRoomRequest,
  JoinGameRoomResponse,
  Occupant,
} from "@api";

import type { CreateGameRoomClientRequest } from "./model";

import { createActionSet } from "../createActionSet";

export const emitRoomOccupantsUpdated = createAction<Occupant[]>(
  "gameRoom/emitRoomOccupantsUpdated",
);

export const gameRoomActions = {
  createGameRoom: createActionSet<
    CreateGameRoomClientRequest,
    CreateGameRoomResponse
  >("gameRoom/create"),
  joinGameRoom: createActionSet<JoinGameRoomRequest, JoinGameRoomResponse>(
    "gameRoom/join",
  ),
  occupySeat: createActionSet<OccupySeatRequest, OccupySeatResponse>(
    "gameRoom/occupySeat",
  ),
};
