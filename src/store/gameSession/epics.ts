import { concat, from, of } from "rxjs";
import { catchError, filter, switchMap } from "rxjs/operators";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { createGameSession } from "@api/grpcClient";
import { router } from "../../router";
import { gameSessionActions } from "./actions";

const createGameSessionEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(gameSessionActions.createGameSession.request.match),
    switchMap(({ payload }) =>
      concat(
        of(gameSessionActions.createGameSession.pending()),
        from(createGameSession(payload)).pipe(
          switchMap((response) => {
            const gameRoomName = response.gameRoomName;

            if (gameRoomName) {
              void router.navigate({
                to: "/r/$roomName",
                params: { roomName: gameRoomName },
              });
            }
            return of(gameSessionActions.createGameSession.fulfilled(response));
          }),
          catchError((err: unknown) =>
            of(
              gameSessionActions.createGameSession.rejected(
                err instanceof Error ? err.message : "Unknown error",
              ),
            ),
          ),
        ),
      ),
    ),
  );

export const gameSessionEpics = [createGameSessionEpic];
