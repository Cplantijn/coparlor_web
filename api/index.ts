import type { MessageInitShape } from "@bufbuild/protobuf";
import type { AccountSchema } from "./generated/account_pb";
import type { PublicAccountSessionSchema } from "./generated/account_session_pb";
import type {
  CommitGameActionRequestSchema,
  CommitGameActionResponseSchema,
  CreateGameSessionRequestSchema,
  CreateGameSessionResponseSchema,
  GameSessionSchema,
} from "./generated/game_session_pb";
import type {
  CreateGameRoomRequestSchema,
  CreateGameRoomResponseSchema,
  JoinGameRoomRequestSchema,
  OccupySeatRequestSchema,
  OccupySeatResponseSchema,
} from "./generated/game_room_pb";
import type {
  RoomOccupantsUpdatedPayloadSchema,
  NotificationResponseSchema,
  GameStateUpdatedPayloadSchema,
  GameMessagePayloadSchema,
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
export type CommitGameActionRequest = MessageInitShape<
  typeof CommitGameActionRequestSchema
>;
export type CommitGameActionResponse = MessageInitShape<
  typeof CommitGameActionResponseSchema
>;
export type GameSession = MessageInitShape<typeof GameSessionSchema>;
export type JoinGameRoomRequest = MessageInitShape<
  typeof JoinGameRoomRequestSchema
>;
export type OccupySeatRequest = MessageInitShape<
  typeof OccupySeatRequestSchema
>;
export type OccupySeatResponse = MessageInitShape<
  typeof OccupySeatResponseSchema
>;

export type GameStateUpdatedPayload = MessageInitShape<
  typeof GameStateUpdatedPayloadSchema
>;

export type GameMessagePayload = MessageInitShape<
  typeof GameMessagePayloadSchema
>;

// Response types are re-exported as their generated pb types (not MessageInitShape)
// because they arrive from the server as real Message instances, not plain init objects.
export type { GetMySessionResponse } from "./generated/auth_pb";
export type { JoinGameRoomResponse } from "./generated/game_room_pb";
export type CreateGameRoomRequest = MessageInitShape<
  typeof CreateGameRoomRequestSchema
>;
export type CreateGameRoomResponse = MessageInitShape<
  typeof CreateGameRoomResponseSchema
>;
export type { Occupant } from "./generated/occupant_pb";
export type { GameState } from "./generated/game_state_pb";
export type { Card, Hand } from "./generated/playing_card_pb";
export type { GameAction } from "./generated/game_action_pb";
export type {
  GameLegalAction,
  GameLegalActionsPayload,
} from "./generated/notification_pb";
export type RoomOccupantsUpdatedPayload = MessageInitShape<
  typeof RoomOccupantsUpdatedPayloadSchema
>;
export type NotificationResponse = MessageInitShape<
  typeof NotificationResponseSchema
>;

// --- Enums ---
export { GameType } from "./generated/game_type_pb";
export { GamePhase } from "./generated/game_phase_pb";
export { Rank, Suit } from "./generated/playing_card_pb";
export { GameActionType } from "./generated/game_action_pb";
export { OccupantRole } from "./generated/occupant_pb";
export { GameMessageType, NotificationType } from "./generated/notification_pb";
