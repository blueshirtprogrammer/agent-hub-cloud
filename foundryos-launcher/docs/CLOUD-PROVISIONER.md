# FOUNDRYOS Cloud Provisioner

## Purpose

Turn FOUNDRYOS from a local launcher into a cloud-deployable PaperAI/Paperclip company runtime.

The goal:

```text
User signs up
→ licence/payment checked
→ tenant/company workspace created
→ isolated cloud instance provisioned
→ FOUNDRYOS app + Paperclip package + skills + harness registry installed
→ MoltClaw/HighLevel department extension connected when authorised
→ owner gets War Room URL
```

## Important truth

Current v0.3.0 does not automatically download and install Paperclip, IDEs, all harnesses, and MoltClaw into a fresh instance.

Current v0.3.0 has:

- launcher UI
- settings
- runtime APIs
- entitlement logic
- provision plan endpoint
- Paperclip v2 package builder
- Dockerfile
- Docker workflow
- WordPress/npm scaffolds
- MoltClaw department architecture

The Cloud Provisioner is the next layer that makes this PaaS-like.

## Deployment modes

## 1. Local install mode

```text
User clones repo
runs pnpm install
runs pnpm dev or Docker build
runs pnpm paperclip:v2
imports package into Paperclip/PaperAI manually
```

Use for:

- dev
- demos
- agency technical setup
- self-hosted alpha users

## 2. Cloud instance mode

```text
User signs up
FOUNDRYOS creates tenant
FOUNDRYOS provisions isolated cloud instance
FOUNDRYOS boots container image
FOUNDRYOS attaches tenant config
FOUNDRYOS returns hosted War Room URL
```

Use for:

- paid customers
- founder installs
- company leases
- agency clients
- enterprise private foundries

## 3. Cloud control-plane + worker mode

```text
FOUNDRYOS control plane stays central
Each customer/company gets worker/runtime instance
Workers execute safe company tasks
Control plane manages billing, licence, settings, templates, and dashboards
```

This is the recommended scalable architecture.

## Recommended cloud stack

### Control plane

```text
Vercel or Fly.io app
Postgres database
Stripe / entitlement provider
Object storage for packages/artifacts
```

### Runtime workers

```text
Fly Machines or similar per-instance container platform
```

### Self-hosted/private option

```text
Coolify + Docker Compose
```

## Why Fly Machines fits

Fly Machines can create, start, stop, update, and delete fast-launching VMs from a container image.

This matches the per-user/per-company instance model.

## Tenant lifecycle

```text
created
provisioning
booting
active
suspended
archived
failed
```

## Tenant instance contents

Each instance should include:

- FOUNDRYOS launcher app
- tenant config
- entitlement status
- Paperclip v2 package or import folder
- skills registry
- harness registry
- MoltClaw department map
- provision-plan endpoint
- war-room endpoint
- logs/proof artifacts

## Paperclip/PaperAI handling

### If Paperclip is redistributable by us

Package it into the tenant image or install during bootstrap.

### If Paperclip is third-party/proprietary

Do not bundle it without permission.

Instead:

- provide connector/import package
- ask user to connect/import into their authorised Paperclip runtime
- or create a managed Paperclip cloud agreement/licence

## Harness handling

Harnesses should be installed through approved channels only.

Examples:

- MoltClaw/HighLevel: authorised MoltClaw runtime or HighLevel agency context
- Docker/npm: public packages after publishing
- WordPress: plugin ZIP or marketplace install
- Paperclip: import ZIP/package
- Stripe: official keys/webhooks

## Provisioning flow

```text
1. User selects plan
2. Payment/licence status checked
3. Tenant record created
4. Cloud provider instance created
5. Env vars/secrets mounted
6. Container starts
7. Paperclip v2 package generated/copied
8. Skills and harness registry loaded
9. MoltClaw/HighLevel connected if authorised
10. Health check passes
11. War Room URL returned
```

## API endpoints to build

```text
POST /api/cloud/tenants
GET  /api/cloud/tenants/:id
POST /api/cloud/tenants/:id/provision
POST /api/cloud/tenants/:id/suspend
POST /api/cloud/tenants/:id/resume
POST /api/cloud/tenants/:id/archive
GET  /api/cloud/tenants/:id/status
```

## Minimum viable cloud alpha

Do not try to automate every IDE and harness first.

First prove:

```text
signup/payment
→ tenant record
→ container instance
→ hosted War Room
→ entitlement check
→ provision plan
→ Paperclip v2 package available
```

Then add MoltClaw/HighLevel runtime execution.

## Guardrails

- No hidden token/session extraction.
- No unauthorised account creation.
- No bundling proprietary third-party software without permission.
- Use official keys, OAuth, marketplace, or licence flows.
- Keep tenant isolation.
- Keep logs and proof artifacts.
- Allow data export.
- Suspend premium runtime gracefully for non-payment.

## Product name

```text
FOUNDRYOS Cloud
```

## Positioning

```text
PaperAI/Paperclip company runtime in the cloud, wrapped with FOUNDRYOS company templates, licence heartbeat, MoltClaw department extension, and owner War Room.
```
