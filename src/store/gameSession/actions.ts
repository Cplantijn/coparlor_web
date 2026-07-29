import { createAction } from "@reduxjs/toolkit";
import { createActionSet } from "../createActionSet";
import type {
  CreateGameSessionRequest,
  CreateGameSessionResponse,
  GameSessionUpdatedPayload,
} from "@api";

export const emitGameSessionUpdated = createAction<GameSessionUpdatedPayload>(
  "gameSession/emitGameSessionUpdated",
);

export const gameSessionActions = {
  createGameSession: createActionSet<
    CreateGameSessionRequest,
    CreateGameSessionResponse
  >("gameSession/create"),
};
