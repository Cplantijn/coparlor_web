import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { store } from "@store";
import {
  gameRoomActions,
  selectGameRoomError,
  selectGameRoomLoading,
  selectGameRoomName,
} from "@store/gameRoom";
import { selectSessionId } from "@store/auth";

import { getAllOccupants } from "@store/occupants";
import { timestampToMomentString } from "@utils/timestamp";

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
  const occupants = useSelector(getAllOccupants);
  const selfSessionId = useSelector(selectSessionId);

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

  const roomOwner = occupants.find((occ) => occ.isRoomOwner);
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 min-h-screen flex justify-center pt-4">
        <div className="text-center text-purple-500">
          <h1 className="text-4xl font-bold">{roomName}</h1>
          <div className="text-lg text-orange-500">
            {occupants.length} occupant{occupants.length !== 1 ? "s" : ""}
            <ul>
              {occupants.map((occ, idx) => (
                <li key={idx}>
                  {occ.publicAccountSession?.displayName}
                  {occ.publicAccountSession?.sessionAccountId ===
                    selfSessionId && (
                    <span className="text-blue-500 underline ml-2">(Me)</span>
                  )}
                  {occ.isRoomOwner && (
                    <span className="text-orange-500 underline ml-2">
                      Owner
                    </span>
                  )}
                  {occ.disconnectedAt && (
                    <span>
                      {" "}
                      (disconnected at{" "}
                      {timestampToMomentString(occ.disconnectedAt)})
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {selfSessionId ===
              roomOwner?.publicAccountSession?.sessionAccountId && (
              <div className="mt-4 px-4 py-2 bg-amber-200">Start Session</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
