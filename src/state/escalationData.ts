import type { EscalationItem, EscalationRuntimeState } from "./types";

export const escalationItems: EscalationItem[] = [
  {
    id: "esc-1001",
    title: "Message may misrepresent final decision",
    summary: "Implies direction is finalized",
    agentLabel: "Partner Comms Agent",
    intent: "Resolve billing dispute quickly to prevent churn",
    riskRationale:
      "Potential policy exception due to partial service usage and non-standard refund timeline.",
    suggestedActions: [
      "Acknowledge the customer concern and ownership.",
      "Offer standard refund path with clear timeline.",
      "Escalate account cancellation if refund terms are disputed.",
    ],
    proposedAction:
      "Send a confirmation with refund timeline and route cancellation to billing operations.",
    draftMessage:
      "Thanks for raising this. I have initiated a refund review and account cancellation request. You will receive confirmation within 24 hours.",
    conversationContext:
      "Customer reports being charged after trial period and asks for full reversal.",
    automationRisk: 82,
  },
  {
    id: "esc-1002",
    title: "Timeline may be premature",
    summary: "Commits to implementation timing",
    agentLabel: "Status Agent",
    intent: "Clarify legal language before confirming delivery terms",
    riskRationale:
      "Legal interpretation is sensitive but this clause has prior approved guidance.",
    suggestedActions: [
      "Provide non-binding interpretation based on approved template.",
      "Encourage legal follow-up for final confirmation.",
    ],
    proposedAction:
      "Reply with approved contract language summary and caveat about legal confirmation.",
    draftMessage:
      "Based on our standard agreement language, delivery dates are target estimates unless otherwise amended. Please confirm with legal counsel for binding interpretation.",
    conversationContext:
      "Vendor asks whether delayed shipment triggers penalty under section 4.2.",
    automationRisk: 61,
  },
  {
    id: "esc-1003",
    title: "Message may imply broader alignment",
    summary: "References team agreement without confirmation",
    agentLabel: "Coordination Agent",
    intent: "Provide timely order status",
    riskRationale:
      "Low risk operational message with known order-tracking source.",
    suggestedActions: [
      "Provide latest ETA from tracking system.",
      "Offer support link for additional updates.",
    ],
    proposedAction: "Send ETA update and support contact details.",
    draftMessage:
      "Your order is in transit and currently estimated to arrive on Friday. You can use your tracking link for real-time updates.",
    conversationContext:
      "Customer asks if package is still expected this week.",
    automationRisk: 24,
  },
  {
    id: "esc-1004",
    title: "Message may expose internal rationale",
    summary: "Includes unresolved internal discussion",
    agentLabel: "Partner Comms Agent",
    intent: "Respond to discount request while preserving margin policy",
    riskRationale:
      "Discount exceptions can set precedent and require manager approval.",
    suggestedActions: [
      "Share current approved discount band.",
      "Offer value-focused package alternatives.",
      "Escalate if exception is required.",
    ],
    proposedAction:
      "Send approved pricing options and request manager review for exception.",
    draftMessage:
      "We can offer our approved package options today. If you need a deeper discount, I can request manager review and follow up shortly.",
    conversationContext:
      "Prospect asks for 35% off annual plan due to budget constraints.",
    automationRisk: 73,
  },
  {
    id: "esc-1005",
    title: "Message may create dependency risk",
    summary: "Partner action implied without confirmation",
    agentLabel: "Meeting Summary Agent",
    intent: "Keep external messaging aligned with verified commitments",
    riskRationale:
      "Dependency language can create external expectations before approvals are complete.",
    suggestedActions: [
      "Remove implied commitments and use neutral status phrasing.",
      "Confirm ownership and timeline in internal thread before sending.",
    ],
    proposedAction:
      "Revise wording to avoid implied commitment and ask for confirmation.",
    draftMessage:
      "We are aligning internally on next steps and will share a confirmed update shortly.",
    conversationContext:
      "Draft implied partner action in the next sprint despite pending internal review.",
    automationRisk: 64,
  },
  {
    id: "esc-1006",
    title: "Tone may signal unintended urgency",
    summary: "Language may be interpreted as escalation",
    agentLabel: "Follow-up Agent",
    intent: "Maintain confidence without implying incident severity",
    riskRationale:
      "Urgency signals can trigger unnecessary escalation behavior from stakeholders.",
    suggestedActions: [
      "Remove alarmist phrasing while preserving accountability.",
      "Keep status concise and timeline-specific.",
    ],
    proposedAction:
      "Edit draft to remove urgency wording and keep neutral status tone.",
    draftMessage:
      "We are actively tracking this and will provide the next update by end of day.",
    conversationContext:
      "Message included wording that could be read as critical escalation.",
    automationRisk: 58,
  },
  {
    id: "esc-1007",
    title: "Message may benefit from clarification",
    summary: "Wording could be interpreted multiple ways",
    agentLabel: "Follow-up Agent",
    intent: "Improve clarity before external send",
    riskRationale:
      "Ambiguous wording can produce inconsistent interpretation across recipients.",
    suggestedActions: [
      "Replace ambiguous terms with concrete scope and ownership.",
      "Use one explicit next-step sentence.",
    ],
    proposedAction:
      "Rewrite the message to clarify scope and ownership before send.",
    draftMessage:
      "We confirmed the request scope and assigned ownership. Next update will include final timing.",
    conversationContext:
      "Current draft blends status and decision language without clear ownership.",
    automationRisk: 52,
  },
];

export const initialRuntimeState: Record<string, EscalationRuntimeState> =
  escalationItems.reduce<Record<string, EscalationRuntimeState>>((acc, item) => {
    acc[item.id] = { status: "active" };
    return acc;
  }, {});
