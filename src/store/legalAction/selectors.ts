import type { RootState } from "@store";
import { legalActionsAdapter } from "./reducer";

const selectLegalActionState = (state: RootState) => state.legalAction;

export const {
  selectAll: selectLegalActions,
  selectById: selectLegalActionById,
  selectIds: selectLegalActionIds,
} = legalActionsAdapter.getSelectors(selectLegalActionState);

export const selectHasLegalActions = (state: RootState) =>
  selectLegalActions(state).length > 0;
