import type { PolicyStance } from "../state/types";
import { getPolicyChangePreview } from "../state/policyRules";

interface Props {
  pendingPolicy: PolicyStance | null;
  onApply: () => void;
  onCancel: () => void;
}

export function PolicyApplySheet({ pendingPolicy, onApply, onCancel }: Props) {
  if (pendingPolicy == null) return null;

  return (
    <div className="inline-preview-panel">
      <p className="inline-preview-title">Apply policy change?</p>
      <p className="inline-preview-text">{getPolicyChangePreview(pendingPolicy)}</p>
      <div className="inline-preview-actions">
        <button className="button" onClick={onApply}>
          Apply
        </button>
        <button className="button muted brand-muted" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
