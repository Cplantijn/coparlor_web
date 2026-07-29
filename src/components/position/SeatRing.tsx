import type { CSSProperties } from "react";

import EuchrePlayingArea from "@components/playingArea/EuchrePlayingArea";
import { cn } from "@utils";

import { SEAT_NUMBERS } from "./seatGeometry";
import { SeatPosition } from "./SeatPosition";
import { useTableRotation } from "./useTableRotation";

/** Keep in sync with the seat card width in `PlayerCard` / `EmptySeat` (`w-72`). */
const SEAT_WIDTH_REM = 18;

/**
 * Each slot is centred on one compass point of the square ring. Centring (rather
 * than edge-anchoring) is what makes a 90deg rotation of the ring map each slot
 * exactly onto the next one.
 */
const SEAT_SLOT_STYLE: Record<number, CSSProperties> = {
  0: { top: "0%", left: "50%", transform: "translate(-50%, -50%)" },
  1: { top: "50%", left: "100%", transform: "translate(-50%, -50%)" },
  2: { top: "100%", left: "50%", transform: "translate(-50%, -50%)" },
  3: { top: "50%", left: "0%", transform: "translate(-50%, -50%)" },
};

export function SeatRing() {
  const { rotation, animate } = useTableRotation();

  const spin = cn(
    animate && "transition-transform duration-700 ease-in-out",
    "motion-reduce:transition-none",
  );

  return (
    <div
      className="relative mx-auto aspect-square"
      // Side seats overhang the ring by half a seat, so reserve a seat's width
      // of horizontal room before the square is allowed to grow.
      style={{ width: `clamp(14rem, 100% - ${SEAT_WIDTH_REM}rem, 34rem)` }}
    >
      <div
        className={cn("absolute inset-0", spin)}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {SEAT_NUMBERS.map((seatNumber) => (
          <div
            key={seatNumber}
            className="absolute w-72"
            style={SEAT_SLOT_STYLE[seatNumber]}
          >
            {/* Counter-rotates about its own centre, so the card stays upright
                and readable while its slot orbits the table. */}
            <div
              className={spin}
              style={{ transform: `rotate(${-rotation}deg)` }}
            >
              <SeatPosition seatNumber={seatNumber} />
            </div>
          </div>
        ))}
      </div>

      {/* The centre of the table never rotates. */}
      <div className="absolute inset-1/4 flex items-center justify-center">
        <EuchrePlayingArea />
      </div>
    </div>
  );
}
