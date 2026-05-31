import { Rank, Suit, type Card } from "@api";
import { cn } from "@utils/classnames";

export function PlayingCard(props: { card: Card }) {
  const isRed =
    props.card.suit === Suit.HEARTS || props.card.suit === Suit.DIAMONDS;

  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-5 items-center justify-center rounded-sm border border-gray-300 bg-white px-1.5 text-xs font-bold shadow-sm",
        isRed ? "text-red-600" : "text-black",
      )}
    >
      {rankLabel(props.card.rank)}
      {suitLabel(props.card.suit)}
    </span>
  );
}

function rankLabel(rank: Rank): string {
  switch (rank) {
    case Rank.TWO:
      return "2";
    case Rank.THREE:
      return "3";
    case Rank.FOUR:
      return "4";
    case Rank.FIVE:
      return "5";
    case Rank.SIX:
      return "6";
    case Rank.SEVEN:
      return "7";
    case Rank.EIGHT:
      return "8";
    case Rank.NINE:
      return "9";
    case Rank.TEN:
      return "10";
    case Rank.JACK:
      return "J";
    case Rank.QUEEN:
      return "Q";
    case Rank.KING:
      return "K";
    case Rank.ACE:
      return "A";
    case Rank.JOKER:
      return "Joker";
    case Rank.RANK_UNSPECIFIED:
    default:
      return "?";
  }
}

function suitLabel(suit: Suit): string {
  switch (suit) {
    case Suit.HEARTS:
      return "H";
    case Suit.DIAMONDS:
      return "D";
    case Suit.CLUBS:
      return "C";
    case Suit.SPADES:
      return "S";
    case Suit.SUIT_UNSPECIFIED:
    default:
      return "?";
  }
}
