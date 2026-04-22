# FOUNDRYOS HighLevel AI Employee Harness

## Purpose

Turn HighLevel's hosted AI Employee / Voice AI / Agent Studio capabilities into an approved harness inside the FOUNDRYOS ecosystem.

This is not a replacement for FOUNDRYOS.

It becomes one execution surface inside FOUNDRYOS:

```text
FOUNDRYOS company brain
→ HighLevel CRM / workflows / Voice AI / Conversation AI
→ agency white-label distribution
→ client sub-accounts
→ revenue and booking execution
```

## HighLevel capabilities to harness

### AI Employee

HighLevel AI Employee includes AI products such as Voice AI, Conversation AI, Reviews AI, Content AI, Ask AI, and related features depending on plan and pricing.

### Voice AI

Voice AI agents can be created inside sub-accounts and configured with goals, phone/availability, actions, booking, logs, and call testing.

### Voice AI Public APIs

HighLevel provides Voice AI Public APIs to manage agents/actions, retrieve call logs/transcripts, and connect webhooks.

### Marketplace Apps

HighLevel Marketplace supports OAuth apps. Developers can create Private apps for testing and Public apps for broader marketplace distribution.

### External Authentication

Marketplace apps can use external authentication such as API key, username/password, or OAuth 2.0 for connecting external systems.

### App Installer Details

The App Installer Details API helps identify the installer and agency/sub-account context, including white-label data, so onboarding can be personalised without requesting overly broad OAuth scopes.

## Harness role inside FOUNDRYOS

```text
Harness name: highlevel_ai_employee
Type: CRM / voice / workflow / agency marketplace harness
Primary buyer: GHL agencies and SaaS Pro operators
Primary use: turn FOUNDRYOS company templates into deployable agency AI products
```

## What FOUNDRYOS can use it for

- create agency install path
- push leads into GHL pipelines
- create founder install opportunities
- route calls to Voice AI agents
- book appointments via calendars
- trigger workflows
- retrieve call logs and transcripts
- use AI Employee as customer-facing execution layer
- white-label the experience inside agency/sub-accounts
- create marketplace app distribution

## White-label model

```text
Agency installs FOUNDRYOS app
→ connects FOUNDRYOS licence
→ selects company template
→ app creates GHL pipeline/workflows/assets
→ AI Employee/Voice AI handles inbound communication
→ FOUNDRYOS handles strategy, templates, licensing, deal room, and executive layers
```

## Product offer

```text
FOUNDRYOS for HighLevel Agencies
```

Includes:

- private/public marketplace app
- agency/sub-account install flow
- founder install pipeline
- AI company template selector
- Voice AI / Conversation AI harness mapping
- licence heartbeat
- white-label settings
- affiliate/referral support

## Guardrails

- Use official OAuth and Marketplace app flows.
- Do not scrape HighLevel sessions or tokens.
- Do not bypass billing, usage limits, fair-use policies, or app review.
- Disclose SaaS/licence dependency clearly.
- Keep sensitive actions approval-routed through Executive Approval Chain.
- Use least privilege scopes.

## Build sequence

```text
1. Create HighLevel private Marketplace app
2. Configure OAuth scopes
3. Add External Authentication to FOUNDRYOS
4. Use App Installer Details to identify agency/sub-account context
5. Build installer callback in FOUNDRYOS
6. Create GHL pipeline template: FOUNDRYOS Founder Installs
7. Map company templates to GHL workflows
8. Add Voice AI / Conversation AI harness config
9. Test in one agency account
10. Prepare public Marketplace listing
```

## First GHL pipeline

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

## Strategic thesis

HighLevel becomes the distribution and execution shell for agencies.

FOUNDRYOS becomes the AI company operating system that sits above it.

Together:

```text
HighLevel = CRM / workflow / communications / agency distribution
FOUNDRYOS = company templates / venture intelligence / licence / executive governance / capital studio
```
