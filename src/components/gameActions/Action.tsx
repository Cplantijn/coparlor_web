import type { GameLegalAction } from "@api";
import { GameActionType } from "@api";
import type { AppDispatch } from "@store";
import { legalActionActions } from "@store/legalAction";
import { selectOccupantsByPublicSessionAccountIds } from "@store/occupants";
import type { OccupantEntity } from "@store/occupants";
import type { RootState } from "@store";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  action: GameLegalAction;
};

export default function Action({ action }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const targetOccupants = useSelector((state: RootState) =>
    selectOccupantsByPublicSessionAccountIds(
      state,
      action.targetOccupantSessionIds,
    ),
  );

  const handleClick = () => {
    dispatch(
      legalActionActions.commitGameAction.request({
        action: action.type,
      }),
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="min-h-10 rounded bg-amber-400 cursor-pointer px-4 py-2 text-sm font-semibold text-stone-950 shadow hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
    >
      {labelForAction(action, targetOccupants)}
    </button>
  );
}

function labelForAction(
  action: GameLegalAction,
  targetOccupants: OccupantEntity[],
): string {
  switch (action.type) {
    case GameActionType.GameActionCardDeal:
      return targetOccupants.length
        ? `Deal to ${targetOccupants.map(displayNameForOccupant).join(", ")}`
        : "Deal";
    case GameActionType.GameActionNone:
    default:
      return "Action";
  }
}

function displayNameForOccupant(occupant: OccupantEntity): string {
  return occupant.publicAccountSession.displayName;
}
