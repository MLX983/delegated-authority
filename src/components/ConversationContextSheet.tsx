import { BottomSheet } from "./BottomSheet";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ConversationContextSheet({ open, onClose }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} ariaLabelledBy="conversation-sheet-title">
      {(requestClose) => (
        <>
          <div className="bottom-sheet-body">
            <div className="bottom-sheet-heading">
              <h2 id="conversation-sheet-title" className="bottom-sheet-page-title">
                Conversation context
              </h2>
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

          <div className="bottom-sheet-footer">
            <button type="button" className="sheet-done-button" onClick={requestClose}>
              Done
            </button>
          </div>
        </>
      )}
    </BottomSheet>
  );
}
