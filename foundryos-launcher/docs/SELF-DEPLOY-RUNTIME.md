# FOUNDRYOS Self-Deploy Runtime

## Purpose

Turn FOUNDRYOS into a governed system that can improve itself, deploy itself, provision tenant runtimes, install company packages, route execution into MoltClaw departments, and report outcomes.

## Core loop

```text
PaperAI company updates itself
→ deploys itself
→ provisions cloud tenants
→ installs company packages
→ routes execution into MoltClaw departments
→ reports outcome
```

## What this means

FOUNDRYOS is no longer just a launcher.

It becomes:

- company brain,
- deployment control plane,
- tenant provisioner,
- package installer,
- department router,
- reporting layer.

## Runtime architecture

```text
FOUNDRYOS Control Plane
  ↓
Self-Deploy Runtime
  ├── Change Agent
  ├── Build/Test Agent
  ├── Deploy Agent
  ├── Tenant Provisioning Agent
  ├── Package Install Agent
  ├── MoltClaw Department Router
  ├── Outcome Reporting Agent
  └── Rollback Agent
```

## 1. Change Agent

Owns:

- file changes
- template updates
- skill updates
- config updates
- package scaffolds
- product copy changes

Rule:

- low-risk content/config/template changes can flow under policy
- code/runtime/dependency changes require CI and approval chain

## 2. Build/Test Agent

Owns:

- install
- build
- smoke checks
- route checks
- runtime status checks
- API health checks

Required checks:

```text
npm install
npm run build
/api/runtime/status
/api/entitlements/check
/api/company/provision-plan
```

## 3. Deploy Agent

Owns:

- Git-based deploys
- Vercel deploy hooks
- preview deploys
- production deploy recommendation
- deployment URL capture

Preferred pattern:

```text
commit/merge
→ Vercel auto deploy
→ smoke check
→ report to War Room
```

## 4. Tenant Provisioning Agent

Owns:

- tenant creation
- plan selection
- entitlement check
- cloud instance plan
- lifecycle transitions
- runtime URL allocation

Tenant lifecycle:

```text
created
provisioning
booting
active
suspended
archived
failed
```

## 5. Package Install Agent

Owns:

- generate Paperclip v2 package
- attach docs/skills
- install or expose package to tenant runtime
- confirm company template selected
- confirm package readiness

## 6. MoltClaw Department Router

Owns:

- route work into Revenue Department
- route work into Operations Department
- route work into Comms Department
- route work into Voice Department
- route work into Finance Department
- route work into Agency Deployment Department

Rule:

FOUNDRYOS decides. MoltClaw executes.

## 7. Outcome Reporting Agent

Owns:

- deployment status
- tenant status
- pipeline status
- booking status
- payment status
- call/transcript summaries
- case study proof
- war-room update
- board summary

## 8. Rollback Agent

Owns:

- identify failed deploy
- point to last known good version
- recommend rollback
- report blast radius
- preserve audit trail

## Minimum viable self-deploy alpha

```text
change merged
→ Vercel deploys
→ /api/runtime/status passes
→ tenant provision plan exists
→ Paperclip v2 package generated
→ MoltClaw routing plan exists
→ War Room shows deployment status
```

## Required routes

```text
/api/runtime/status
/api/entitlements/check
/api/company/provision-plan
/api/cloud/provision-plan
/api/deploy/recommendation
/api/deploy/report
```

## Guardrails

- no secret scraping
- no hidden tokens in code
- no autonomous legal/commercial action outside policy
- no unauthorised bundling of third-party proprietary runtimes
- no production rollout without health checks
- every material action logged
- rollback path preserved

## Product name

```text
FOUNDRYOS Runtime Cloud
```

## Positioning

```text
A self-improving PaperAI company runtime that can deploy itself, provision tenant companies, install company packages, route execution into MoltClaw departments, and report outcomes to an owner War Room.
```
