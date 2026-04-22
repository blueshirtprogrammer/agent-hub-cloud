# Get the Public URL Lit

## Fastest path: Vercel

Vercel is the quickest public URL path for the launcher UI.

1. Go to Vercel.
2. Add New Project.
3. Import Git Repository:

```text
blueshirtprogrammer/agent-hub-cloud
```

4. Set the project root directory to:

```text
foundryos-launcher
```

5. Deploy.

Vercel will build the Next.js app from this subsection and produce a public URL.

## Runtime path: Fly.io

Fly is already configured with:

```text
foundryos-launcher/fly.toml
```

To deploy via GitHub Actions, add the repo secret:

```text
FLY_API_TOKEN
```

Then run the workflow:

```text
Deploy FOUNDRYOS Launcher to Fly
```

## After deployment

Update this file and the README with the live URL.

```text
Public URL: pending
```
