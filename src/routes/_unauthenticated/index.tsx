import { createFileRoute } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { startGameSessionActions } from "../../store/session/actions";
import { GameType } from "@api/grpcClient";

export const Route = createFileRoute("/_unauthenticated/")({
  component: Index,
});

function Index() {
  const dispatch = useDispatch<AppDispatch>();

  const handleStartSession = () => {
    dispatch(startGameSessionActions.request({ gameType: GameType.EUCHRE }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-200 via-purple-400 to-indigo-600">
      <div className="text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-7xl font-bold text-white drop-shadow-xl tracking-tight select-none">
            coparlor
          </h1>
          <h2 className="text-2xl font-bold text-white drop-shadow-xl tracking-tight select-none">
            Select a game to play
          </h2>
        </div>

        <button
          onClick={handleStartSession}
          className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-100 active:scale-95 transition-all cursor-pointer"
        >
          ♣️♥️ Play Euchre ♦️♠️
        </button>
      </div>
    </div>
  );
}
