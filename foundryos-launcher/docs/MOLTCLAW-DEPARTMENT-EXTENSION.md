# FOUNDRYOS MoltClaw Department Extension

## Purpose

MoltClaw is not just an integration.

It becomes a department extension layer for FOUNDRYOS.

FOUNDRYOS/PaperAI controls company strategy, goals, org chart, monetisation, licensing, growth, governance, and venture creation.

MoltClaw/HighLevel executes CRM, workflow, voice, conversations, pipelines, calendars, invoicing, payments, tasks, channels, and sub-account actions.

## Core architecture

```text
FOUNDRYOS / PaperAI Company Brain
  ↓
CEO / C-suite / Department Agents
  ↓
Harness Router
  ↓
MoltClaw Department Extension
  ↓
HighLevel-native skills and actions
  ↓
Contacts, opportunities, calendars, conversations, invoices, payments, voice AI, workflows, tasks, forms, funnels, client sub-accounts
```

## Why this is different

Most integrations require the app to wire every API one by one.

MoltClaw changes this because HighLevel skills are already part of the runtime.

That means FOUNDRYOS can treat MoltClaw as an execution department rather than a disconnected third-party API.

## Department model

```text
Revenue Department
  → opportunities, contacts, pipelines, outreach, bookings

Operations Department
  → tasks, workflows, fulfilment, internal updates

Finance Department
  → invoices, payments, products, subscription signals

Comms Department
  → conversations, SMS/email/chat, call logs, transcripts

Voice Department
  → Voice AI agents, phone routing, call outcomes

Agency Deployment Department
  → sub-account installs, white-label agency rollout
```

## Agent-to-agent model

The company brain does not manually operate HighLevel.

Instead:

```text
CRO Agent decides sales motion
→ MoltClaw Revenue Agent executes GHL pipeline/opportunity actions
→ Conversation/Voice agents interact with leads
→ Outcomes return to FOUNDRYOS War Room
→ Strategic Growth Loop improves the company
```

## First execution target

```text
FOUNDRYOS Founder Installs Pipeline
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

## What FOUNDRYOS owns

- company templates
- org chart
- strategy
- self-launch autopilot
- capital studio
- venture intelligence
- acquirer magnet
- distribution supremacy
- licence heartbeat
- pricing and packaging
- owner war room
- executive approval chain

## What MoltClaw owns

- HighLevel execution skills
- CRM actions
- workflow actions
- conversations
- calendars
- Voice AI
- invoices and payments where available
- contact/opportunity updates
- sub-account/agency runtime
- operator dashboards
- rollback and production controls where supported

## What returns to FOUNDRYOS

- lead status
- opportunity stage
- booking status
- call outcome
- transcript summary
- payment status
- customer proof
- case study data
- workflow health
- agency/sub-account performance

## Guardrails

- MoltClaw executes only inside authorised HighLevel contexts.
- FOUNDRYOS does not scrape sessions, browser tokens, or hidden credentials.
- Writes should follow propose → confirm → execute patterns where required.
- Sensitive changes route through Executive Approval Chain.
- Licence heartbeat controls premium FOUNDRYOS layers.
- Customer-impacting actions must be logged and reportable.

## Latest deployment version

```text
FOUNDRYOS v0.3.0 - MoltClaw Department Extension
```

## Deployment goal

Ship FOUNDRYOS as the company brain, with MoltClaw as the HighLevel-native department extension.

The result:

```text
Company brain + execution departments + agency distribution + licence monetisation + venture studio upside
```
