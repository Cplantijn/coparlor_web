import { OccupantRole } from "@api";
import type { OccupantEntity, OccupiedSeatPosition } from "@store/occupants";
import { PlayingCard } from "../PlayingCard";
import { cn } from "@utils";

export function PlayerCard(props: {
  occupant: OccupantEntity;
  hand: OccupiedSeatPosition["hand"];
  isRoomOwner: boolean;
  isSelf: boolean;
}) {
  const cards = props.hand?.card ?? [];
  const isBot =
    props.occupant.role === OccupantRole.OccupantRoleBotPlayer ||
    props.occupant.role === OccupantRole.OccupantRoleBotDealer;
  const isDealer =
    props.occupant.role === OccupantRole.OccupantRoleHumanDealer ||
    props.occupant.role === OccupantRole.OccupantRoleBotDealer;

  return (
    <div
      className={cn(
        "relative p-2 py-3 border rounded-sm w-48 flex flex-col items-center gap-2 cursor-pointer",
        {
          "border-gray-200 hover:bg-gray-100 bg-gray-50": !isBot && !isDealer,
          "border-yellow-200 hover:bg-yellow-100 bg-yellow-50":
            isBot && !isDealer,
          "border-purple-200 hover:bg-purple-100 bg-purple-50": isDealer,
        },
      )}
    >
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
        {isDealer && (
          <span className="bg-purple-600 border border-purple-700 text-white rounded-sm p-1 text-[10px]">
            Dealer
          </span>
        )}
        {isBot && (
          <span className="bg-yellow-500 border border-yellow-600 text-white rounded-sm p-1 text-[10px]">
            🤖 Bot
          </span>
        )}
      </div>
    </div>
  );
}
