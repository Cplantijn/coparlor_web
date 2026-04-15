import { Observable, concat, from, map, of, switchMap, filter } from "rxjs";
import { catchError } from "rxjs/operators";
import type { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import { onIdTokenChanged, signInAnonymously, type User } from "firebase/auth";
import { auth } from "@auth/firebase";
import {
  initAuthAction,
  authStateChanged,
  signInAnonymouslyActions,
} from "./actions";

/**
 * An observable that emits whenever the Firebase Auth state changes.
 */
const authState$ = new Observable<{ uid: string | null; isAnonymous: boolean | null }>(
  (subscriber) => {
    return onIdTokenChanged(auth, (user: User | null) => {
      if (user) {
        subscriber.next({ uid: user.uid, isAnonymous: user.isAnonymous });
      } else {
        subscriber.next({ uid: null, isAnonymous: null });
      }
    });
  }
);

/**
 * Listen for the initialization action and set up the Firebase Auth state listener.
 */
const initAuthEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(initAuthAction.match),
    switchMap(() =>
      authState$.pipe(
        map((authState) => authStateChanged(authState))
      )
    )
  );

/**
 * Automatically sign in anonymously if auth state changes to null.
 */
const autoSignInEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(authStateChanged.match),
    filter((action) => action.payload.uid === null),
    map(() => signInAnonymouslyActions.request())
  );

/**
 * Handle the anonymous sign-in process.
 */
const signInAnonymouslyEpic: Epic<Action> = (action$) =>
  action$.pipe(
    filter(signInAnonymouslyActions.request.match),
    switchMap(() =>
      concat(
        of(signInAnonymouslyActions.pending()),
        from(signInAnonymously(auth)).pipe(
          map(({ user }) =>
            signInAnonymouslyActions.fulfilled({
              uid: user.uid,
              isAnonymous: user.isAnonymous,
            })
          ),
          catchError((err: unknown) =>
            of(
              signInAnonymouslyActions.rejected(
                err instanceof Error ? err.message : "Auth sign-in failed"
              )
            )
          )
        )
      )
    )
  );

export const authEpics = [initAuthEpic, autoSignInEpic, signInAnonymouslyEpic];
