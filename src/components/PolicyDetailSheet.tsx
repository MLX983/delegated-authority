import { BottomSheet } from "./BottomSheet";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function PolicyDetailSheet({ open, onClose }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} ariaLabelledBy="policy-sheet-title">
      {(requestClose) => (
        <>
          <div className="bottom-sheet-body">
            <div className="bottom-sheet-heading">
              <h2 id="policy-sheet-title" className="bottom-sheet-page-title">
                Policy detail
              </h2>
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
