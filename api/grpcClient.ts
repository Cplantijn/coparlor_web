/// <reference types="vite/client" />
import { create } from "@bufbuild/protobuf";
import type { MessageInitShape } from "@bufbuild/protobuf";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { getIdToken } from "@auth/firebase";
import {
  type CreateGameSessionResponse,
  GameSessionService,
  CreateGameSessionRequestSchema,
} from "./generated/game_session_pb";
import {
  CreateGameRoomRequestSchema,
  type CreateGameRoomResponse,
  GameRoomService,
  JoinGameRoomRequestSchema,
} from "./generated/game_room_pb";
import { type JoinGameRoomResponse } from "./generated/game_room_pb";

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
const gameRoomClient = createClient(GameRoomService, transport);

// --- Endpoints ---

export async function createGameSession(
  payload: MessageInitShape<typeof CreateGameSessionRequestSchema>,
): Promise<CreateGameSessionResponse> {
  return gameSessionClient.createGameSession(
    create(CreateGameSessionRequestSchema, payload),
  );
}

export async function joinGameRoom(
  payload: MessageInitShape<typeof JoinGameRoomRequestSchema>,
): Promise<JoinGameRoomResponse> {
  return gameRoomClient.joinGameRoom(
    create(JoinGameRoomRequestSchema, payload),
  );
}

export async function createGameRoom(
  payload: MessageInitShape<typeof CreateGameRoomRequestSchema>,
): Promise<CreateGameRoomResponse> {
  return gameRoomClient.createGameRoom(
    create(CreateGameRoomRequestSchema, payload),
  );
}
