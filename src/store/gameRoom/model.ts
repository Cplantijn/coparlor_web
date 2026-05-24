import type { CreateGameRoomRequest, GameType } from "@api";

export type CreateGameRoomClientRequest = CreateGameRoomRequest & {
  gameType: GameType;
};
