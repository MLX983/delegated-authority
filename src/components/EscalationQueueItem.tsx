import type { DetailItemViewModel } from "../state/derived";

interface Props {
  viewModel: DetailItemViewModel;
  interactive: boolean;
  onOpen: (id: string) => void;
  itemRef?: (element: HTMLButtonElement | HTMLDivElement | null) => void;
}

export function EscalationQueueItem({ viewModel, interactive, onOpen, itemRef }: Props) {
  const { item, status } = viewModel;
  const displayTitle = status === "held" ? `Hold: ${item.title}` : item.title;
  const isSending = status === "sending";

  const className = [
    "queue-item",
    status === "held" ? "is-held" : "",
    isSending ? "is-sending" : "",
    interactive ? "" : "queue-item--static",
  ]
    .join(" ")
    .trim();

  const inner = (
    <>
      <div className="queue-item-content">
        <p className="queue-title">{displayTitle}</p>
        <p className="queue-summary">{item.summary}</p>
        <p className="queue-agent">{item.agentLabel}</p>
      </div>
      <div className="queue-item-icon-wrap">
        <span className="queue-chevron" aria-hidden="true">
          &#8250;
        </span>
      </div>
    </>
  );

  if (!interactive) {
    return (
      <div ref={itemRef} className={className}>
        {inner}
      </div>
    );
  }

  return (
    <button
      ref={itemRef}
      type="button"
      className={className}
      onClick={() => onOpen(item.id)}
      disabled={isSending}
    >
      {inner}
    </button>
  );
}
