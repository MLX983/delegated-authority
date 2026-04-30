import type { DetailItemViewModel } from "../state/derived";
import { EscalationQueueItem } from "./EscalationQueueItem";

const ONLY_INTERACTIVE_ESCALATION_ID = "esc-1001";

interface Props {
  queue: DetailItemViewModel[];
  queueCount: number;
  onOpen: (id: string) => void;
}

export function EscalationQueueList({ queue, queueCount, onOpen }: Props) {
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
            />
          ))}
        </div>
      )}
    </section>
  );
}
