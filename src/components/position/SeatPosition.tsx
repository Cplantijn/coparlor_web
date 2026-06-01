import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@store";
import { gameRoomActions } from "@store/gameRoom";
import { selectSessionId } from "@store/auth";
import { selectSeatPosition } from "@store/occupants";
import { EmptySeat } from "./EmptySeat";
import { PlayerCard } from "./PlayerCard";

export function SeatPosition(props: { seatNumber: number }) {
  const { seatNumber } = props;
  const dispatch = useDispatch<AppDispatch>();
  const selfSessionId = useSelector(selectSessionId);
  const position = useSelector((state: RootState) =>
    selectSeatPosition(state, seatNumber),
  );

  if (position.kind === "occupied") {
    return (
      <PlayerCard
        occupant={position.occupant}
        hand={position.hand}
        isRoomOwner={position.isRoomOwner}
        isSelf={position.isSelf}
      />
    );
  }

  return (
    <EmptySeat
      seatNumber={position.seatNumber}
      canJoin={position.canJoin}
      canAddBot={position.canAddBot}
      onJoin={() =>
        dispatch(
          gameRoomActions.occupySeat.request({
            seat: position.seatNumber,
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
            seat: position.seatNumber,
            scope: { case: "asBot", value: true },
          }),
        )
      }
    />
  );
}
