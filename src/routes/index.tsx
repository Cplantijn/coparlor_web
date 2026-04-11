import { createFileRoute } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { startGameSessionActions } from "../store/session/actions";
import { GameType } from "@api/grpcClient";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const dispatch = useDispatch<AppDispatch>();

  const handleStartSession = () => {
    dispatch(startGameSessionActions.request({ gameType: GameType.EUCHRE }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-500 via-purple-600 to-indigo-700">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-white drop-shadow-2xl tracking-tight select-none">
          Hello coparlor
        </h1>
        <p className="mt-4 text-violet-200 text-lg font-medium tracking-wide opacity-80">
          Welcome to your new app
        </p>
        <button
          onClick={handleStartSession}
          className="mt-8 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl shadow-lg hover:bg-purple-50 active:scale-95 transition-all"
        >
          Start Game Session
        </button>
      </div>
    </div>
  );
}
