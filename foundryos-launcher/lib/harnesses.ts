export type FoundryHarness = {
  key: string;
  name: string;
  type: string;
  status: "planned" | "spec_ready" | "beta_target" | "active";
  description: string;
  roles: string[];
  guardrails: string[];
};

export const foundryHarnesses: FoundryHarness[] = [
  {
    key: "moltclaw_highlevel",
    name: "MoltClaw / HighLevel Harness",
    type: "crm_voice_workflow_marketplace_harness",
    status: "spec_ready",
    description:
      "Treat MoltClaw / HighLevel AI Employee / Voice AI / Marketplace Apps as a hosted business execution layer for FOUNDRYOS company templates, agency white-label deployment, CRM workflows, voice agents, and client sub-account operations.",
    roles: [
      "HighLevel CRM execution",
      "Voice AI and Conversation AI execution",
      "GHL agency marketplace distribution",
      "Founder install pipeline creation",
      "White-label agency SaaS path",
      "Client sub-account deployment",
      "Call log and transcript ingestion",
      "Workflow and opportunity routing"
    ],
    guardrails: [
      "Use official OAuth and Marketplace app flows only.",
      "Use least-privilege scopes.",
      "Do not scrape sessions, cookies, or browser tokens.",
      "Do not bypass billing, app review, usage limits, or fair-use rules.",
      "Route sensitive writes through Executive Approval Chain.",
      "Use licence heartbeat to control premium FOUNDRYOS features."
    ]
  },
  {
    key: "paperclip_company_runtime",
    name: "Paperclip Company Runtime",
    type: "agent_company_control_plane",
    status: "planned",
    description:
      "Paperclip import target for FOUNDRYOS company packages, org charts, skills, governance, and heartbeat logic.",
    roles: ["company import", "agent org chart", "skills", "governance", "heartbeat"],
    guardrails: ["Regenerate FOUNDRYOS Paperclip v2 ZIP before treating all layers as imported."]
  },
  {
    key: "docker_npm_distribution",
    name: "Docker / npm Distribution Harness",
    type: "developer_install_harness",
    status: "spec_ready",
    description:
      "Make FOUNDRYOS installable through Docker, Docker Compose, and npm package scaffolds.",
    roles: ["local install", "self-hosted deploy", "developer onboarding", "agency technical setup"],
    guardrails: ["Do not publish public commands until images/packages are actually pushed."]
  }
];
