import { type FormEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@components/common";
import type { AppDispatch } from "@store";
import {
  askGameCoachFormSchema,
  gameCoachActions,
  selectGameCoachActivePrompt,
  selectGameCoachError,
  selectGameCoachLoading,
  selectGameCoachOutput,
  type AskGameCoachFormValues,
} from "@store/gameCoach";
import { cn } from "@utils";

const actionButtonClassName =
  "min-h-10 rounded bg-amber-400 cursor-pointer px-4 py-2 text-sm font-semibold text-stone-950 shadow hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200";

const initialFormValues: AskGameCoachFormValues = {
  userPrompt: "",
};

export function CoachPrompter() {
  const dispatch = useDispatch<AppDispatch>();
  const activePrompt = useSelector(selectGameCoachActivePrompt);
  const error = useSelector(selectGameCoachError);
  const loading = useSelector(selectGameCoachLoading);
  const output = useSelector(selectGameCoachOutput);
  const [formValues, setFormValues] =
    useState<AskGameCoachFormValues>(initialFormValues);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const parsedForm = askGameCoachFormSchema.safeParse(formValues);

    if (!parsedForm.success) {
      setValidationError(parsedForm.error.issues[0]?.message ?? null);
      return;
    }

    setValidationError(null);
    setFormValues(parsedForm.data);
    dispatch(gameCoachActions.askGameCoach.request(parsedForm.data));
  };

  return (
    <Popover
      size="lg"
      align="end"
      trigger={
        <button type="button" className={actionButtonClassName}>
          Ask Coach
        </button>
      }
    >
      <form className="flex h-full flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-stone-950">
              Ask Coach
            </h2>
            {activePrompt && (
              <p className="mt-1 text-xs text-stone-500">
                Last asked: {activePrompt}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={cn(actionButtonClassName, "min-h-9 px-3 py-1.5", {
              "cursor-not-allowed opacity-60": loading,
            })}
          >
            {loading ? "Asking..." : "Submit"}
          </button>
        </div>

        <label className="flex min-h-0 flex-1 flex-col gap-1.5 text-sm font-medium text-stone-800">
          <span>Question</span>
          <textarea
            value={formValues.userPrompt}
            disabled={loading}
            aria-invalid={validationError !== null}
            onChange={(event) =>
              setFormValues({ userPrompt: event.target.value })
            }
            className="min-h-20 flex-1 resize-none rounded border border-stone-300 bg-white px-3 py-2 text-sm font-normal text-stone-950 shadow-inner outline-none placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:cursor-not-allowed disabled:bg-stone-100"
            placeholder="Ask about your current hand, legal moves, or strategy."
          />
        </label>

        {(validationError || error || output) && (
          <div className="max-h-64 overflow-auto rounded border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700">
            {validationError || error ? (
              <p className="font-medium text-red-700">
                {validationError ?? error}
              </p>
            ) : (
              <p>{output}</p>
            )}
          </div>
        )}
      </form>
    </Popover>
  );
}
