import { BottomSheet } from "./BottomSheet";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ConversationContextSheet({ open, onClose }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} ariaLabelledBy="conversation-sheet-title">
      {(requestClose) => (
        <div className="bottom-sheet-body">
          <div className="bottom-sheet-heading">
            <h2 id="conversation-sheet-title" className="bottom-sheet-page-title">
              Conversation context
            </h2>
            <button
              type="button"
              className="bottom-sheet-close-button"
              onClick={requestClose}
              aria-label="Close conversation context"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2.5" y="2.5" width="11" height="11" stroke="currentColor" />
                <path d="M5 5L11 11" stroke="currentColor" strokeLinecap="round" />
                <path d="M11 5L5 11" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="conversation-context-blocks">
            <div className="conversation-context-block">
              <p className="conversation-context-label">Partner (2h ago)</p>
              <p className="conversation-context-text">
                Any update on the integration approach? We need to plan next steps.
              </p>
            </div>
            <div className="conversation-context-block">
              <p className="conversation-context-label">Internal note</p>
              <p className="conversation-context-text">
                Engineering leaning toward API approach, but still discussing alternatives.
              </p>
            </div>
            <div className="conversation-context-block">
              <p className="conversation-context-label">Agent’s draft message</p>
              <p className="conversation-context-text">
                We’re discussing the API approach and will share a confirmed direction shortly.
              </p>
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
