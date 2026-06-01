import {
  OccupantRole,
  type Hand,
  type Occupant,
} from "@api";

export type OccupantEntity = Omit<Occupant, "publicAccountSession"> & {
  publicAccountSession: NonNullable<Occupant["publicAccountSession"]> & {
    sessionAccountId: string;
  };
};

export function toOccupantEntities(occupants: Occupant[]): OccupantEntity[] {
  return occupants.filter(isOccupantEntity);
}

function isOccupantEntity(occupant: Occupant): occupant is OccupantEntity {
  return Boolean(occupant.publicAccountSession?.sessionAccountId);
}

export function isPlayerOccupant(occupant: OccupantEntity): boolean {
  return (
    occupant.role === OccupantRole.OccupantRoleHumanPlayer ||
    occupant.role === OccupantRole.OccupantRoleBotPlayer
  );
}

export type OccupiedSeatPosition = {
  kind: "occupied";
  seatNumber: number;
  occupant: OccupantEntity;
  hand: Hand | undefined;
  isRoomOwner: boolean;
  isSelf: boolean;
};

export type EmptySeatPosition = {
  kind: "empty";
  seatNumber: number;
  canJoin: boolean;
  canAddBot: boolean;
};

export type SeatPosition = OccupiedSeatPosition | EmptySeatPosition;

export type SpectatorPosition = {
  occupant: OccupantEntity;
  hand: Hand | undefined;
  isRoomOwner: boolean;
  isSelf: boolean;
};
