# FOUNDRYOS™ Product Settings

## Purpose

Self-Launch Autopilot and Licence Heartbeat are deployed as first-class product settings.

They are enabled by default in approval-gated mode.

## Settings page

```text
/settings
```

## Settings API

```text
/api/settings
```

## Default settings

### Self-Launch Autopilot

```text
key: self_launch_autopilot
enabled: true
mode: approval_gated
```

Purpose:

```text
public URL
5-minute demo
AI video / AI voice assets
social strategy
prospecting
personalised outreach
founder install sales
case studies
lease conversion
board reporting
```

### Licence Heartbeat

```text
key: licence_heartbeat
enabled: true
mode: approval_gated
```

Purpose:

```text
Stripe entitlements
licence activation
heartbeat checks
grace periods
premium template gates
agent heartbeat gates
revenue autopilot gates
hosted runtime controls
```

### Revenue Autopilot

```text
key: revenue_autopilot
enabled: true
mode: approval_gated
```

Purpose:

```text
ICP research
lead sourcing
outreach drafts
reply triage
booking
proposal drafts
invoice drafts
case study loop
```

### Public Action Approval Gates

```text
key: public_action_approvals
enabled: true
mode: approval_gated
```

Purpose:

```text
public posts
outbound campaigns
paid ads
proposals
payment links
contracts
customer claims
testimonials
licence suspension changes
```

## Operating posture

FOUNDRYOS can autonomously:

- prepare,
- draft,
- research,
- personalise,
- monitor,
- report,
- create internal assets,
- recommend next action.

FOUNDRYOS requires approval before:

- public posts,
- outbound sends,
- payment links,
- contracts,
- invoices,
- testimonial use,
- customer claims,
- production changes,
- licence suspension or entitlement changes.

## Next implementation layer

1. Persist customer-level settings in database.
2. Wire Stripe Entitlements to feature gates.
3. Add installation heartbeat records.
4. Add approval queue.
5. Add self-launch board report dashboard.
6. Add content/outreach/case-study task runners.
