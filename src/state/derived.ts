import { getOutcomeCardModel, shouldEscalate } from "./policyRules";
import type {
  EscalationItem,
  EscalationRuntimeState,
  OutcomeCardModel,
  PolicyStance,
} from "./types";

export interface DetailItemViewModel {
  item: EscalationItem;
  status: EscalationRuntimeState["status"];
  currentDraftMessage: string;
}

export function getVisibleQueue(
  items: EscalationItem[],
  runtimeById: Record<string, EscalationRuntimeState>,
  committedPolicy: PolicyStance,
  pinnedHeldEscalationId: string | null = null,
): DetailItemViewModel[] {
  return items
    .filter((item) => shouldEscalate(item, committedPolicy))
    .filter((item) => runtimeById[item.id]?.status !== "sent")
    .map((item) => ({
      item,
      status: runtimeById[item.id]?.status ?? "active",
      currentDraftMessage: runtimeById[item.id]?.sentMessage ?? item.draftMessage,
    }))
    .sort((a, b) => {
      const aIsPinnedHeld = a.item.id === pinnedHeldEscalationId && a.status === "held";
      const bIsPinnedHeld = b.item.id === pinnedHeldEscalationId && b.status === "held";

      if (aIsPinnedHeld !== bIsPinnedHeld) {
        return aIsPinnedHeld ? -1 : 1;
      }
      if (a.status === b.status) return 0;
      if (a.status === "held") return 1;
      if (b.status === "held") return -1;
      return 0;
    });
}

export function getVisibleQueueCount(viewModels: DetailItemViewModel[]): number {
  return viewModels.filter(
    (entry) =>
      entry.status === "active" ||
      entry.status === "held" ||
      entry.status === "sending",
  ).length;
}

export function getOutcome(policy: PolicyStance): OutcomeCardModel {
  return getOutcomeCardModel(policy);
}
