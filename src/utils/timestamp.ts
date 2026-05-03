import moment from "moment-timezone";
import type { Timestamp } from "@api/generated/timestamp_pb";

const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss";

export function timestampToMomentString(
  ts: Timestamp,
  format = DEFAULT_FORMAT,
): string {
  const ms =
    Number(ts.epochSeconds) * 1_000 + Math.floor(ts.nanos / 1_000_000);
  return moment(ms).format(format);
}
