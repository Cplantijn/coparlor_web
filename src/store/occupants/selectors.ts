import type { RootState } from "@store";
import { occupantsAdapter } from "./reducer";

export const occupantsSelectors = occupantsAdapter.getSelectors(
  (state: RootState) => state.occupants,
);

export const getAllOccupants = occupantsSelectors.selectAll;
