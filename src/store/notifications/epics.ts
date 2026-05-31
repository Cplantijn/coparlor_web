import { filter, switchMap, catchError, mergeMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { authStateChanged } from "@store/auth";
import { emitRoomOccupantsUpdated } from "@store/gameRoom";
import { emitGameMessage } from "@store/gameMessage";
import { emitGameStateUpdated } from "@store/gameState";
import { subscribeToNotifications } from "@api/notificationClient";

/**
 * Subscribes to the server notification stream once the user is authenticated.
 * Each incoming NotificationResponse is mapped to the appropriate domain action —
 * this epic is a pure dispatcher; no notifications slice or state is maintained here.
 *
 * The subscription is re-established whenever auth state changes (e.g. token refresh
 * or re-authentication), courtesy of switchMap.
 */
const notificationSubscriptionEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(authStateChanged.match),
    filter((action) => action.payload.uid !== null),
    switchMap(() =>
      subscribeToNotifications().pipe(
        mergeMap((notification) => {
          switch (notification.payload.case) {
            case "roomOccupantsUpdatedPayload":
              if (notification.payload.value.occupants) {
                return [
                  emitRoomOccupantsUpdated(
                    notification.payload.value.occupants,
                  ),
                ];
              }
              return EMPTY;
            case "gameStateUpdatedPayload":
              if (notification.payload.value.gamePhase) {
                return [emitGameStateUpdated(notification.payload.value)];
              }
              return EMPTY;
            case "gameMessagePayload":
              return [emitGameMessage(notification.payload.value)];
            default:
              return EMPTY;
          }
        }),
        catchError((err: unknown) => {
          // eslint-disable-next-line no-console
          console.warn("[notifications] stream error:", err);
          return EMPTY;
        }),
      ),
    ),
  );

export const notificationEpics = [notificationSubscriptionEpic];
