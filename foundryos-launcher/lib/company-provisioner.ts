import { moltclawDepartments } from "@/lib/moltclaw-departments";

export type ProvisionRequest = {
  template?: string;
  niche?: string;
  target?: string;
};

export function createProvisionPlan(input: ProvisionRequest) {
  const template = input.template ?? "enterprise-hospitality-ai";
  const niche = input.niche ?? "AI company founder installs";
  const target = input.target ?? "HighLevel agency / founder install pipeline";

  return {
    status: "planned",
    template,
    niche,
    target,
    doctrine:
      "FOUNDRYOS/PaperAI decides the company strategy. MoltClaw/HighLevel extends departments into native CRM, workflow, voice, conversation, and agency execution rails.",
    pipeline: {
      name: "FOUNDRYOS Founder Installs",
      stages: [
        "Idea submitted",
        "Qualified",
        "Demo booked",
        "Proposal sent",
        "Payment pending",
        "Install active",
        "Lease conversion",
        "Case study"
      ]
    },
    departments: moltclawDepartments.map((department) => ({
      name: department.name,
      purpose: department.purpose,
      examples: department.examples
    })),
    requiredProof: [
      "pipeline created",
      "template mapped",
      "first opportunity created",
      "demo booking path configured",
      "case study workflow configured",
      "war room event feed connected"
    ],
    nextActions: [
      "Confirm authorised MoltClaw/HighLevel runtime context.",
      "Create or select target agency/sub-account.",
      "Provision Founder Installs pipeline.",
      "Map template to Revenue, Comms, Voice, Ops and Finance departments.",
      "Return proof to War Room."
    ]
  };
}
