import { createAction } from "@reduxjs/toolkit";
import type {
  AskGameCoachResponse,
} from "@api";
import { createActionSet } from "../createActionSet";
import type { AskGameCoachRequest } from "./model";

export const gameCoachActions = {
  askGameCoach: createActionSet<AskGameCoachRequest, AskGameCoachResponse>(
    "gameCoach/ask",
  ),
};

export const clearGameCoachResponse = createAction("gameCoach/clearResponse");
