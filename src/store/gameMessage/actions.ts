import { createAction } from "@reduxjs/toolkit";
import type { GameMessagePayload } from "@api";

export const emitGameMessage = createAction<GameMessagePayload>(
  "gameMessage/emitGameMessage",
);

export const dismissGameMessage = createAction<string>(
  "gameMessage/dismissGameMessage",
);

export const markGameMessagesVisible = createAction<string[]>(
  "gameMessage/markGameMessagesVisible",
);
