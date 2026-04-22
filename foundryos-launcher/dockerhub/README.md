# FOUNDRYOS Launcher Docker Image

## Image

```text
foundryos/launcher:latest
```

## What it is

FOUNDRYOS Launcher is a deployment console for AI-run company packages.

Run the launcher locally or self-hosted, connect official credentials, import company templates, and operate self-launch, revenue, licence, capital studio, venture intelligence, distribution, and acquirer-magnet systems.

## Run

```bash
docker run -p 3000:3000 foundryos/launcher:latest
```

## Docker Compose

```bash
docker compose up -d
```

## Tags

```text
latest
alpha
0.1.0
stable
enterprise
```

## Security

- Do not bake secrets into the image.
- Use environment variables or a secrets manager.
- Mount runtime data as a volume.
- Use official OAuth/API credential flows.
- Keep destructive actions approval-gated.

## Positioning

Deploy AI companies, not AI assistants.
