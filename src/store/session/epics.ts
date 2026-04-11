import { concat, from, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { startGameSession } from "@api/grpcClient";
import { startGameSessionActions } from "./actions";

const startGameSessionEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(startGameSessionActions.request.match),
    switchMap(({ payload }) =>
      concat(
        of(startGameSessionActions.pending()),
        from(startGameSession(payload)).pipe(
          map((response) => startGameSessionActions.fulfilled(response)),
          catchError((err: unknown) =>
            of(startGameSessionActions.rejected(
              err instanceof Error ? err.message : "Unknown error"
            ))
          )
        )
      )
    )
  );

export const sessionEpics = [startGameSessionEpic];
