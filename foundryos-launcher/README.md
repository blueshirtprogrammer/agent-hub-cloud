# FOUNDRYOS™ Launcher

One-click installer, marketplace, deployment console, credential connector, and billing shell for FOUNDRYOS agent companies.

This lives as a contained subsection inside `agent-hub-cloud` so the existing repo stays intact.

## What this does

- Lets a user describe the company they want to stand up.
- Chooses a company template.
- Installs/validates local tools.
- Imports the FOUNDRYOS Paperclip company package.
- Installs agent skills into local coding-agent directories.
- Opens provider dashboards for legitimate credential creation.
- Supports local, Fly.io, Docker/Coolify-style deployment flows.
- Forms the base for paid templates, company leasing, agent-hour billing, and enterprise installs.

## What this does not do

It does not scrape browser sessions, steal tokens, farm free tiers, create fake accounts, or bypass platform controls. This is built as a commercial product, not a ban magnet.

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

## Bootstrap

```bash
pnpm bootstrap
```

## Deployment

Fly.io config is included via `fly.toml`.

For GitHub Actions deployment, add this repo secret:

```text
FLY_API_TOKEN
```

Then push to `main`. The workflow at `.github/workflows/foundryos-launcher-fly.yml` will deploy from this folder.

## Package import

Place the generated company ZIP here:

```text
foundryos-launcher/packages/foundryos-paperclip-import.zip
```

Then run:

```bash
pnpm import-company
pnpm install-skills
```
