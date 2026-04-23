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
    key: "openagent_internal",
    name: "Oh My OpenAgent Harness",
    type: "internal_operator_swarm_harness",
    status: "spec_ready",
    description:
      "Treat Oh My OpenAgent as the internal operator swarm for coding, research, multi-agent planning, repo execution, model orchestration, and self-improvement proposals inside FOUNDRYOS.",
    roles: [
      "Internal operator swarm",
      "Code and repo execution",
      "Research and synthesis",
      "Multi-agent planning",
      "Model and skill orchestration",
      "Template generation",
      "Self-improvement proposals"
    ],
    guardrails: [
      "Keep OpenAgent focused on internal product, research, and execution work.",
      "Route customer-facing CRM work to MoltClaw/HighLevel.",
      "Do not treat OpenAgent as the company board or final approval chain.",
      "Verify code and deployment outputs before production rollout."
    ]
  },
  {
    key: "orgo_computer_use",
    name: "Orgo Computer-Use Harness",
    type: "cloud_desktop_worker_harness",
    status: "spec_ready",
    description:
      "Treat Orgo as the cloud desktop and computer-use worker layer for browser, GUI, and multi-application tasks that should run in isolated cloud environments instead of on an operator laptop.",
    roles: [
      "Cloud desktop workers",
      "Browser and GUI execution",
      "Computer-use automation",
      "Visual proof capture",
      "Persistent worker sessions",
      "Multi-application task execution"
    ],
    guardrails: [
      "Use isolated cloud workspaces only.",
      "Do not run hidden or unauthorised account actions.",
      "Prefer official API, SDK, and workspace controls.",
      "Route strategic decision-making back to FOUNDRYOS/PaperAI."
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
