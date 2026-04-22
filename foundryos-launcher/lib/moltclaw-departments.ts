export const moltclawDepartments = [
  {
    name: "Revenue Department",
    purpose: "Use HighLevel contacts, opportunities, pipelines, bookings, and follow-up workflows for revenue execution.",
    examples: ["contacts", "opportunities", "pipelines", "bookings", "follow-ups"]
  },
  {
    name: "Operations Department",
    purpose: "Use HighLevel tasks, workflows, fulfilment routing, and onboarding steps for delivery execution.",
    examples: ["tasks", "workflows", "client onboarding", "fulfilment steps"]
  },
  {
    name: "Comms Department",
    purpose: "Use conversations, SMS/email/chat, call logs, transcript summaries, and response workflows.",
    examples: ["conversations", "SMS", "email", "chat", "transcripts"]
  },
  {
    name: "Voice Department",
    purpose: "Use Voice AI and call outcomes as live qualification, support, and customer proof channels.",
    examples: ["Voice AI", "call outcomes", "inbound calls", "qualification"]
  },
  {
    name: "Finance Department",
    purpose: "Use invoices, products, payments, and subscription signals where available through the HighLevel/MoltClaw stack.",
    examples: ["invoices", "payments", "products", "subscription status"]
  },
  {
    name: "Agency Deployment Department",
    purpose: "Use agency/sub-account context, white-label deployment, and location-level execution for partner rollout.",
    examples: ["sub-accounts", "white-label", "agency install", "location rollout"]
  }
];

export const moltclawExecutionModel = {
  version: "0.3.0",
  name: "MoltClaw Department Extension",
  doctrine:
    "FOUNDRYOS/PaperAI controls the company brain. MoltClaw/HighLevel extends the departments into real CRM, voice, workflow, and agency execution rails.",
  firstPipeline: [
    "Idea submitted",
    "Qualified",
    "Demo booked",
    "Proposal sent",
    "Payment pending",
    "Install active",
    "Lease conversion",
    "Case study"
  ]
};
