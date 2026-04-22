# FOUNDRYOS v0.3.0 - MoltClaw Department Extension

## Release thesis

FOUNDRYOS is the PaperAI company brain.

MoltClaw/HighLevel becomes the native department extension.

This turns GHL skills/actions into agent-to-agent execution rails for company departments.

## What changed

- Added MoltClaw Department Extension docs.
- Added MoltClaw Department Extension skill.
- Added MoltClaw department registry.
- Added visible `/moltclaw` product page.
- Added MoltClaw command surface to homepage.
- Bumped launcher package version to `0.3.0`.

## Strategic model

```text
FOUNDRYOS / PaperAI = company brain
Paperclip = company runtime/control plane
MoltClaw = HighLevel-native execution extension
HighLevel = CRM/workflow/voice/agency ecosystem
```

## Department extensions

```text
Revenue Department → contacts, opportunities, pipelines, bookings
Operations Department → tasks, workflows, onboarding, fulfilment
Comms Department → conversations, SMS/email/chat, transcripts
Voice Department → Voice AI and call outcomes
Finance Department → invoices, payments, products
Agency Deployment Department → sub-accounts, white-label, location rollout
```

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

## Deploy latest version

### Vercel

Import repo:

```text
blueshirtprogrammer/agent-hub-cloud
```

Root directory:

```text
foundryos-launcher
```

Build command:

```text
pnpm build
```

Install command:

```text
pnpm install
```

### Local Docker build

```bash
cd foundryos-launcher
docker build -t foundryos/launcher:0.3.0 .
docker run -p 3000:3000 foundryos/launcher:0.3.0
```

### Docker Hub publish

```bash
docker tag foundryos/launcher:0.3.0 foundryos/launcher:latest
docker push foundryos/launcher:0.3.0
docker push foundryos/launcher:latest
```

## What is still pending

- Public Docker image is not live until pushed.
- Paperclip v2 import ZIP must be regenerated to include all current skills/layers.
- MoltClaw/GHL live execution requires an authorised MoltClaw/HighLevel environment.
- External Marketplace app mode requires official app install/OAuth/review flow.
