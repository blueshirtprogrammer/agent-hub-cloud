---
name: moltclaw-department-extension
description: Treat MoltClaw/HighLevel as a native department extension for FOUNDRYOS, where PaperAI/C-suite agents delegate execution to HighLevel-native skills and actions.
license: Proprietary
compatibility: openclaw, moltclaw, opencode, claude-code, codex, paperclip
metadata:
  foundryos: "true"
  category: "department-execution-harness"
---

# MoltClaw Department Extension Skill

## Purpose

Use this skill when FOUNDRYOS needs to execute real business operations through MoltClaw/HighLevel.

MoltClaw is treated as a department extension, not a basic integration.

## Model

```text
PaperAI / FOUNDRYOS company brain
→ CEO / C-suite / Department Agent
→ MoltClaw Department Extension
→ HighLevel-native skills and actions
→ CRM, workflows, conversations, voice, billing, calendars, sub-accounts
→ proof returns to War Room
```

## Department routing

### Revenue Department

Use for:

- contacts
- opportunities
- pipelines
- follow-ups
- bookings
- deal stage movement

### Operations Department

Use for:

- tasks
- workflows
- fulfilment steps
- internal routing
- client onboarding

### Comms Department

Use for:

- conversations
- SMS/email/chat
- call logs
- transcript ingestion
- response summaries

### Voice Department

Use for:

- Voice AI agent actions
- inbound call handling
- outbound qualification
- call outcome tracking

### Finance Department

Use for:

- invoices
- products
- payments
- subscription or checkout status where available

### Agency Deployment Department

Use for:

- agency installation
- sub-account deployment
- white-label context
- location-specific rollouts

## Execution pattern

1. FOUNDRYOS decides the goal.
2. Correct department receives the task.
3. MoltClaw executes through HighLevel-native skills.
4. Result is logged.
5. Proof returns to War Room.
6. Strategic Growth Loop learns from result.

## First pipeline

```text
FOUNDRYOS Founder Installs
```

Stages:

```text
Idea submitted
Qualified
Demo booked
Proposal sent
Payment pending
Install active
Lease conversion
Case study
```

## Approval routing

Reads and low-risk status checks can run freely inside authorised context.

Writes route according to Executive Approval Chain:

```text
propose
confirm
execute
log
report
```

## Guardrails

- Use MoltClaw/HighLevel native access only inside authorised locations.
- Do not scrape sessions, cookies, or tokens.
- Do not bypass billing, platform rules, or user permissions.
- Do not touch customer-impacting records without correct policy route.
- Log every material action.
- Preserve licence heartbeat control for premium FOUNDRYOS layers.
