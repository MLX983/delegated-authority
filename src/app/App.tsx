import { useLayoutEffect, useRef, useState } from "react";
import { EscalationDetailScreen } from "../screens/EscalationDetailScreen";
import { ControlSurfaceScreen } from "../screens/ControlSurfaceScreen";
import { getOutcome } from "../state/derived";
import { usePocState } from "../state/usePocState";
import type { DetailItemViewModel } from "../state/derived";

const DETAIL_TRANSITION_MS = 300;
const PROTOTYPE_BASE_WIDTH = 390;
const SCALE_BREAKPOINT_PX = 420;
const MIN_EMBED_SCALE = 0.67;
const EMBED_SIDE_GUTTER_PX = 16;

export default function App() {
  const state = usePocState();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [detailOverlay, setDetailOverlay] = useState<DetailItemViewModel | null>(null);
  const [detailPosition, setDetailPosition] = useState<"off-right" | "center">("off-right");
  const [embedScale, setEmbedScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);

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

  useLayoutEffect(() => {
    function computeScale(viewportWidth: number): number {
      if (viewportWidth >= SCALE_BREAKPOINT_PX) {
        return 1;
      }
      const fittedScale = (viewportWidth - EMBED_SIDE_GUTTER_PX) / PROTOTYPE_BASE_WIDTH;
      return Math.max(MIN_EMBED_SCALE, Math.min(1, fittedScale));
    }

    function updateSizing() {
      const nextScale = computeScale(window.innerWidth);
      setEmbedScale(nextScale);
      const rawHeight = viewportRef.current?.offsetHeight ?? 0;
      setScaledHeight(Math.ceil(rawHeight * nextScale));
    }

    updateSizing();

    const resizeObserver = new ResizeObserver(() => updateSizing());
    if (viewportRef.current != null) {
      resizeObserver.observe(viewportRef.current);
    }
    window.addEventListener("resize", updateSizing);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSizing);
    };
  }, []);

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
    <div
      className="embed-scale-root"
      style={{
        ["--embed-scale" as string]: String(embedScale),
        height: scaledHeight == null ? "auto" : `${scaledHeight}px`,
      }}
    >
      <div className="embed-scale-stage">
        <div className="app-viewport" ref={viewportRef}>
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
      </div>
    </div>
  );
}
