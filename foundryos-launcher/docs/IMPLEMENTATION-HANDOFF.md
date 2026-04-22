# FOUNDRYOS Implementation Handoff

## What now works as executable alpha

### App routes

```text
/
/settings
/war-room
/deal-room
/distribution
/pricing
/investor
/moltclaw
```

### APIs

```text
/api/settings
/api/plan
/api/distribution
/api/war-room
/api/deal-room/score
/api/entitlements/check
/api/company/provision-plan
```

### Runtime logic

```text
lib/entitlements.ts
lib/company-provisioner.ts
lib/moltclaw-departments.ts
lib/harnesses.ts
lib/product-settings.ts
```

### Packaging

```text
npm run paperclip:v2
```

Creates:

```text
runtime/paperclip-v2/
packages/foundryos-paperclip-import-v2.zip
```

if `zip` is available locally.

### Docker

Local:

```bash
docker build -t foundryos/launcher:0.3.0 .
docker run -p 3000:3000 foundryos/launcher:0.3.0
```

Public image requires Docker Hub secrets and workflow run:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

## What is still simulated/planned

- Real Stripe connection.
- Real HighLevel/MoltClaw runtime connection.
- Real Paperclip import execution.
- Real Docker Hub public image until pushed.
- Real GHL Marketplace private app until created in HighLevel.
- Real WordPress.org submission until plugin packaged/reviewed.

## Minimum next credentials

```text
Vercel account connected to repo
Docker Hub username/token
HighLevel agency/MoltClaw runtime access
Stripe account/API keys if monetisation is wired
Paperclip import target/runtime
```

## Latest deploy version

```text
FOUNDRYOS v0.3.0 - MoltClaw Department Extension
```

## Correct public claims

Allowed:

```text
FOUNDRYOS has an executable alpha launcher, visible product surfaces, entitlement check logic, company provision planning, Paperclip v2 packaging script, Docker build workflow, WordPress scaffold, npm scaffold, and MoltClaw department-extension architecture.
```

Not allowed yet:

```text
FOUNDRYOS has live paid customers.
FOUNDRYOS has a public Docker image.
FOUNDRYOS is fully connected to live MoltClaw/GHL runtime.
FOUNDRYOS has live Stripe licence enforcement.
```

## Immediate execution order

1. Deploy Vercel public URL.
2. Run `pnpm install && pnpm build`.
3. Run `npm run paperclip:v2`.
4. Add Docker Hub secrets and run Docker workflow.
5. Create HighLevel/MoltClaw private app/runtime access.
6. Connect first real MoltClaw department action.
7. Connect Stripe products and entitlement mapping.
8. Record 5-minute demo.
9. Sell 3 Founder Installs.
