import { createAction } from "@reduxjs/toolkit";
import { createActionSet } from "../createActionSet";
import type {
  CreateGameSessionRequest,
  CreateGameSessionResponse,
  GameSession,
} from "@api";

export const gameSessionActions = {
  createGameSession: createActionSet<
    CreateGameSessionRequest,
    CreateGameSessionResponse
  >("gameSession/create"),
};

export const emitGameSessionStarted = createAction<{
  gameSession: GameSession;
}>("gameSession/emitGameSessionStarted");
