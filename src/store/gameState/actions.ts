import { createAction } from "@reduxjs/toolkit";
import type { GameStateUpdatedPayload } from "@api";

export const emitGameStateUpdated = createAction<GameStateUpdatedPayload>(
  "gameState/emitGameStateUpdated",
);
