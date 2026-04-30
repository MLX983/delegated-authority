import { ConversationContextSheet } from "../components/ConversationContextSheet";
import { EditMessageModal } from "../components/EditMessageModal";
import { PolicyDetailSheet } from "../components/PolicyDetailSheet";
import type { DetailItemViewModel } from "../state/derived";

interface Props {
  selectedItem: DetailItemViewModel;
  onBack: () => void;
  isPolicyDetailOpen: boolean;
  isConversationContextOpen: boolean;
  isEditModalOpen: boolean;
  onOpenPolicyDetail: () => void;
  onOpenConversationContext: () => void;
  onClosePolicyDetail: () => void;
  onCloseConversationContext: () => void;
  onOpenEditModal: () => void;
  onEditDraftChange: (next: string) => void;
  onCancelEditModal: () => void;
  onHold: () => void;
  onApproveAndSend: () => void;
}

export function EscalationDetailScreen({
  selectedItem,
  onBack,
  isPolicyDetailOpen,
  isConversationContextOpen,
  isEditModalOpen,
  onOpenPolicyDetail,
  onOpenConversationContext,
  onClosePolicyDetail,
  onCloseConversationContext,
  onOpenEditModal,
  onEditDraftChange,
  onCancelEditModal,
  onHold,
  onApproveAndSend,
}: Props) {
  return (
    <main className="mobile-shell detail-shell">
      <div className="detail-topbar">
        <button
          type="button"
          className="detail-back-button"
          onClick={onBack}
          aria-label="Go back to message review"
        >
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="page-title">Escalation detail</h1>
      </div>

      <section className="detail-header">
        <h2 className="detail-title">May misrepresent final decision</h2>
        <p className="detail-agent">Partner Comms Agent</p>
        <button className="link-button detail-link" onClick={onOpenPolicyDetail}>
          View policy detail
        </button>
      </section>

      <hr className="detail-divider" />

      <section className="detail-sections">
        <div className="detail-block">
          <h3>What the agent is trying to do</h3>
          <p>Unblock partner by providing project status</p>
        </div>

        <div className="detail-block">
          <h3>Why it thinks this is appropriate</h3>
          <ul>
            <li>Partner requested update</li>
            <li>No response after 2 hours</li>
            <li>Internal notes are available</li>
          </ul>
        </div>

        <div className="detail-block">
          <h3>Why this might be problematic</h3>
          <ul>
            <li>Implies direction is finalized</li>
            <li>Includes internal rationale</li>
          </ul>
        </div>

        <div className="detail-block">
          <h3>Suggested actions</h3>
          <ul>
            <li>Reframe as "in progress"</li>
            <li>Remove internal rationale</li>
            <li>Hold until direction is finalized</li>
          </ul>
        </div>
      </section>

      <section className="detail-draft">
        <h3>Message draft</h3>
        <p>We’re discussing the API approach and will share a confirmed direction shortly.</p>
      </section>

      <button className="link-button detail-link" onClick={onOpenConversationContext}>
        View conversation context
      </button>

      <section className="detail-actions">
        <button className="button primary-detail" onClick={onApproveAndSend}>
          Approve &amp; Send
        </button>
        <div className="detail-secondary-actions">
          <button className="button muted" onClick={onOpenEditModal}>
            Edit
          </button>
          <button className="button muted" onClick={onHold}>
            Hold
          </button>
        </div>
      </section>

      <PolicyDetailSheet open={isPolicyDetailOpen} onClose={onClosePolicyDetail} />
      <ConversationContextSheet
        open={isConversationContextOpen}
        onClose={onCloseConversationContext}
      />
      <EditMessageModal
        open={isEditModalOpen}
        onChange={onEditDraftChange}
        onCancel={onCancelEditModal}
        onApproveAndSend={onApproveAndSend}
      />
    </main>
  );
}
