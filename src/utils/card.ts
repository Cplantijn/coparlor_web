import { type Card } from "@api";

export const serializeCard = (card: Card) => {
  return `${card.suit}:${card.rank}`;
};
