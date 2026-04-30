export type PolicyStance = "strict" | "balanced" | "autonomous";

export type EscalationStatus = "active" | "held" | "sending" | "sent";

export interface EscalationItem {
  id: string;
  title: string;
  summary: string;
  agentLabel: string;
  intent: string;
  riskRationale: string;
  suggestedActions: string[];
  proposedAction: string;
  draftMessage: string;
  conversationContext: string;
  automationRisk: number;
}

export interface EscalationRuntimeState {
  status: EscalationStatus;
  sentMessage?: string;
}

export interface OutcomeCardModel {
  headline: string;
  description: string;
  autoSent: string;
  escalated: string;
  avgResolution: string;
}
