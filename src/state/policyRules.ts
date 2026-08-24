import type { EscalationItem, OutcomeCardModel, PolicyStance } from "./types";

const riskThresholdByPolicy: Record<PolicyStance, number> = {
  strict: 20,
  balanced: 50,
  autonomous: 70,
};

export function shouldEscalate(
  item: EscalationItem,
  committedPolicy: PolicyStance,
): boolean {
  return item.automationRisk >= riskThresholdByPolicy[committedPolicy];
}

export function getOutcomeCardModel(policy: PolicyStance): OutcomeCardModel {
  if (policy === "strict") {
    return {
      headline: "System routes most messages for review",
      description: "",
      autoSent: "2",
      escalated: "9",
      avgResolution: "5.8m",
    };
  }

  if (policy === "autonomous") {
    return {
      headline: "System acts unless something is clearly risky",
      description: "",
      autoSent: "13",
      escalated: "2",
      avgResolution: "1.4m",
    };
  }

  return {
    headline: "System filters noise, surfaces real risk",
    description: "",
    autoSent: "8",
    escalated: "5",
    avgResolution: "3.2m",
  };
}

export function getPreviewOutcomeMetrics(pendingPolicy: PolicyStance): {
  autoSent: string;
  escalated: string;
  avgResolution: string;
} {
  if (pendingPolicy === "strict") {
    return {
      autoSent: "2",
      escalated: "9",
      avgResolution: "5.8m",
    };
  }

  if (pendingPolicy === "autonomous") {
    return {
      autoSent: "13",
      escalated: "2",
      avgResolution: "1.4m",
    };
  }

  return {
    autoSent: "8",
    escalated: "5",
    avgResolution: "3.2m",
  };
}

export function getPolicyChangePreview(pendingPolicy: PolicyStance): string {
  if (pendingPolicy === "autonomous") {
    return "Autonomous mode will auto-send 13 low and medium risk messages.";
  }
  if (pendingPolicy === "strict") {
    return "Strict mode will auto-send 2 low risk messages.";
  }
  return "Balanced mode will auto-send 8 low and medium risk messages.";
}
