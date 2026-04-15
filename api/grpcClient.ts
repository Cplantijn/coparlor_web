/// <reference types="vite/client" />
import { create } from "@bufbuild/protobuf";
import type { MessageInitShape } from "@bufbuild/protobuf";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { getIdToken } from "@auth/firebase";
import {
  type StartGameSessionResponse,
  GameSessionService,
  StartGameSessionRequestSchema,
} from "@api/generated/game_session_pb";

import { GameType } from "@api/generated/game_type_pb";

// The plain-data shape accepted as input — matches proto fields without internal brands
export type StartGameSessionInput = MessageInitShape<
  typeof StartGameSessionRequestSchema
>;

// Re-export types and enums so consumers never need to import from generated/
export type { StartGameSessionResponse };
export { GameType };

// --- Transport & private service clients ---

const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
  useBinaryFormat: true,
  interceptors: [
    (next) => async (req) => {
      const token = await getIdToken();
      if (token) {
        req.header.set("Authorization", `Bearer ${token}`);
      }
      return next(req);
    },
  ],
});

const gameSessionClient = createClient(GameSessionService, transport);

// --- Endpoints ---

export async function startGameSession(
  payload: StartGameSessionInput,
): Promise<StartGameSessionResponse> {
  return gameSessionClient.startGameSession(
    create(StartGameSessionRequestSchema, payload),
  );
}
