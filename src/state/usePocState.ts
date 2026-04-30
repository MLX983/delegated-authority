import { useEffect, useMemo, useRef, useState } from "react";
import { escalationItems, initialRuntimeState } from "./escalationData";
import { getOutcome, getVisibleQueue, getVisibleQueueCount } from "./derived";
import type { EscalationRuntimeState, PolicyStance } from "./types";

type ScreenView = "control-surface" | "escalation-detail";

export function usePocState() {
  const pauseBeforeSendTimeoutRef = useRef<number | null>(null);
  const sendTransitionTimeoutRef = useRef<number | null>(null);
  const [screenView, setScreenView] = useState<ScreenView>("control-surface");
  const [committedPolicy, setCommittedPolicy] = useState<PolicyStance>("balanced");
  const [pendingPolicy, setPendingPolicy] = useState<PolicyStance | null>(null);
  const [selectedEscalationId, setSelectedEscalationId] = useState<string | null>(null);
  const [runtimeById, setRuntimeById] =
    useState<Record<string, EscalationRuntimeState>>(initialRuntimeState);
  const [isPolicyDetailOpen, setPolicyDetailOpen] = useState(false);
  const [isConversationContextOpen, setConversationContextOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [modalDraftText, setModalDraftText] = useState("");

  const queue = useMemo(
    () => getVisibleQueue(escalationItems, runtimeById, committedPolicy),
    [runtimeById, committedPolicy],
  );

  const queueCount = getVisibleQueueCount(queue);
  const outcome = getOutcome(committedPolicy);
  const selectedItem =
    selectedEscalationId == null
      ? null
      : queue.find((entry) => entry.item.id === selectedEscalationId) ?? null;

  useEffect(() => {
    return () => {
      if (pauseBeforeSendTimeoutRef.current != null) {
        window.clearTimeout(pauseBeforeSendTimeoutRef.current);
      }
      if (sendTransitionTimeoutRef.current != null) {
        window.clearTimeout(sendTransitionTimeoutRef.current);
      }
    };
  }, []);

  function tapPolicy(nextPolicy: PolicyStance) {
    if (nextPolicy === committedPolicy) {
      setPendingPolicy(null);
      return;
    }
    setPendingPolicy(nextPolicy);
  }

  function applyPendingPolicy() {
    if (pendingPolicy == null) return;
    if (pauseBeforeSendTimeoutRef.current != null) {
      window.clearTimeout(pauseBeforeSendTimeoutRef.current);
      pauseBeforeSendTimeoutRef.current = null;
    }
    if (sendTransitionTimeoutRef.current != null) {
      window.clearTimeout(sendTransitionTimeoutRef.current);
      sendTransitionTimeoutRef.current = null;
    }
    setRuntimeById(initialRuntimeState);
    setCommittedPolicy(pendingPolicy);
    setPendingPolicy(null);
  }

  function cancelPendingPolicy() {
    setPendingPolicy(null);
  }

  function openEscalationDetail(id: string) {
    setSelectedEscalationId(id);
    setScreenView("escalation-detail");
  }

  function returnToControlSurface() {
    setEditModalOpen(false);
    setModalDraftText("");
    setConversationContextOpen(false);
    setPolicyDetailOpen(false);
    setSelectedEscalationId(null);
    setScreenView("control-surface");
  }

  function applyHoldWithoutNavigate() {
    if (selectedEscalationId == null) return;
    setRuntimeById((prev) => ({
      ...prev,
      [selectedEscalationId]: {
        ...prev[selectedEscalationId],
        status: "held",
      },
    }));
  }

  function holdSelectedEscalation() {
    applyHoldWithoutNavigate();
    returnToControlSurface();
  }

  function scheduleEscalationSendSequence(escalationIdToSend: string, messageToSend: string) {
    if (pauseBeforeSendTimeoutRef.current != null) {
      window.clearTimeout(pauseBeforeSendTimeoutRef.current);
    }
    if (sendTransitionTimeoutRef.current != null) {
      window.clearTimeout(sendTransitionTimeoutRef.current);
    }

    // Wait 300ms on Screen 1 (full list visible), then fade/collapse over 900ms.
    pauseBeforeSendTimeoutRef.current = window.setTimeout(() => {
      pauseBeforeSendTimeoutRef.current = null;
      setRuntimeById((prev) => ({
        ...prev,
        [escalationIdToSend]: {
          ...prev[escalationIdToSend],
          status: "sending",
          sentMessage: messageToSend,
        },
      }));

      sendTransitionTimeoutRef.current = window.setTimeout(() => {
        sendTransitionTimeoutRef.current = null;
        setRuntimeById((prev) => ({
          ...prev,
          [escalationIdToSend]: {
            ...prev[escalationIdToSend],
            status: "sent",
            sentMessage: messageToSend,
          },
        }));
      }, 930);
    }, 300);
  }

  function approveAndSendSelectedEscalation() {
    if (selectedEscalationId == null) return;
    const escalationIdToSend = selectedEscalationId;
    const messageToSend = isEditModalOpen
      ? modalDraftText
      : (selectedItem?.currentDraftMessage ?? "");
    returnToControlSurface();
    scheduleEscalationSendSequence(escalationIdToSend, messageToSend);
  }

  function openEditModal() {
    if (selectedItem == null) return;
    setModalDraftText(selectedItem.currentDraftMessage);
    setEditModalOpen(true);
  }

  function cancelEditModal() {
    setModalDraftText("");
    setEditModalOpen(false);
  }

  return {
    screenView,
    committedPolicy,
    pendingPolicy,
    queue,
    queueCount,
    outcome,
    selectedItem,
    isPolicyDetailOpen,
    isConversationContextOpen,
    isEditModalOpen,
    modalDraftText,
    setModalDraftText,
    setPolicyDetailOpen,
    setConversationContextOpen,
    tapPolicy,
    applyPendingPolicy,
    cancelPendingPolicy,
    openEscalationDetail,
    returnToControlSurface,
    holdSelectedEscalation,
    applyHoldWithoutNavigate,
    approveAndSendSelectedEscalation,
    scheduleEscalationSendSequence,
    openEditModal,
    cancelEditModal,
  };
}
