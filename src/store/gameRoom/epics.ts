import { concat, from, of } from "rxjs";
import { catchError, filter, switchMap } from "rxjs/operators";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { joinGameRoom } from "@api/grpcClient";
import { gameRoomActions } from "./actions";

const joinGameRoomEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(gameRoomActions.joinGameRoom.request.match),
    switchMap(({ payload }) =>
      concat(
        of(gameRoomActions.joinGameRoom.pending()),
        from(joinGameRoom(payload)).pipe(
          switchMap((response) =>
            of(gameRoomActions.joinGameRoom.fulfilled(response)),
          ),
          catchError((err: unknown) =>
            of(
              gameRoomActions.joinGameRoom.rejected(
                err instanceof Error ? err.message : "Unknown error",
              ),
            ),
          ),
        ),
      ),
    ),
  );

export const gameRoomEpics = [joinGameRoomEpic];
