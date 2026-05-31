import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { GameMessageType } from "@api";
import {
  dismissGameMessage,
  markGameMessagesVisible,
  selectVisibleGameMessages,
  type GameMessage,
} from "@store/gameMessage";
import { cn } from "@utils/classnames";

const AUTO_DISMISS_MS = 5_000;
const AUTO_DISMISS_FADE_MS = 200;

export function MessageBanner() {
  const dispatch = useDispatch();
  const messages = useSelector(selectVisibleGameMessages);
  const [autoDismissingIds, setAutoDismissingIds] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    const hiddenMessageIds = messages
      .filter((message) => message.visibleAt === null)
      .map((message) => message.id);

    if (hiddenMessageIds.length > 0) {
      dispatch(markGameMessagesVisible(hiddenMessageIds));
    }
  }, [dispatch, messages]);

  useEffect(() => {
    const timers = messages
      .filter((message) => message.visibleAt !== null)
      .flatMap((message) => {
        const visibleForMs = Date.now() - message.visibleAt!;
        const remainingMs = Math.max(AUTO_DISMISS_MS - visibleForMs, 0);

        const fadeTimer = window.setTimeout(() => {
          setAutoDismissingIds((current) => {
            const next = new Set(current);
            next.add(message.id);
            return next;
          });
        }, remainingMs);

        const dismissTimer = window.setTimeout(() => {
          dispatch(dismissGameMessage(message.id));
        }, remainingMs + AUTO_DISMISS_FADE_MS);

        return [fadeTimer, dismissTimer];
      });

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [dispatch, messages]);

  if (messages.length === 0 || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed left-1/2 top-4 z-50 flex w-[min(90vw,600px)] -translate-x-1/2 flex-col gap-2">
      {messages.map((message) => (
        <Toast
          key={message.id}
          message={message}
          isAutoDismissing={autoDismissingIds.has(message.id)}
          onDismiss={() => dispatch(dismissGameMessage(message.id))}
        />
      ))}
    </div>,
    document.body,
  );
}

function Toast(props: {
  message: GameMessage;
  isAutoDismissing: boolean;
  onDismiss: () => void;
}) {
  const styles = messageTypeStyles(props.message.type);

  return (
    <div
      className={cn(
        "pointer-events-auto flex min-h-12 w-full items-center gap-3 rounded-md border px-4 py-3 shadow-lg ring-1 ring-black/5 transition-all animate-[message-drop-in_180ms_ease-out]",
        { "-translate-y-2 opacity-0 duration-200": props.isAutoDismissing },
        styles.container,
      )}
    >
      <div className={cn("h-2.5 w-2.5 shrink-0 rounded-full", styles.dot)} />
      <p className="min-w-0 flex-1 select-text text-sm font-medium leading-5">
        {props.message.message}
      </p>
      <button
        type="button"
        aria-label="Dismiss message"
        className={cn(
          "flex shrink-0 p-1 cursor-pointer items-center justify-center leading-none transition-colors rounded-lg",
          styles.button,
        )}
        onClick={props.onDismiss}
      >
        <CloseIcon className="size-3" />
      </button>
    </div>
  );
}

function messageTypeStyles(type: GameMessageType | undefined) {
  switch (type) {
    case GameMessageType.TIP:
      return {
        container: "border-emerald-200 bg-emerald-50 text-emerald-950",
        dot: "bg-emerald-500",
        button: "text-emerald-900 hover:bg-emerald-100",
      };
    case GameMessageType.WARNING:
      return {
        container: "border-amber-200 bg-amber-50 text-amber-950",
        dot: "bg-amber-500",
        button: "text-amber-900 hover:bg-amber-100",
      };
    case GameMessageType.EXCEPTION:
      return {
        container: "border-red-200 bg-red-50 text-red-950",
        dot: "bg-red-600",
        button: "text-red-900 hover:bg-red-100",
      };
    case GameMessageType.NOTICE:
    default:
      return {
        container: "border-sky-200 bg-sky-50 text-sky-950",
        dot: "bg-sky-500",
        button: "text-sky-900 hover:bg-sky-100",
      };
  }
}
