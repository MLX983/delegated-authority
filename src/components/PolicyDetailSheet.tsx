import { BottomSheet } from "./BottomSheet";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function PolicyDetailSheet({ open, onClose }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} ariaLabelledBy="policy-sheet-title">
      {(requestClose) => (
        <div className="bottom-sheet-body">
          <div className="bottom-sheet-heading">
            <h2 id="policy-sheet-title" className="bottom-sheet-page-title">
              Policy detail
            </h2>
            <button
              type="button"
              className="bottom-sheet-close-button"
              onClick={requestClose}
              aria-label="Close policy detail"
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

          <div className="policy-detail-units">
            <div className="policy-detail-unit">
              <p className="policy-detail-unit-title">Flag if internal rationale is included</p>
              <p className="policy-detail-unit-body">Risk: Premature disclosure</p>
            </div>
            <div className="policy-detail-unit">
              <p className="policy-detail-unit-title">Flag if internal alignment is unconfirmed</p>
              <p className="policy-detail-unit-body">Risk: Misrepresentation</p>
            </div>
            <div className="policy-detail-unit">
              <p className="policy-detail-unit-title">
                Flag if language is high certainty (we’ve decided, we will, etc.)
              </p>
              <p className="policy-detail-unit-body">Risk: False commitment</p>
            </div>
            <div className="policy-detail-unit">
              <p className="policy-detail-unit-title">Flag if response delay is more than 2 hours</p>
              <p className="policy-detail-unit-body">
                Risk: Delayed response increases priority but not authority
              </p>
            </div>
            <div className="policy-detail-unit">
              <p className="policy-detail-unit-title">Flag if external recipient</p>
              <p className="policy-detail-unit-body">
                Risk: Unapproved messages could create confusion, cost money and reputation.
              </p>
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
