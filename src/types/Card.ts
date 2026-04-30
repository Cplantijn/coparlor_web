export type Card = {
  rank: (typeof RANKS)[keyof typeof RANKS];
  suit: (typeof SUITS)[keyof typeof SUITS];
};

export const RANKS = {
  TWO: { value: 2, short: "2", name: "Two" },
  THREE: { value: 3, short: "3", name: "Three" },
  FOUR: { value: 4, short: "4", name: "Four" },
  FIVE: { value: 5, short: "5", name: "Five" },
  SIX: { value: 6, short: "6", name: "Six" },
  SEVEN: { value: 7, short: "7", name: "Seven" },
  EIGHT: { value: 8, short: "8", name: "Eight" },
  NINE: { value: 9, short: "9", name: "Nine" },
  TEN: { value: 10, short: "10", name: "Ten" },
  JACK: { value: 11, short: "J", name: "Jack" },
  QUEEN: { value: 12, short: "Q", name: "Queen" },
  KING: { value: 13, short: "K", name: "King" },
  ACE: { value: 14, short: "A", name: "Ace" },
} as const;

export const SUITS = {
  CLUBS: { value: 1, symbol: "♣", name: "Clubs", color: "black" },
  DIAMONDS: { value: 2, symbol: "♦", name: "Diamonds", color: "red" },
  HEARTS: { value: 3, symbol: "♥", name: "Hearts", color: "red" },
  SPADES: { value: 4, symbol: "♠", name: "Spades", color: "black" },
} as const;
