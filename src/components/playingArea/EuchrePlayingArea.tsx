import { useSelector } from "react-redux";
import { selectGamePhase, selectGameState } from "@store/gameState";
import { GamePhase } from "@api";
import { PlayingCard } from "@components/PlayingCard";

export default function EuchrePlayingArea() {
  const gamePhase = useSelector(selectGamePhase);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {gamePhase === GamePhase.GamePhaseBidding && <BiddingView />}
    </div>
  );
}

export function BiddingView() {
  const gameState = useSelector(selectGameState);
  return (
    <div className="flex flex-col">
      <span className="text-lg font-bold">Upturned</span>
      {gameState?.upturnedCard && (
        <PlayingCard card={gameState.upturnedCard} width={120} />
      )}
    </div>
  );
}
