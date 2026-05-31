import { createSlice } from "@reduxjs/toolkit";
import { emitGameStateUpdated } from "./actions";
import type { GameAction, GamePhase, GameState, Hand } from "@api";
import { GamePhase as GamePhaseEnum } from "@api";

export interface GameStateSliceState {
  gamePhase: GamePhase;
  gameState: GameState | null;
  hands: Hand[];
  lastGameAction: GameAction | null;
}

const initialState: GameStateSliceState = {
  gamePhase: GamePhaseEnum.GamePhaseNone,
  gameState: null,
  hands: [],
  lastGameAction: null,
};

const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(emitGameStateUpdated, (state, action) => {
      state.gamePhase = action.payload.gamePhase ?? GamePhaseEnum.GamePhaseNone;
      state.gameState = (action.payload.gameState as GameState) ?? null;
      state.hands = (action.payload.gameState?.hands as Hand[]) ?? [];
      state.lastGameAction =
        (action.payload.lastGameAction as GameAction | undefined) ?? null;
    });
  },
});

export const gameStateReducer = gameStateSlice.reducer;
