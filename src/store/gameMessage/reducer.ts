import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import {
  dismissGameMessage,
  emitGameMessage,
  markGameMessagesVisible,
} from "./actions";
import type { GameMessagePayload } from "@api";

export type GameMessage = GameMessagePayload & {
  id: string;
  visibleAt: number | null;
};

export interface GameMessageSliceState {
  messages: GameMessage[];
}

const initialState: GameMessageSliceState = {
  messages: [],
};

const gameMessageSlice = createSlice({
  name: "gameMessage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(emitGameMessage, (state, action) => {
        state.messages.unshift({
          ...action.payload,
          id: nanoid(),
          visibleAt: null,
        });
      })
      .addCase(dismissGameMessage, (state, action) => {
        state.messages = state.messages.filter(
          (message) => message.id !== action.payload,
        );
      })
      .addCase(markGameMessagesVisible, (state, action) => {
        const visibleIds = new Set(action.payload);
        const now = Date.now();

        state.messages.forEach((message) => {
          if (visibleIds.has(message.id) && message.visibleAt === null) {
            message.visibleAt = now;
          }
        });
      });
  },
});

export const gameMessageReducer = gameMessageSlice.reducer;
