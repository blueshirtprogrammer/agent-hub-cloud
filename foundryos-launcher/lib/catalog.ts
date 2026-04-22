export const companyTemplates = [
  {
    slug: "enterprise-hospitality-ai",
    name: "Enterprise Hospitality AI Company",
    description: "AI concierge, smart minibar ops, procurement automation, venue CRM, supplier portals, retail media."
  },
  {
    slug: "unattended-retail-media-network",
    name: "Unattended Retail Media Network",
    description: "Vending, smart fridges, DOOH, brand activation, route density, sponsor inventory."
  },
  {
    slug: "property-management-growth-company",
    name: "Property Management Growth Company",
    description: "Owner lead sourcing, rent roll acquisition, PM pipeline, appraisal booking, proposals."
  }
];

export const deploymentTargets = [
  {
    slug: "local",
    name: "Local machine / founder laptop",
    command: "pnpm dev"
  },
  {
    slug: "fly",
    name: "Fly.io",
    command: "fly launch --copy-config --no-deploy && fly deploy"
  },
  {
    slug: "coolify",
    name: "Coolify / self-hosted VPS",
    command: "docker compose up -d"
  }
];

export const connectorLinks = [
  { name: "OpenRouter", purpose: "model routing key", url: "https://openrouter.ai/settings/keys" },
  { name: "OpenAI / Codex", purpose: "API + Codex access", url: "https://platform.openai.com/api-keys" },
  { name: "GitHub", purpose: "repo token", url: "https://github.com/settings/tokens" },
  { name: "Stripe", purpose: "billing + subscriptions", url: "https://dashboard.stripe.com/apikeys" },
  { name: "Resend", purpose: "agent inbox + inbound email", url: "https://resend.com/api-keys" },
  { name: "Fly.io", purpose: "deploy token", url: "https://fly.io/user/personal_access_tokens" }
];
