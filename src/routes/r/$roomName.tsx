import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";

import { store } from "@store";
import {
  gameRoomActions,
  selectGameRoomError,
  selectGameRoomLoading,
  selectGameRoomName,
} from "@store/gameRoom";

import { selectSpectatorPositions } from "@store/occupants";
import ActionBar from "@components/gameActions/ActionBar";

import { SeatPosition } from "@components/position/SeatPosition";
import { Spectator } from "@components/position/Spectator";
import EuchrePlayingArea from "@components/playingArea/EuchrePlayingArea";

export const Route = createFileRoute("/r/$roomName")({
  loader: ({ params }) => {
    store.dispatch(
      gameRoomActions.joinGameRoom.request({
        name: params.roomName ?? "",
      }),
    );
  },
  component: GameRoomPage,
});

function GameRoomPage() {
  const { roomName: roomNameParam } = Route.useParams();
  const loading = useSelector(selectGameRoomLoading);
  const error = useSelector(selectGameRoomError);
  const roomName = useSelector(selectGameRoomName);
  const spectators = useSelector(selectSpectatorPositions);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <p className="text-xl">Joining room…</p>
      </div>
    );
  }

  if (error) {
    const is404 = error.toLowerCase().includes("not found");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-4xl font-bold mb-2">
            {is404 ? "404" : "Error"}
          </p>
          <p className="text-white text-lg">
            {is404 ? `Room "${roomNameParam}" was not found.` : error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 min-h-screen flex justify-center pt-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-center text-red-800 underline mb-4">
            {roomName}
          </h1>
          {Boolean(spectators.length) && (
            <div className="flex flex-col gap-3 p-4 px-6 rounded-md pt-0 border border-dashed border-purple-500">
              <h2 className="text-lg text-purple-500 font-bold">Spectators</h2>
              <ul className="flex flex-wrap gap-2 items-center">
                {spectators.map((spectator) => (
                  <li
                    key={
                      spectator.occupant.publicAccountSession.sessionAccountId
                    }
                  >
                    <Spectator spectator={spectator} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="py-8 gap-4 flex flex-col">
            <div className="flex justify-center">
              <SeatPosition seatNumber={0} />
            </div>
            <div className="flex gap-4 justify-between">
              <SeatPosition seatNumber={3} />
              <EuchrePlayingArea />
              <SeatPosition seatNumber={1} />
            </div>
            <div className="flex justify-center">
              <SeatPosition seatNumber={2} />
            </div>
          </div>
        </div>
      </div>
      <ActionBar />
    </div>
  );
}
