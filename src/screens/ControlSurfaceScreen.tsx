import { EscalationQueueList } from "../components/EscalationQueueList";
import { OutcomeCard } from "../components/OutcomeCard";
import { PolicyApplySheet } from "../components/PolicyApplySheet";
import { PolicySegmentedControl } from "../components/PolicySegmentedControl";
import { getPreviewOutcomeMetrics } from "../state/policyRules";
import type { DetailItemViewModel } from "../state/derived";
import type { OutcomeCardModel, PolicyStance } from "../state/types";

interface Props {
  committedPolicy: PolicyStance;
  pendingPolicy: PolicyStance | null;
  visualOutcome: OutcomeCardModel;
  queue: DetailItemViewModel[];
  queueCount: number;
  onSelectPolicy: (policy: PolicyStance) => void;
  onApplyPolicy: () => void;
  onCancelPolicy: () => void;
  onOpenEscalation: (id: string) => void;
}

export function ControlSurfaceScreen({
  committedPolicy,
  pendingPolicy,
  visualOutcome,
  queue,
  queueCount,
  onSelectPolicy,
  onApplyPolicy,
  onCancelPolicy,
  onOpenEscalation,
}: Props) {
  const previewMetrics =
    pendingPolicy == null ? undefined : getPreviewOutcomeMetrics(pendingPolicy);

  return (
    <main className="mobile-shell">
      <h1 className="page-title">Message review</h1>
      <section className="policy-unit">
        <h2 className="section-title">Policy stance</h2>
        <PolicySegmentedControl
          committedPolicy={committedPolicy}
          pendingPolicy={pendingPolicy}
          onSelect={onSelectPolicy}
        />
        <div className="policy-content-wrap">
          <OutcomeCard
            model={visualOutcome}
            isPreviewMode={pendingPolicy != null}
            previewMetrics={previewMetrics}
          />
          <PolicyApplySheet
            pendingPolicy={pendingPolicy}
            onApply={onApplyPolicy}
            onCancel={onCancelPolicy}
          />
        </div>
      </section>
      <EscalationQueueList queue={queue} queueCount={queueCount} onOpen={onOpenEscalation} />
    </main>
  );
}
