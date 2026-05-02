import type { MessageInitShape } from "@bufbuild/protobuf";
import type { AccountSchema } from "./generated/account_pb";
import type { PublicAccountSessionSchema } from "./generated/account_session_pb";
import type {
  CreateGameSessionRequestSchema,
  CreateGameSessionResponseSchema,
  GameSessionSchema,
} from "./generated/game_session_pb";
import type {
  CreateGameRoomRequestSchema,
  CreateGameRoomResponseSchema,
  JoinGameRoomRequestSchema,
  JoinGameRoomResponseSchema,
} from "./generated/game_room_pb";
import type { OccupantSchema } from "./generated/occupant_pb";
import type {
  RoomOccupantsUpdatedPayloadSchema,
  NotificationResponseSchema,
} from "./generated/notification_pb";

// --- Messages ---
export type Account = MessageInitShape<typeof AccountSchema>;
export type PublicAccountSession = MessageInitShape<
  typeof PublicAccountSessionSchema
>;
export type CreateGameSessionRequest = MessageInitShape<
  typeof CreateGameSessionRequestSchema
>;
export type CreateGameSessionResponse = MessageInitShape<
  typeof CreateGameSessionResponseSchema
>;
export type GameSession = MessageInitShape<typeof GameSessionSchema>;
export type JoinGameRoomRequest = MessageInitShape<
  typeof JoinGameRoomRequestSchema
>;
export type JoinGameRoomResponse = MessageInitShape<
  typeof JoinGameRoomResponseSchema
>;
export type CreateGameRoomRequest = MessageInitShape<
  typeof CreateGameRoomRequestSchema
>;
export type CreateGameRoomResponse = MessageInitShape<
  typeof CreateGameRoomResponseSchema
>;
export type Occupant = MessageInitShape<typeof OccupantSchema>;
export type RoomOccupantsUpdatedPayload = MessageInitShape<
  typeof RoomOccupantsUpdatedPayloadSchema
>;
export type NotificationResponse = MessageInitShape<
  typeof NotificationResponseSchema
>;

// --- Enums ---
export { GameType } from "./generated/game_type_pb";
export { OccupantRole } from "./generated/occupant_pb";
export { NotificationType } from "./generated/notification_pb";
