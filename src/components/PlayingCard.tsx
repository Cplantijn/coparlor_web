import { Rank, Suit, type Card } from "@api";
import { useEffect } from "react";

const CARD_ASSET_BASE = `${import.meta.env.BASE_URL}assets/standard_card_deck`;
const CARD_WIDTH = 72;
const CARD_VIEWBOX_WIDTH = 180.6;
const CARD_VIEWBOX_HEIGHT = 252.6;
const CARD_HEIGHT = Math.round(
  (CARD_WIDTH * CARD_VIEWBOX_HEIGHT) / CARD_VIEWBOX_WIDTH,
);
const CARD_ASPECT_RATIO = `${CARD_VIEWBOX_WIDTH} / ${CARD_VIEWBOX_HEIGHT}`;

const ALL_CARD_ASSET_URLS = [
  Suit.CLUBS,
  Suit.SPADES,
  Suit.DIAMONDS,
  Suit.HEARTS,
].flatMap((suit) =>
  [
    Rank.TWO,
    Rank.THREE,
    Rank.FOUR,
    Rank.FIVE,
    Rank.SIX,
    Rank.SEVEN,
    Rank.EIGHT,
    Rank.NINE,
    Rank.TEN,
    Rank.JACK,
    Rank.QUEEN,
    Rank.KING,
    Rank.ACE,
  ].map((rank) => cardAssetUrl(rank, suit)),
);

let didWarmCardImageCache = false;

export function PlayingCard(props: { card: Card }) {
  useEffect(() => {
    warmCardImageCache();
  }, []);

  const assetUrl = cardAssetUrl(props.card.rank, props.card.suit);
  const label = cardLabel(props.card);

  if (!assetUrl) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-sm border border-gray-300 bg-white px-1.5 text-xs font-bold text-black shadow-sm"
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          aspectRatio: CARD_ASPECT_RATIO,
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <img
      src={assetUrl}
      alt={label}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      decoding="async"
      loading="eager"
      fetchPriority="high"
      className="inline-block h-auto shrink-0 rounded-sm shadow-sm"
      style={{
        width: CARD_WIDTH,
        height: "auto",
        aspectRatio: CARD_ASPECT_RATIO,
      }}
    />
  );
}

function warmCardImageCache() {
  if (didWarmCardImageCache || typeof window === "undefined") {
    return;
  }

  didWarmCardImageCache = true;

  const loadAllCardImages = () => {
    for (const assetUrl of ALL_CARD_ASSET_URLS) {
      if (!assetUrl) {
        continue;
      }

      const image = new Image();
      image.decoding = "async";
      image.src = assetUrl;
    }
  };

  if (window.requestIdleCallback) {
    window.requestIdleCallback(loadAllCardImages, { timeout: 1500 });
    return;
  }

  window.setTimeout(loadAllCardImages, 0);
}

function cardAssetUrl(rank: Rank, suit: Suit): string | undefined {
  const rankFile = rankFileName(rank);
  const suitFolder = suitFolderName(suit);

  if (!rankFile || !suitFolder) {
    return undefined;
  }

  return `${CARD_ASSET_BASE}/${suitFolder}/${rankFile}.svg`;
}

function cardLabel(card: Card): string {
  return `${rankLabel(card.rank)} ${suitLabel(card.suit)}`;
}

function rankFileName(rank: Rank): string | undefined {
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
    case Rank.RANK_UNSPECIFIED:
    default:
      return undefined;
  }
}

function suitFolderName(suit: Suit): string | undefined {
  switch (suit) {
    case Suit.HEARTS:
      return "hearts";
    case Suit.DIAMONDS:
      return "diamonds";
    case Suit.CLUBS:
      return "clubs";
    case Suit.SPADES:
      return "spades";
    case Suit.SUIT_UNSPECIFIED:
    default:
      return undefined;
  }
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
      return "Hearts";
    case Suit.DIAMONDS:
      return "Diamonds";
    case Suit.CLUBS:
      return "Clubs";
    case Suit.SPADES:
      return "Spades";
    case Suit.SUIT_UNSPECIFIED:
    default:
      return "Unknown Suit";
  }
}
