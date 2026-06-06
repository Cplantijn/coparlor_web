import { useSelector } from "react-redux";
import { selectLegalActions } from "@store/legalAction";
import Action from "./Action";
import { legalActionId } from "@store/legalAction/utils";

export default function ActionBar() {
  const legalActions = useSelector(selectLegalActions);

  if (legalActions.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-800 bg-stone-950/90 px-4 py-3 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3">
        {legalActions.map((action) => (
          <Action key={legalActionId(action)} action={action} />
        ))}
      </div>
    </div>
  );
}
