import type { OutcomeCardModel } from "../state/types";

interface Props {
  model: OutcomeCardModel;
  isPreviewMode?: boolean;
  previewMetrics?: {
    autoSent: string;
    escalated: string;
    avgResolution: string;
  };
}

export function OutcomeCard({ model, isPreviewMode = false, previewMetrics }: Props) {
  const autoSentLabel = isPreviewMode ? "Will auto-send" : "Auto-sent";
  const escalatedLabel = isPreviewMode ? "Will escalate" : "Escalated";
  const displayedMetrics = isPreviewMode && previewMetrics != null ? previewMetrics : model;
  const displayedHeadline =
    isPreviewMode && model.headline === "System acts unless something is clearly risky"
      ? "System will act unless something is clearly risky"
      : model.headline;

  return (
    <section className="outcome-card">
      <p className="outcome-headline">{displayedHeadline}</p>
      {model.description !== "" && <p className="outcome-description">{model.description}</p>}
      <div className="outcome-metrics">
        <p>
          {autoSentLabel}: {displayedMetrics.autoSent}
        </p>
        <p>
          {escalatedLabel}: {displayedMetrics.escalated}
        </p>
        {!isPreviewMode && <p>Avg resolution: {displayedMetrics.avgResolution}</p>}
      </div>
    </section>
  );
}
