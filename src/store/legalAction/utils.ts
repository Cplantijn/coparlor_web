import { type GameLegalAction } from "@api";
import { serializeCard } from "@utils/card";

export function legalActionId(action: GameLegalAction): string {
  const targets = action.targetOccupantSessionIds.join(",") ?? "";
  const cards = action.cards.map((card) => serializeCard(card)).join(",") ?? "";
  let actionId = action.type.toString();
  if (targets) actionId += `:${targets}`;
  if (cards) actionId += `:${cards}`;
  return actionId;
}
