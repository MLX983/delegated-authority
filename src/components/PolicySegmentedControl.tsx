import type { PolicyStance } from "../state/types";

const policyOptions: PolicyStance[] = ["strict", "balanced", "autonomous"];

interface Props {
  committedPolicy: PolicyStance;
  pendingPolicy: PolicyStance | null;
  onSelect: (policy: PolicyStance) => void;
}

export function PolicySegmentedControl({
  committedPolicy,
  pendingPolicy,
  onSelect,
}: Props) {
  const visualSelectedPolicy = pendingPolicy ?? committedPolicy;

  return (
    <div className="segment-control">
      {policyOptions.map((policy) => {
        const isSelected = policy === visualSelectedPolicy;
        const className = ["segment-button", isSelected ? "is-selected" : ""].join(" ").trim();

        return (
          <button key={policy} className={className} onClick={() => onSelect(policy)}>
            {policy[0].toUpperCase()}
            {policy.slice(1)}
          </button>
        );
      })}
    </div>
  );
}
