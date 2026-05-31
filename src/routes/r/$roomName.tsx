import { createFileRoute } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { GameType, OccupantRole, type Hand } from "@api";

import { store } from "@store";
import {
  gameRoomActions,
  selectGameRoomError,
  selectGameRoomLoading,
  selectGameRoomName,
} from "@store/gameRoom";
import { gameSessionActions } from "@store/gameSession";
import { selectSessionId } from "@store/auth";

import { getAllOccupants, type OccupantEntity } from "@store/occupants";
import { MessageBanner } from "../../components/MessageBanner";
import { PlayingCard } from "../../components/PlayingCard";
import { selectGameHands } from "@store/gameState";

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
  const dispatch = useDispatch();
  const { roomName: roomNameParam } = Route.useParams();
  const loading = useSelector(selectGameRoomLoading);
  const error = useSelector(selectGameRoomError);
  const roomName = useSelector(selectGameRoomName);
  const occupants = useSelector(getAllOccupants);
  const selfSessionId = useSelector(selectSessionId);
  const hands = useSelector(selectGameHands);

  const handleRequestStartSession = () => {
    dispatch(
      gameSessionActions.createGameSession.request({
        gameType: GameType.EUCHRE,
      }),
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <p className="text-xl">Joining room…</p>
      </div>
    );
  }

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
  const isSelfRoomOwner =
    roomOwner?.publicAccountSession?.sessionAccountId === selfSessionId;
  const spectators = occupants.filter(
    (occ) => occ.role === OccupantRole.OccupantRoleSpectator,
  );

  const firstSeat = occupants.find(
    (occ) =>
      (occ.role === OccupantRole.OccupantRoleHumanPlayer ||
        occ.role === OccupantRole.OccupantRoleBotPlayer) &&
      occ.seat === 0,
  );

  const secondSeat = occupants.find(
    (occ) =>
      (occ.role === OccupantRole.OccupantRoleHumanPlayer ||
        occ.role === OccupantRole.OccupantRoleBotPlayer) &&
      occ.seat === 1,
  );

  const thirdSeat = occupants.find(
    (occ) =>
      (occ.role === OccupantRole.OccupantRoleHumanPlayer ||
        occ.role === OccupantRole.OccupantRoleBotPlayer) &&
      occ.seat === 2,
  );

  const fourthSeat = occupants.find(
    (occ) =>
      (occ.role === OccupantRole.OccupantRoleHumanPlayer ||
        occ.role === OccupantRole.OccupantRoleBotPlayer) &&
      occ.seat === 3,
  );

  return (
    <div className="relative min-h-screen">
      <MessageBanner />
      <div className="relative z-10 min-h-screen flex justify-center pt-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-center text-red-800 underline">
            {roomName}
          </h1>
          {Boolean(spectators.length) && (
            <div className="flex flex-col gap-3 pb-4 border-b border-gray-300">
              <h2>Spectators</h2>
              <ul className="flex flex-wrap gap-2 items-center">
                {spectators.map((occ) => (
                  <li key={occ.publicAccountSession.sessionAccountId}>
                    <Occupant
                  occupant={occ}
                  hand={findOccupantHand(hands, occ)}
                  isRoomOwner={occ.isRoomOwner}
                      isSelf={
                        occ.publicAccountSession?.sessionAccountId ===
                        selfSessionId
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="py-8 gap-4 flex flex-col">
            <div className="flex justify-center">
              {firstSeat ? (
                <Occupant
                  occupant={firstSeat}
                  hand={findOccupantHand(hands, firstSeat)}
                  isRoomOwner={firstSeat.isRoomOwner}
                  isSelf={
                    firstSeat.publicAccountSession?.sessionAccountId ===
                    selfSessionId
                  }
                />
              ) : (
                <EmptySeat
                  seatNumber={0}
                  canAddBot={isSelfRoomOwner}
                  onJoin={() =>
                    dispatch(
                      gameRoomActions.occupySeat.request({
                        seat: 0,
                        scope: {
                          case: "occupantSessionId",
                          value: selfSessionId ?? "",
                        },
                      }),
                    )
                  }
                  onAddBot={() =>
                    dispatch(
                      gameRoomActions.occupySeat.request({
                        seat: 0,
                        scope: { case: "asBot", value: true },
                      }),
                    )
                  }
                />
              )}
            </div>
            <div className="flex gap-4 justify-between">
              {secondSeat ? (
                <Occupant
                  occupant={secondSeat}
                  hand={findOccupantHand(hands, secondSeat)}
                  isRoomOwner={secondSeat.isRoomOwner}
                  isSelf={
                    secondSeat.publicAccountSession?.sessionAccountId ===
                    selfSessionId
                  }
                />
              ) : (
                <EmptySeat
                  seatNumber={1}
                  canAddBot={isSelfRoomOwner}
                  onJoin={() =>
                    dispatch(
                      gameRoomActions.occupySeat.request({
                        seat: 1,
                        scope: {
                          case: "occupantSessionId",
                          value: selfSessionId ?? "",
                        },
                      }),
                    )
                  }
                  onAddBot={() =>
                    dispatch(
                      gameRoomActions.occupySeat.request({
                        seat: 1,
                        scope: { case: "asBot", value: true },
                      }),
                    )
                  }
                />
              )}
              {thirdSeat ? (
                <Occupant
                  occupant={thirdSeat}
                  hand={findOccupantHand(hands, thirdSeat)}
                  isRoomOwner={thirdSeat.isRoomOwner}
                  isSelf={
                    thirdSeat.publicAccountSession?.sessionAccountId ===
                    selfSessionId
                  }
                />
              ) : (
                <EmptySeat
                  seatNumber={2}
                  canAddBot={isSelfRoomOwner}
                  onJoin={() =>
                    dispatch(
                      gameRoomActions.occupySeat.request({
                        seat: 2,
                        scope: {
                          case: "occupantSessionId",
                          value: selfSessionId ?? "",
                        },
                      }),
                    )
                  }
                  onAddBot={() =>
                    dispatch(
                      gameRoomActions.occupySeat.request({
                        seat: 2,
                        scope: { case: "asBot", value: true },
                      }),
                    )
                  }
                />
              )}
            </div>
            <div className="flex justify-center">
              {fourthSeat ? (
                <Occupant
                  occupant={fourthSeat}
                  hand={findOccupantHand(hands, fourthSeat)}
                  isRoomOwner={fourthSeat.isRoomOwner}
                  isSelf={
                    fourthSeat.publicAccountSession?.sessionAccountId ===
                    selfSessionId
                  }
                />
              ) : (
                <EmptySeat
                  seatNumber={3}
                  canAddBot={isSelfRoomOwner}
                  onJoin={() =>
                    dispatch(
                      gameRoomActions.occupySeat.request({
                        seat: 3,
                        scope: {
                          case: "occupantSessionId",
                          value: selfSessionId ?? "",
                        },
                      }),
                    )
                  }
                  onAddBot={() =>
                    dispatch(
                      gameRoomActions.occupySeat.request({
                        seat: 3,
                        scope: { case: "asBot", value: true },
                      }),
                    )
                  }
                />
              )}
            </div>
          </div>

          {selfSessionId ===
            roomOwner?.publicAccountSession?.sessionAccountId && (
            <button
              className="mt-4 px-4 py-2 bg-amber-400 cursor-pointer rounded-sm hover:bg-amber-600 hover:text-white relative hover:bottom-1 hover:shadow"
              onClick={handleRequestStartSession}
            >
              Start Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Occupant(props: {
  occupant: OccupantEntity;
  hand: Hand | undefined;
  isRoomOwner: boolean;
  isSelf: boolean;
}) {
  const cards = props.hand?.card ?? [];

  return (
    <div className="relative p-2 py-3 border rounded-sm w-48 flex flex-col items-center gap-2 border-gray-200 cursor-pointer hover:bg-gray-100 bg-gray-50">
      <span className="gap-0.5 font-bold text-orange-500">
        {props.occupant.publicAccountSession?.displayName}
      </span>
      {cards.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1">
          {cards.map((card, index) => (
            <PlayingCard
              key={`${props.occupant.publicAccountSession.sessionAccountId}-${index}`}
              card={card}
            />
          ))}
        </div>
      )}
      <div className="absolute flex gap-1 -top-3 -left-3 font-normal">
        {props.isRoomOwner && (
          <span className="bg-green-600 border border-green-700 text-white rounded-sm p-1 text-[10px]">
            Owner
          </span>
        )}
        {props.isSelf && (
          <span className="bg-orange-600 border border-orange-700 text-white rounded-sm p-1 text-[10px]">
            Me
          </span>
        )}
        {props.occupant.role === OccupantRole.OccupantRoleBotPlayer && (
          <span className="bg-yellow-500 border border-yellow-600 text-white rounded-sm p-1 text-[10px]">
            🤖 Bot
          </span>
        )}
      </div>
    </div>
  );
}

function findOccupantHand(
  hands: Hand[],
  occupant: OccupantEntity,
): Hand | undefined {
  return hands.find(
    (hand) =>
      hand.occupantSessionId === occupant.publicAccountSession.sessionAccountId,
  );
}

export function EmptySeat(props: {
  seatNumber: number;
  canAddBot: boolean;
  onJoin: () => void;
  onAddBot: () => void;
}) {
  return (
    <div className="relative p-2 border rounded-sm w-48 flex flex-col items-center border-gray-200 hover:bg-gray-100 gap-1">
      <span className="text-4xl">{props.seatNumber}</span>
      <button
        className="p-1 rounded-sm bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
        onClick={props.onJoin}
      >
        Join
      </button>
      {props.canAddBot && (
        <button
          className="p-1 rounded-sm bg-green-500  hover:bg-green-700 text-white text-xs font-bold cursor-pointer"
          onClick={props.onAddBot}
        >
          Add Bot
        </button>
      )}
    </div>
  );
}
