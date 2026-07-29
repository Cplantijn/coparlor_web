import { concat, from, of } from "rxjs";
import { catchError, filter, switchMap } from "rxjs/operators";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { askGameCoach } from "@api/grpcClient";
import type { AskGameCoachRequest as ApiAskGameCoachRequest } from "@api";
import type { RootState } from "@store";
import { gameCoachActions } from "./actions";
import { selectSessionId } from "@store/gameSession/selectors";

const askGameCoachEpic: Epic<Action, Action, RootState> = (action$, state$) =>
  action$.pipe(
    filter(gameCoachActions.askGameCoach.request.match),
    switchMap(({ payload }) => {
      const gameSessionId = selectSessionId(state$.value);

      if (!gameSessionId) {
        return of(
          gameCoachActions.askGameCoach.rejected(
            "No active game session",
            payload,
          ),
        );
      }

      const rpcPayload: ApiAskGameCoachRequest = {
        gameSessionId,
        userPrompt: payload.userPrompt,
      };

      return concat(
        of(gameCoachActions.askGameCoach.pending(payload)),
        from(askGameCoach(rpcPayload)).pipe(
          switchMap((response) =>
            of(gameCoachActions.askGameCoach.fulfilled(response, payload)),
          ),
          catchError((err: unknown) =>
            of(
              gameCoachActions.askGameCoach.rejected(
                err instanceof Error ? err.message : "Unknown error",
                payload,
              ),
            ),
          ),
        ),
      );
    }),
  );

export const gameCoachEpics = [askGameCoachEpic];
