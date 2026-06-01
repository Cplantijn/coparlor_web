import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { emitGameStateUpdated } from "./actions";
import { gameRoomActions } from "../gameRoom/actions";
import type { GameAction, GamePhase, GameState, Hand } from "@api";
import { GamePhase as GamePhaseEnum } from "@api";

const handsAdapter = createEntityAdapter<Hand, string>({
  selectId: (hand) => hand.occupantSessionId,
});

export interface GameStateSliceState {
  gamePhase: GamePhase;
  gameState: GameState | null;
  hands: ReturnType<typeof handsAdapter.getInitialState>;
  lastGameAction: GameAction | null;
}

const initialState: GameStateSliceState = {
  gamePhase: GamePhaseEnum.GamePhaseNone,
  gameState: null,
  hands: handsAdapter.getInitialState(),
  lastGameAction: null,
};

const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gameRoomActions.joinGameRoom.pending, () => initialState)
      .addCase(gameRoomActions.joinGameRoom.rejected, () => initialState)
      .addCase(emitGameStateUpdated, (state, action) => {
        state.gamePhase =
          action.payload.gamePhase ?? GamePhaseEnum.GamePhaseNone;
        state.gameState = (action.payload.gameState as GameState) ?? null;
        handsAdapter.setAll(
          state.hands,
          (action.payload.gameState?.hands as Hand[]) ?? [],
        );
        state.lastGameAction =
          (action.payload.lastGameAction as GameAction | undefined) ?? null;
      });
  },
});

export const gameHandsAdapter = handsAdapter;
export const gameStateReducer = gameStateSlice.reducer;
