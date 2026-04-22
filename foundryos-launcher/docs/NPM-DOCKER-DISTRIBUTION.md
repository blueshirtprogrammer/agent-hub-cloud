# FOUNDRYOS npm and Docker Distribution

## npm packages

Recommended packages:

```text
@foundryos/launcher
@foundryos/client
@foundryos/skills
@foundryos/company-kit
```

## npm first package

```text
@foundryos/launcher
```

Purpose:

- install launcher CLI
- scaffold company package
- call settings API
- check licence status
- install skills
- generate deal room template

Commands:

```bash
npx @foundryos/launcher init
npx @foundryos/launcher install-company
npx @foundryos/launcher install-skills
npx @foundryos/launcher status
npx @foundryos/launcher spawn
```

## Docker image

Recommended image:

```text
foundryos/launcher:latest
```

Run:

```bash
docker run -p 3000:3000 foundryos/launcher:latest
```

Docker Compose:

```bash
docker compose up -d
```

## Docker listing copy

```text
FOUNDRYOS Launcher is a deployment console for AI-run company packages. Run the launcher locally or self-hosted, connect official credentials, import company templates, and operate self-launch, revenue, licence, capital studio, and venture intelligence layers.
```

## Release tags

```text
latest
alpha
0.1.0
stable
enterprise
```

## Security notes

- Do not bake secrets into Docker images.
- Use environment variables or secret managers.
- Keep local runtime data mounted as a volume.
- Use official OAuth/API flows.
- Keep destructive actions approval-gated.
