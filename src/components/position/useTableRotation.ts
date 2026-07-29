import { useState } from "react";
import { useSelector } from "react-redux";

import { selectSelfSeatNumber } from "@store/occupants";
import {
  selectIsGameSessionActive,
  selectShouldAnimateSeatRotation,
} from "@store/gameSession/selectors";

import { seatRotationTarget, shortestDelta } from "./seatGeometry";

/**
 * The angle the seat ring should be rotated to, plus whether that rotation should
 * animate. The angle accumulates rather than snapping to a normalized value, so
 * successive rotations always chain along the shortest arc.
 */
export function useTableRotation(): { rotation: number; animate: boolean } {
  const selfSeat = useSelector(selectSelfSeatNumber);
  const isSessionActive = useSelector(selectIsGameSessionActive);
  const animate = useSelector(selectShouldAnimateSeatRotation);

  const target = isSessionActive ? seatRotationTarget(selfSeat) : 0;

  const [rotation, setRotation] = useState(target);
  const [renderedTarget, setRenderedTarget] = useState(target);

  // Adjusted during render rather than in an effect, so joining a room that is
  // already mid-game lands on the final angle before the first paint instead of
  // flashing the unrotated table. React re-runs this component immediately,
  // before committing anything to the DOM.
  if (renderedTarget !== target) {
    setRenderedTarget(target);
    setRotation(rotation + shortestDelta(rotation, target));
  }

  return { rotation, animate };
}
