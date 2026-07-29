import type { Card, GameLegalAction } from "@api";
import { GameActionType, GameType, Rank, Suit } from "@api";
import type { AppDispatch } from "@store";
import { gameSessionActions } from "@store/gameSession";
import { legalActionActions } from "@store/legalAction";

const actionLabels: Partial<Record<GameActionType, string>> = {
  [GameActionType.GameActionStartSession]: "Start Session",
  [GameActionType.GameActionCardDealAll]: "Deal to All",
  [GameActionType.GameActionCardDealFinish]: "Finish Deal",
  [GameActionType.GameActionEuchrePass]: "Pass",
  [GameActionType.GameActionEuchreOrderUp]: "Order Up",
  [GameActionType.GameActionEuchreCallTrump]: "Call Trump",
  [GameActionType.GameActionEuchreAlone]: "Go Alone",
  [GameActionType.GameActionEuchrePartner]: "Play With Partner",
  [GameActionType.GameActionEuchrePlayCard]: "Play Card",
  [GameActionType.GameActionEuchreDiscard]: "Discard",
};

export function dispatchLegalAction(
  dispatch: AppDispatch,
  action: GameLegalAction,
) {
  if (action.type === GameActionType.GameActionStartSession) {
    dispatch(
      gameSessionActions.createGameSession.request({
        gameType: GameType.EUCHRE,
      }),
    );
    return;
  }

  dispatch(
    legalActionActions.commitGameAction.request({
      gameAction: {
        type: action.type,
        payload: {
          cards: action.cards,
          cardSuit: action.cardSuit,
        },
      },
    }),
  );
}

export function translateLegalActionLabel(
  action: GameLegalAction,
  targetDisplayNames: string[],
): string {
  switch (action.type) {
    case GameActionType.GameActionCardDeal:
      return targetDisplayNames.length
        ? `Deal to ${targetDisplayNames.join(", ")}`
        : "Deal";
    case GameActionType.GameActionEuchreOrderUp:
      return appendCard(actionLabels[action.type], action.cards[0]);
    case GameActionType.GameActionEuchreCallTrump:
      return `Call ${displaySuit(action.cardSuit)}`;
    case GameActionType.GameActionEuchrePlayCard:
      return appendCard("Play", action.cards[0]);
    case GameActionType.GameActionEuchreDiscard:
      return appendCard(actionLabels[action.type], action.cards[0]);
    default:
      return actionLabels[action.type] ?? "Action";
  }
}

function appendCard(label: string | undefined, card: Card | undefined): string {
  const fallback = label ?? "Action";
  return card ? `${fallback} ${displayCard(card)}` : fallback;
}

function displayCard(card: Card): string {
  return `${displayRank(card.rank)} of ${displaySuit(card.suit)}`;
}

function displayRank(rank: Rank): string {
  switch (rank) {
    case Rank.NINE:
      return "Nine";
    case Rank.TEN:
      return "Ten";
    case Rank.JACK:
      return "Jack";
    case Rank.QUEEN:
      return "Queen";
    case Rank.KING:
      return "King";
    case Rank.ACE:
      return "Ace";
    default:
      return "Card";
  }
}

function displaySuit(suit: Suit): string {
  switch (suit) {
    case Suit.CLUBS:
      return "Clubs";
    case Suit.DIAMONDS:
      return "Diamonds";
    case Suit.HEARTS:
      return "Hearts";
    case Suit.SPADES:
      return "Spades";
    default:
      return "Trump";
  }
}
