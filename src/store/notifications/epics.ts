import { filter, switchMap, catchError, mergeMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { authStateChanged } from "@store/auth";
import { emitOccupantJoinedRoom } from "@store/gameRoom";
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
            case "occupantJoinedRoomPayload":
              if (notification.payload.value.occupant) {
                return [
                  emitOccupantJoinedRoom([notification.payload.value.occupant]),
                ];
              }
              return EMPTY;
            default:
              return EMPTY;
          }
        }),
        catchError((err: unknown) => {
          console.error("[notifications] stream error:", err);
          return EMPTY;
        }),
      ),
    ),
  );

export const notificationEpics = [notificationSubscriptionEpic];
