import { createActionSet } from "../createActionSet";
import type { StartGameSessionInput, StartGameSessionResponse } from "@api/grpcClient";

export const startGameSessionActions = createActionSet<StartGameSessionInput, StartGameSessionResponse>(
  "session/startGameSession"
);
