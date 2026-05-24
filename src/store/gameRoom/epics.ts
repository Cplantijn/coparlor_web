import { concat, from, of } from "rxjs";
import { catchError, filter, switchMap } from "rxjs/operators";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { createGameRoom, joinGameRoom } from "@api/grpcClient";
import { gameRoomActions } from "./actions";
import { router } from "../../router";

const joinGameRoomEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(gameRoomActions.joinGameRoom.request.match),
    switchMap(({ payload }) =>
      concat(
        of(gameRoomActions.joinGameRoom.pending(payload)),
        from(
          joinGameRoom({
            name: payload.name,
          }),
        ).pipe(
          switchMap((response) =>
            of(gameRoomActions.joinGameRoom.fulfilled(response, payload)),
          ),
          catchError((err: unknown) => {
            alert(err instanceof Error ? err.message : "Unknown error");
            return of(
              gameRoomActions.joinGameRoom.rejected(
                err instanceof Error ? err.message : "Unknown error",
                payload,
              ),
            );
          }),
        ),
      ),
    ),
  );

const createGameRoomEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(gameRoomActions.createGameRoom.request.match),
    switchMap(({ payload }) =>
      concat(
        of(gameRoomActions.createGameRoom.pending(payload)),
        from(createGameRoom(payload)).pipe(
          switchMap((response) => {
            const roomName = response.gameRoom?.name;

            if (roomName) {
              router.navigate({ to: "/r/$roomName", params: { roomName } });
            }

            return of(
              gameRoomActions.createGameRoom.fulfilled(response, payload),
            );
          }),
          catchError((err: unknown) =>
            of(
              gameRoomActions.createGameRoom.rejected(
                err instanceof Error ? err.message : "Unknown error",
                payload,
              ),
            ),
          ),
        ),
      ),
    ),
  );

export const gameRoomEpics = [joinGameRoomEpic, createGameRoomEpic];
