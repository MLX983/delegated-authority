Functionality Details

Core model
- This is a static-data React prototype with simulated behavior.
- There is no backend, authentication, API, notification system, or real message sending.
- All policy states use the same underlying escalation dataset.
- Changing policy changes thresholds and visible outcomes, not the source data.

Policy behavior
- Policy stance has three states: Strict, Balanced, Autonomous.
- Tapping a different policy shows an Apply / Cancel confirmation before the policy is committed.
- Applying a policy updates:
  1. Outcome card
  2. Escalation count
  3. Visible escalation queue
- Cancel returns to the previous selected policy.

Queue behavior
- Queue items are derived from the same static dataset.
- Items may be active, held, or sent.
- Sent items are removed from the visible queue.
- Held items remain visible but are visually de-emphasized and marked as held.
- Queue count should reflect active + held visible items, unless otherwise specified.

Escalation detail
- Tapping a queue item opens its detail screen.
- Detail shows the selected item’s proposed action, intent, risk rationale, suggested actions, and message draft.
- View policy detail opens a read-only bottom sheet.
- View conversation context opens a read-only bottom sheet.

Actions
- Approve & Send marks the item as sent, removes it from the queue, and returns to Screen 1.
- Edit opens a modal with the current draft message.
- Approve & Send from the edit modal uses the edited message, marks the item as sent, removes it from the queue, and returns to Screen 1.
- Cancel in the edit modal closes the modal without changing the message.
- Hold marks the item as held, returns to Screen 1, and keeps the item visible in a subdued state.