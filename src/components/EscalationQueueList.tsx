import { useLayoutEffect, useRef } from "react";
import type { DetailItemViewModel } from "../state/derived";
import { EscalationQueueItem } from "./EscalationQueueItem";

const ONLY_INTERACTIVE_ESCALATION_ID = "esc-1001";
const HOLD_REORDER_DURATION_MS = 1200;

interface Props {
  queue: DetailItemViewModel[];
  queueCount: number;
  holdReorderToken: number;
  onOpen: (id: string) => void;
}

export function EscalationQueueList({ queue, queueCount, holdReorderToken, onOpen }: Props) {
  const itemElementsRef = useRef<Record<string, HTMLButtonElement | HTMLDivElement | null>>({});
  const previousTopByIdRef = useRef<Record<string, number>>({});
  const holdReorderAnimationFrameRef = useRef<number | null>(null);
  const previousHoldReorderTokenRef = useRef(holdReorderToken);

  useLayoutEffect(() => {
    const shouldAnimateHoldReorder = holdReorderToken !== previousHoldReorderTokenRef.current;
    const nextTopById = Object.fromEntries(
      queue.map((entry) => [
        entry.item.id,
        itemElementsRef.current[entry.item.id]?.getBoundingClientRect().top ?? 0,
      ]),
    );

    if (shouldAnimateHoldReorder && Object.keys(previousTopByIdRef.current).length > 0) {
      const elementsToAnimate: Array<HTMLButtonElement | HTMLDivElement> = [];

      queue.forEach((entry) => {
        const element = itemElementsRef.current[entry.item.id];
        const previousTop = previousTopByIdRef.current[entry.item.id];
        const nextTop = nextTopById[entry.item.id];

        if (element == null || previousTop == null) {
          return;
        }

        const deltaY = previousTop - nextTop;
        if (deltaY === 0) {
          return;
        }

        element.style.transition = "none";
        element.style.transform = `translateY(${deltaY}px)`;
        element.getBoundingClientRect();
        elementsToAnimate.push(element);
      });

      if (elementsToAnimate.length > 0) {
        if (holdReorderAnimationFrameRef.current != null) {
          window.cancelAnimationFrame(holdReorderAnimationFrameRef.current);
        }

        holdReorderAnimationFrameRef.current = window.requestAnimationFrame(() => {
          elementsToAnimate.forEach((element) => {
            element.style.transition = `transform ${HOLD_REORDER_DURATION_MS}ms ease`;
            element.style.transform = "translateY(0)";
          });
          holdReorderAnimationFrameRef.current = null;
        });
      }
    }

    previousTopByIdRef.current = nextTopById;
    previousHoldReorderTokenRef.current = holdReorderToken;

    return () => {
      if (holdReorderAnimationFrameRef.current != null) {
        window.cancelAnimationFrame(holdReorderAnimationFrameRef.current);
        holdReorderAnimationFrameRef.current = null;
      }
    };
  }, [queue, holdReorderToken]);

  return (
    <section className="queue-section">
      <h2 className="section-title">Needs review ({queueCount})</h2>
      {queue.length === 0 ? (
        <p className="empty-copy">No messages currently require review.</p>
      ) : (
        <div className="queue-list">
          {queue.map((entry) => (
            <EscalationQueueItem
              key={entry.item.id}
              viewModel={entry}
              interactive={
                entry.item.id === ONLY_INTERACTIVE_ESCALATION_ID &&
                (entry.status === "active" || entry.status === "sending")
              }
              onOpen={onOpen}
              itemRef={(element) => {
                itemElementsRef.current[entry.item.id] = element;
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
