import { OccupantRole } from "@api";
import type { OccupantEntity, OccupiedSeatPosition } from "@store/occupants";
import { PlayingCard } from "../PlayingCard";

export function PlayerCard(props: {
  occupant: OccupantEntity;
  hand: OccupiedSeatPosition["hand"];
  isRoomOwner: boolean;
  isSelf: boolean;
}) {
  const cards = props.hand?.card ?? [];

  return (
    <div className="relative p-2 py-3 border rounded-sm w-48 flex flex-col items-center gap-2 border-gray-200 cursor-pointer hover:bg-gray-100 bg-gray-50">
      <span className="gap-0.5 font-bold text-orange-500">
        {props.occupant.publicAccountSession.displayName}
      </span>
      {cards.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1">
          {cards.map((card, index) => (
            <PlayingCard
              key={`${props.occupant.publicAccountSession.sessionAccountId}-${index}`}
              card={card}
            />
          ))}
        </div>
      )}
      <div className="absolute flex gap-1 -top-3 -left-3 font-normal">
        {props.isRoomOwner && (
          <span className="bg-green-600 border border-green-700 text-white rounded-sm p-1 text-[10px]">
            Owner
          </span>
        )}
        {props.isSelf && (
          <span className="bg-orange-600 border border-orange-700 text-white rounded-sm p-1 text-[10px]">
            Me
          </span>
        )}
        {props.occupant.role === OccupantRole.OccupantRoleBotPlayer && (
          <span className="bg-yellow-500 border border-yellow-600 text-white rounded-sm p-1 text-[10px]">
            Bot
          </span>
        )}
      </div>
    </div>
  );
}
