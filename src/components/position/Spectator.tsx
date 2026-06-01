import type { SpectatorPosition } from "@store/occupants";
import { PlayerCard } from "./PlayerCard";

export function Spectator(props: { spectator: SpectatorPosition }) {
  const { spectator } = props;

  return (
    <PlayerCard
      occupant={spectator.occupant}
      hand={spectator.hand}
      isRoomOwner={spectator.isRoomOwner}
      isSelf={spectator.isSelf}
    />
  );
}
