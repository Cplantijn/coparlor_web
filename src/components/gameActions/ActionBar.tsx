import type { AppDispatch } from "@store";
import { selectLegalActions } from "@store/legalAction";
import { selectOccupantEntities } from "@store/occupants";
import { useDispatch, useSelector } from "react-redux";
import Action from "./Action";
import { legalActionId } from "@store/legalAction/utils";
import { CoachPrompter } from "@components/coachPrompter";
import {
  dispatchLegalAction,
  translateLegalActionLabel,
} from "./actionHandlers";

export default function ActionBar() {
  const dispatch = useDispatch<AppDispatch>();
  const legalActions = useSelector(selectLegalActions);
  const occupantsById = useSelector(selectOccupantEntities);

  if (legalActions.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-800 bg-stone-950/90 px-4 py-3 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3">
        {legalActions.map((action) => {
          const targetDisplayNames = action.targetOccupantSessionIds.flatMap(
            (occupantId) => {
              const occupant = occupantsById[occupantId];
              return occupant
                ? [occupant.publicAccountSession.displayName]
                : [];
            },
          );
          const label = translateLegalActionLabel(action, targetDisplayNames);

          return (
            <Action
              key={legalActionId(action)}
              label={label}
              onClick={() => dispatchLegalAction(dispatch, action)}
            />
          );
        })}
        <CoachPrompter />
      </div>
    </div>
  );
}
