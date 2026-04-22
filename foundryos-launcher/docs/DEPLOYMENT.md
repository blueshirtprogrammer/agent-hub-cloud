# FOUNDRYOS Launcher Deployment

## Current location

```text
blueshirtprogrammer/agent-hub-cloud/foundryos-launcher
```

## Local

```bash
cd foundryos-launcher
pnpm install
pnpm dev
```

## Docker

```bash
cd foundryos-launcher
docker compose up -d
```

Local app:

```text
http://localhost:3000
```

Local test inbox via Mailpit:

```text
http://localhost:8025
```

## Fly.io

From inside `foundryos-launcher`:

```bash
fly launch --copy-config --no-deploy
fly deploy
```

## GitHub Actions deploy

Add a GitHub Actions repository secret named:

```text
FLY_API_TOKEN
```

Then push changes under `foundryos-launcher/` to `main`.

## Vercel

For the public marketplace UI, import the repository into Vercel and set the project root to:

```text
foundryos-launcher
```

## Recommended architecture

```text
Vercel: public launcher, marketplace, checkout, onboarding
Fly.io: runtime demos and hosted launcher workers
Coolify: self-hosted commercial deployments
Enterprise: private cloud, SSO, secrets manager, audit logs
```
