Build a React front-end prototype for a mobile POC called Delegated Authority.

This is not a production app and has no backend. Use static data and simulated state.

The prototype demonstrates:
Policy → Behavior → Exceptions → Human judgment

Screens:
1. Control Surface
- Policy stance segmented control: Strict / Balanced / Autonomous
- Outcome card that updates based on selected policy
- Escalation queue filtered from the same static dataset based on policy thresholds

2. Escalation Detail
- Shows proposed action, intent, risks, suggested actions, and editable draft message
- Actions: Approve & Send, Edit, Hold
- Links open read-only Policy Detail and Conversation Context sheets
- Edit opens a modal with the draft message

Behavior:
- Policy change should show an apply/cancel preview before committing
- Applying a policy updates both the outcome card and visible queue
- Approve & Send removes the item from the queue and returns to Control Surface
- Edit allows the message to be revised, then Approve & Send removes the item
- Hold returns to Control Surface and keeps the item visible but subtly marked as held
- Use the same static escalation dataset for every policy; do not create separate queues per policy

Keep the scope narrow. Do not add messaging features, authentication, backend logic, notifications, or extra screens.