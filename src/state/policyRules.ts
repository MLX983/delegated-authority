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
      autoSent: "2 (-22)",
      escalated: "9 (+4)",
      avgResolution: "5.8m (+2.6m)",
    };
  }

  if (policy === "autonomous") {
    return {
      headline: "System acts unless something is clearly risky",
      description: "",
      autoSent: "13 (+5)",
      escalated: "2 (-7)",
      avgResolution: "1.4m (-3.0m)",
    };
  }

  return {
    headline: "System filters noise, surfaces real risk",
    description: "",
    autoSent: "8 (+6)",
    escalated: "5 (-4)",
    avgResolution: "3.2m (-1.1m)",
  };
}

export function getPreviewOutcomeMetrics(pendingPolicy: PolicyStance): {
  autoSent: string;
  escalated: string;
  avgResolution: string;
} {
  if (pendingPolicy === "strict") {
    return {
      autoSent: "2 (+4)",
      escalated: "9 (+4)",
      avgResolution: "5.8m (+2.6m)",
    };
  }

  if (pendingPolicy === "autonomous") {
    return {
      autoSent: "13 (+5)",
      escalated: "2 (-7)",
      avgResolution: "1.4m (-3.0m)",
    };
  }

  return {
    autoSent: "8 (-6)",
    escalated: "5 (-4)",
    avgResolution: "3.2m (-1.1m)",
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
