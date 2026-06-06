import { createAction } from "@reduxjs/toolkit";
import { createActionSet } from "../createActionSet";
import type {
  CommitGameActionRequest,
  CommitGameActionResponse,
  GameLegalActionsPayload,
} from "@api";

export const emitAvailableLegalActions = createAction<GameLegalActionsPayload>(
  "legalAction/emitAvailableLegalActions",
);

export const legalActionActions = {
  commitGameAction: createActionSet<
    CommitGameActionRequest,
    CommitGameActionResponse
  >("legalAction/commitGameAction"),
};
