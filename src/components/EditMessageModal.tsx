import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onChange: (next: string) => void;
  onCancel: () => void;
  onApproveAndSend: () => void;
}

export function EditMessageModal({
  open,
  onChange,
  onCancel,
  onApproveAndSend,
}: Props) {
  const defaultMessage = "We’re discussing the API approach and will share a confirmed direction shortly.";
  const updatedMessage =
    "We’re discussing integration options and will share a confirmed direction next week.";
  const [hasPretendEdit, setHasPretendEdit] = useState(false);
  const [inDom, setInDom] = useState(open);
  const [fadeVisible, setFadeVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setHasPretendEdit(false);
      onChange(defaultMessage);
    }
  }, [open, onChange]);

  useLayoutEffect(() => {
    if (open) {
      setInDom(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFadeVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open && inDom) {
      setFadeVisible(false);
      const t = window.setTimeout(() => {
        setInDom(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open, inDom]);

  if (!inDom) return null;

  const displayedText = hasPretendEdit ? updatedMessage : defaultMessage;

  return createPortal(
    <div
      className={`sheet-backdrop edit-modal-backdrop edit-modal-layer ${
        fadeVisible ? "edit-modal-layer--visible" : ""
      }`}
    >
      <div className="sheet edit-modal-sheet">
        <div className="edit-modal-content">
          <h3 className="edit-modal-title">Edit message</h3>
          <textarea
            className="edit-textbox"
            readOnly
            value={displayedText}
            rows={2}
            onClick={() => {
              if (hasPretendEdit) return;
              setHasPretendEdit(true);
              onChange(updatedMessage);
            }}
          />
        </div>
        <div className="edit-modal-actions">
          <button
            className="button primary-detail"
            onClick={onApproveAndSend}
            disabled={!hasPretendEdit}
            aria-disabled={!hasPretendEdit}
          >
            Approve &amp; Send
          </button>
          <button type="button" className="button muted edit-cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
