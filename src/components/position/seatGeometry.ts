/**
 * Pure geometry for the seat ring. No store or React dependencies, so it can be
 * reasoned about (and exercised) in isolation.
 *
 * Seats sit on the compass points of a square, measured clockwise from the top:
 * seat 0 at 0deg (top), 1 at 90deg (right), 2 at 180deg (bottom), 3 at 270deg (left).
 */

export const SEAT_NUMBERS = [0, 1, 2, 3] as const;

const DEGREES_PER_SEAT = 360 / SEAT_NUMBERS.length;

const BOTTOM_SEAT = 2;

/**
 * How far the seat ring must rotate to bring `selfSeat` to the bottom. Rotating
 * the ring by `t` puts seat `s` at `90 * s + t`, so `t = (BOTTOM_SEAT - s) * 90`.
 * Spectators and unseated viewers (`null`) get no rotation.
 */
export function seatRotationTarget(selfSeat: number | null): number {
  if (selfSeat === null) {
    return 0;
  }

  return (BOTTOM_SEAT - selfSeat) * DEGREES_PER_SEAT;
}

/** The signed turn from `from` to `to` that never takes the long way round. */
export function shortestDelta(from: number, to: number): number {
  return ((((to - from) % 360) + 540) % 360) - 180;
}
