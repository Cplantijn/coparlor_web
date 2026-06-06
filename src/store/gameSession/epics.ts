import { concat, from, of } from "rxjs";
import { catchError, filter, switchMap } from "rxjs/operators";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { commitGameAction, createGameSession } from "@api/grpcClient";
import { legalActionActions } from "@store/legalAction";
import { gameSessionActions } from "./actions";

const createGameSessionEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(gameSessionActions.createGameSession.request.match),
    switchMap(({ payload }) =>
      concat(
        of(gameSessionActions.createGameSession.pending(payload)),
        from(createGameSession(payload)).pipe(
          switchMap((response) =>
            of(
              gameSessionActions.createGameSession.fulfilled(response, payload),
            ),
          ),
          catchError((err: unknown) =>
            of(
              gameSessionActions.createGameSession.rejected(
                err instanceof Error ? err.message : "Unknown error",
                payload,
              ),
            ),
          ),
        ),
      ),
    ),
  );

const commitGameActionEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(legalActionActions.commitGameAction.request.match),
    switchMap(({ payload }) =>
      concat(
        of(legalActionActions.commitGameAction.pending(payload)),
        from(commitGameAction(payload)).pipe(
          switchMap((response) =>
            of(legalActionActions.commitGameAction.fulfilled(response, payload)),
          ),
          catchError((err: unknown) =>
            of(
              legalActionActions.commitGameAction.rejected(
                err instanceof Error ? err.message : "Unknown error",
                payload,
              ),
            ),
          ),
        ),
      ),
    ),
  );

export const gameSessionEpics = [createGameSessionEpic, commitGameActionEpic];
