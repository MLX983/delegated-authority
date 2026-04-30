import { useEffect, useState, type ReactNode, type TransitionEvent } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Screen-reader label id for the sheet heading element */
  ariaLabelledBy?: string;
  children: (requestClose: () => void) => ReactNode;
}

export function BottomSheet({ open, onClose, ariaLabelledBy, children }: Props) {
  const [inDom, setInDom] = useState(open);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    if (open) {
      if (!inDom) {
        setInDom(true);
        return;
      }
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setLifted(true));
      });
      return () => cancelAnimationFrame(id);
    }
    if (inDom) {
      setLifted(false);
    }
  }, [open, inDom]);

  const requestClose = () => {
    if (!lifted) {
      onClose();
      setInDom(false);
      return;
    }
    setLifted(false);
  };

  const onPanelTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "transform") return;
    if (lifted) return;
    onClose();
    setInDom(false);
  };

  if (!inDom) return null;

  return (
    <div className="bottom-sheet-backdrop" role="presentation" onClick={requestClose}>
      <div
        className={`bottom-sheet-panel ${lifted ? "bottom-sheet-panel--lifted" : ""}`}
        role="dialog"
        aria-labelledby={ariaLabelledBy}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={onPanelTransitionEnd}
      >
        {children(requestClose)}
      </div>
    </div>
  );
}
