/// <reference types="vite/client" />
import { Observable } from "rxjs";
import { fromBinary } from "@bufbuild/protobuf";
import { getIdToken } from "@auth/firebase";
import { NotificationResponseSchema } from "./generated/notification_pb";
import type { NotificationResponse } from "./generated/notification_pb";

const baseUrl = (): string =>
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

/**
 * Opens an SSE connection to the notification endpoint and returns an Observable
 * that emits decoded NotificationResponse messages.
 *
 * Uses fetch (not EventSource) to support the Authorization header.
 * The observable completes when the stream ends and errors on network failure.
 */
export function subscribeToNotifications(): Observable<NotificationResponse> {
  return new Observable((subscriber) => {
    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
    let cancelled = false;

    const start = async () => {
      let token: string | null = null;
      try {
        token = await getIdToken();
      } catch {
        subscriber.error(new Error("Failed to retrieve Firebase ID token"));
        return;
      }

      let response: Response;
      try {
        response = await fetch(`${baseUrl()}/notifications/subscribe`, {
          headers: {
            Accept: "text/event-stream",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      } catch (err) {
        subscriber.error(err);
        return;
      }

      if (!response.ok) {
        subscriber.error(
          new Error(`Notification SSE failed: ${response.status} ${response.statusText}`),
        );
        return;
      }

      if (!response.body) {
        subscriber.error(new Error("Notification SSE response has no body"));
        return;
      }

      reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (!cancelled) {
          const { done, value } = await reader.read();
          if (done) {
            subscriber.complete();
            return;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (line.startsWith("data:")) {
              const data = line.slice(5).trim();
              if (!data) continue;
              try {
                const bytes = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
                const notification = fromBinary(NotificationResponseSchema, bytes);
                subscriber.next(notification);
              } catch (err) {
                subscriber.error(new Error(`Failed to decode notification: ${err}`));
                return;
              }
            }
          }
        }
      } catch (err) {
        if (!cancelled) {
          subscriber.error(err);
        }
      }
    };

    start();

    return () => {
      cancelled = true;
      reader?.cancel();
    };
  });
}
