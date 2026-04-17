import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { store } from "@store";
import {
  gameRoomActions,
  selectGameRoomError,
  selectGameRoomLoading,
  selectGameRoomName,
  selectGameRoomOccupants,
} from "@store/gameRoom";

export const Route = createFileRoute("/r/$roomName")({
  loader: ({ params }) => {
    store.dispatch(
      gameRoomActions.joinGameRoom.request({ name: params.roomName }),
    );
  },
  component: GameRoomPage,
});

function GameRoomPage() {
  const { roomName: roomNameParam } = Route.useParams();
  const loading = useSelector(selectGameRoomLoading);
  const error = useSelector(selectGameRoomError);
  const roomName = useSelector(selectGameRoomName);
  const occupants = useSelector(selectGameRoomOccupants);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Joining room…</p>
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-purple-500">
        <h1 className="text-4xl font-bold mb-4">{roomName}</h1>
        <p className="text-lg text-orange-500">
          {occupants.length} occupant{occupants.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
