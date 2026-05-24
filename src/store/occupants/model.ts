import type { Occupant, PublicAccountSession } from "@api";

export type OccupantEntity = Omit<Occupant, "publicAccountSession"> & {
  publicAccountSession: PublicAccountSession;
};

export function toOccupantEntities(occupants: Occupant[]): OccupantEntity[] {
  return occupants.filter(
    (occ) => occ.publicAccountSession !== undefined,
  ) as OccupantEntity[];
}
