import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { GameLegalAction } from "@api";
import { GameActionType } from "@api";
import { emitGameStateUpdated } from "../gameState/actions";
import { gameRoomActions } from "../gameRoom/actions";
import { emitAvailableLegalActions, legalActionActions } from "./actions";
import { legalActionId } from "./utils";

export const legalActionsAdapter = createEntityAdapter<GameLegalAction, string>(
  {
    selectId: (action) => legalActionId(action),
  },
);

export type LegalActionState = ReturnType<
  typeof legalActionsAdapter.getInitialState
>;

const initialState: LegalActionState = legalActionsAdapter.getInitialState();

const legalActionSlice = createSlice({
  name: "legalAction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gameRoomActions.joinGameRoom.pending, () => initialState)
      .addCase(gameRoomActions.joinGameRoom.rejected, () => initialState)
      .addCase(emitGameStateUpdated, () => initialState)
      .addCase(legalActionActions.commitGameAction.pending, (state, action) => {
        const actionType = action.requestPayload.gameAction?.type;
        const isGlobalDeal =
          actionType === GameActionType.GameActionCardDealAll ||
          actionType === GameActionType.GameActionCardDealFinish;
        const isEuchreMove =
          actionType === GameActionType.GameActionEuchrePass ||
          actionType === GameActionType.GameActionEuchreOrderUp ||
          actionType === GameActionType.GameActionEuchreCallTrump ||
          actionType === GameActionType.GameActionEuchreAlone ||
          actionType === GameActionType.GameActionEuchrePartner ||
          actionType === GameActionType.GameActionEuchrePlayCard ||
          actionType === GameActionType.GameActionEuchreDiscard;
        return isGlobalDeal || isEuchreMove ? initialState : state;
      })
      .addCase(emitAvailableLegalActions, (state, action) => {
        legalActionsAdapter.setAll(state, action.payload.legalActions ?? []);
      });
  },
});

export const legalActionReducer = legalActionSlice.reducer;
