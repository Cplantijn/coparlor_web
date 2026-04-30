import { isAction } from "@reduxjs/toolkit";
import type { UnknownAction } from "redux";

export interface RequestAction<TRequest> extends UnknownAction {
  payload: TRequest;
}

export interface PendingAction<TRequest> extends UnknownAction {
  requestPayload: TRequest;
}

export interface FulfilledAction<TRequest, TFulfilled> extends UnknownAction {
  payload: TFulfilled;
  requestPayload: TRequest;
}

export interface RejectedAction<TRequest> extends UnknownAction {
  payload: string;
  requestPayload: TRequest;
}

interface RequestActionCreator<TRequest> {
  (payload: TRequest): RequestAction<TRequest>;
  type: string;
  match: (action: unknown) => action is RequestAction<TRequest>;
}

interface PendingActionCreator<TRequest> {
  (requestPayload: TRequest): PendingAction<TRequest>;
  type: string;
  match: (action: unknown) => action is PendingAction<TRequest>;
}

interface FulfilledActionCreator<TRequest, TFulfilled> {
  (payload: TFulfilled, requestPayload: TRequest): FulfilledAction<TRequest, TFulfilled>;
  type: string;
  match: (action: unknown) => action is FulfilledAction<TRequest, TFulfilled>;
}

interface RejectedActionCreator<TRequest> {
  (payload: string, requestPayload: TRequest): RejectedAction<TRequest>;
  type: string;
  match: (action: unknown) => action is RejectedAction<TRequest>;
}

export interface ActionSet<TRequest, TFulfilled> {
  request: RequestActionCreator<TRequest>;
  pending: PendingActionCreator<TRequest>;
  fulfilled: FulfilledActionCreator<TRequest, TFulfilled>;
  rejected: RejectedActionCreator<TRequest>;
}

export function createActionSet<TRequest, TFulfilled>(prefix: string): ActionSet<TRequest, TFulfilled> {
  const requestType = `${prefix}/request`;
  const pendingType = `${prefix}/pending`;
  const fulfilledType = `${prefix}/fulfilled`;
  const rejectedType = `${prefix}/rejected`;

  const request = Object.assign(
    (payload: TRequest): RequestAction<TRequest> => ({ type: requestType, payload }),
    { type: requestType, match: (a: unknown): a is RequestAction<TRequest> => isAction(a) && a.type === requestType },
  );

  const pending = Object.assign(
    (requestPayload: TRequest): PendingAction<TRequest> => ({ type: pendingType, requestPayload }),
    { type: pendingType, match: (a: unknown): a is PendingAction<TRequest> => isAction(a) && a.type === pendingType },
  );

  const fulfilled = Object.assign(
    (payload: TFulfilled, requestPayload: TRequest): FulfilledAction<TRequest, TFulfilled> => ({
      type: fulfilledType,
      payload,
      requestPayload,
    }),
    { type: fulfilledType, match: (a: unknown): a is FulfilledAction<TRequest, TFulfilled> => isAction(a) && a.type === fulfilledType },
  );

  const rejected = Object.assign(
    (payload: string, requestPayload: TRequest): RejectedAction<TRequest> => ({
      type: rejectedType,
      payload,
      requestPayload,
    }),
    { type: rejectedType, match: (a: unknown): a is RejectedAction<TRequest> => isAction(a) && a.type === rejectedType },
  );

  return { request, pending, fulfilled, rejected };
}
