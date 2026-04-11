import { createAction } from "@reduxjs/toolkit";
import type { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export interface ActionSet<TRequest, TFulfilled> {
  request: ActionCreatorWithPayload<TRequest>;
  pending: ActionCreatorWithoutPayload;
  fulfilled: ActionCreatorWithPayload<TFulfilled>;
  rejected: ActionCreatorWithPayload<string>;
}

export function createActionSet<TRequest, TFulfilled>(prefix: string): ActionSet<TRequest, TFulfilled> {
  return {
    request: createAction<TRequest>(`${prefix}/request`) as ActionCreatorWithPayload<TRequest>,
    pending: createAction(`${prefix}/pending`) as ActionCreatorWithoutPayload,
    fulfilled: createAction<TFulfilled>(`${prefix}/fulfilled`) as ActionCreatorWithPayload<TFulfilled>,
    rejected: createAction<string>(`${prefix}/rejected`) as ActionCreatorWithPayload<string>,
  };
}
