# FOUNDRYOS™ Launcher

**One-click autonomous company deployment.**

FOUNDRYOS Launcher is the commercial front-end, installer, marketplace, and deployment console for AI-run company packages.

It lets a user describe what they want to stand up, choose a venture template, connect official credentials, import the company into Paperclip, install the required skills/harnesses, and deploy locally or to cloud.

The goal is not another chatbot dashboard.

The goal is a system that can deploy an AI company with:

- an AI board,
- AI CEO,
- founding C-suite agents,
- revenue autopilot,
- proposal and invoice drafting,
- delivery workflows,
- proof-of-work reporting,
- skill evolution,
- capital-readiness,
- and exit-readiness logic.

## The thesis

Most agent products sell digital workers.

FOUNDRYOS sells something more violent:

> **A company that installs other companies.**

The human is not the daily operator.

The human is:

- owner,
- investor,
- board chair,
- approval authority,
- capital allocator.

The AI company runs the operating system.

## First wedge

Default template:

```text
Enterprise Hospitality AI Company
```

It is designed to sell and deploy:

- AI concierge systems,
- smart minibar and unattended retail operations,
- hotel procurement automation,
- venue CRM and revenue automation,
- supplier/brand activation dashboards,
- proposal, invoice, and delivery workflows,
- board/investor reporting.

This wedge was chosen because it connects directly to real commercial pain: hotels leak guest revenue, procurement is slow, venue upsells are fragmented, and brands want better access to high-value hospitality environments.

## What this does

- Lets a user describe the company they want to stand up.
- Chooses a company template.
- Opens the right official provider dashboards for credentials.
- Supports local, Vercel, Fly.io, and Docker/Coolify-style deployment flows.
- Provides the shell for paid templates, company leasing, agent-hour billing, and enterprise installs.
- Keeps external actions behind approval gates.

## What this does not do

It does not scrape browser sessions, steal tokens, farm free tiers, create fake accounts, or bypass platform controls.

This is built as a commercial product, not a ban magnet.

## Local quick start

```bash
cd foundryos-launcher
pnpm install
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Public URL

Fastest path:

```text
Vercel → Import GitHub repo → Root Directory: foundryos-launcher → Deploy
```

Runtime path:

```text
Fly.io → use fly.toml → add deploy token → run GitHub Actions workflow
```

## Commercial paths

### Self-install template

User buys a company package and installs it locally or to their own infrastructure.

### Company lease

User leases a full AI company setup monthly.

### Agent hours

User buys credits for specialist agents: CEO, CRO, CMO, RevOps, Engineering, Proposal, Finance, Risk, Investor Relations.

### Enterprise private foundry

Custom deployment with SSO, secrets manager, audit logs, private templates, and approved integrations.

## Core assets

- `docs/PITCH.md` — founder/investor/customer pitch.
- `docs/GTM.md` — first 30-day go-to-market sprint.
- `docs/EARN-CAPACITY.md` — immediate revenue paths.
- `docs/SALES-PITCH.md` — discovery, demo, objection handling, and close script.
- `docs/YC-STRESS-TEST.md` — YC-style brutal stress test.
- `skills/yc-stress-test/SKILL.md` — reusable agent skill for stress testing the business.

## Deployment docs

- `docs/PUBLIC-URL.md`
- `docs/DEPLOYMENT.md`
- `docs/CONNECTORS.md`
- `docs/MONETISATION.md`
- `docs/LOCAL-HARNESSES.md`

## Operating law

Every feature, agent, workflow, and template must answer:

```text
Does this move the company closer to cash, proof, leverage, defensibility, or liquidity?
```

If not, kill it.
