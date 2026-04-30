import { useLayoutEffect, useState } from "react";
import { EscalationDetailScreen } from "../screens/EscalationDetailScreen";
import { ControlSurfaceScreen } from "../screens/ControlSurfaceScreen";
import { getOutcome } from "../state/derived";
import { usePocState } from "../state/usePocState";
import type { DetailItemViewModel } from "../state/derived";

const DETAIL_TRANSITION_MS = 300;

export default function App() {
  const state = usePocState();
  const [detailOverlay, setDetailOverlay] = useState<DetailItemViewModel | null>(null);
  const [detailPosition, setDetailPosition] = useState<"off-right" | "center">("off-right");

  const showDetailLayer =
    state.screenView === "escalation-detail" && state.selectedItem != null;

  useLayoutEffect(() => {
    if (!showDetailLayer) {
      return;
    }
    setDetailOverlay(state.selectedItem);
    setDetailPosition("off-right");
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDetailPosition("center"));
    });
    return () => cancelAnimationFrame(id);
  }, [showDetailLayer, state.selectedItem]);

  function closeDetailWithSlideOutRight() {
    setDetailPosition("off-right");
    window.setTimeout(() => {
      setDetailOverlay(null);
      state.returnToControlSurface();
    }, DETAIL_TRANSITION_MS);
  }

  const visualPolicy = state.pendingPolicy ?? state.committedPolicy;
  const visualOutcome = getOutcome(visualPolicy);

  return (
    <div className="app-viewport">
      <div className="app-screen app-screen--control">
        <ControlSurfaceScreen
          committedPolicy={state.committedPolicy}
          pendingPolicy={state.pendingPolicy}
          visualOutcome={visualOutcome}
          queue={state.queue}
          queueCount={state.queueCount}
          onSelectPolicy={state.tapPolicy}
          onApplyPolicy={state.applyPendingPolicy}
          onCancelPolicy={state.cancelPendingPolicy}
          onOpenEscalation={state.openEscalationDetail}
        />
      </div>
      {detailOverlay != null && (
        <div
          className={[
            "app-screen-overlay",
            detailPosition === "center" ? "app-screen-overlay--center" : "",
          ]
            .join(" ")
            .trim()}
        >
          <EscalationDetailScreen
            selectedItem={detailOverlay}
            onBack={closeDetailWithSlideOutRight}
            isPolicyDetailOpen={state.isPolicyDetailOpen}
            isConversationContextOpen={state.isConversationContextOpen}
            isEditModalOpen={state.isEditModalOpen}
            onOpenPolicyDetail={() => state.setPolicyDetailOpen(true)}
            onOpenConversationContext={() => state.setConversationContextOpen(true)}
            onClosePolicyDetail={() => state.setPolicyDetailOpen(false)}
            onCloseConversationContext={() => state.setConversationContextOpen(false)}
            onOpenEditModal={state.openEditModal}
            onEditDraftChange={state.setModalDraftText}
            onCancelEditModal={state.cancelEditModal}
            onHold={() => {
              setDetailOverlay(null);
              state.holdSelectedEscalation();
            }}
            onApproveAndSend={() => {
              setDetailOverlay(null);
              state.approveAndSendSelectedEscalation();
            }}
          />
        </div>
      )}
    </div>
  );
}
