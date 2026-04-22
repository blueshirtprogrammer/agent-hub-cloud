export type LicenceStatus = "trial" | "active" | "past_due" | "grace" | "suspended" | "cancelled" | "enterprise_override";

export type EntitlementRequest = {
  status?: LicenceStatus;
  plan?: string;
  featuresRequested?: string[];
};

export const featureByPlan: Record<string, string[]> = {
  demo: ["launcher_ui", "basic_install_plan", "demo_templates"],
  founder_install: [
    "launcher_ui",
    "basic_install_plan",
    "one_company_template",
    "basic_skills",
    "connector_cockpit",
    "deal_room"
  ],
  company_lease: [
    "premium_templates",
    "agent_heartbeats",
    "revenue_autopilot",
    "proposal_invoice_workflows",
    "premium_skills",
    "hosted_runtime",
    "deal_room",
    "war_room"
  ],
  agency_pro: [
    "premium_templates",
    "agent_heartbeats",
    "revenue_autopilot",
    "premium_skills",
    "hosted_runtime",
    "white_label_agency",
    "moltclaw_department_extension",
    "distribution_supremacy"
  ],
  enterprise_private_foundry: [
    "premium_templates",
    "agent_heartbeats",
    "revenue_autopilot",
    "premium_skills",
    "hosted_runtime",
    "white_label_agency",
    "moltclaw_department_extension",
    "capital_studio",
    "venture_intelligence",
    "enterprise_governance",
    "private_templates"
  ]
};

export function evaluateEntitlements(input: EntitlementRequest) {
  const status = input.status ?? "trial";
  const plan = input.plan ?? "demo";
  const planFeatures = featureByPlan[plan] ?? featureByPlan.demo;
  const requested = input.featuresRequested ?? [];
  const allowed = status === "active" || status === "trial" || status === "enterprise_override";
  const suspended = status === "suspended" || status === "cancelled";
  const pastDue = status === "past_due" || status === "grace";

  return {
    status,
    plan,
    allowed,
    pastDue,
    suspended,
    entitlements: suspended ? ["data_export"] : planFeatures,
    denied: requested.filter((feature) => !planFeatures.includes(feature)),
    message: suspended
      ? "Premium access is suspended. Data export remains available."
      : pastDue
        ? "Account is past due or in grace. Premium access may be limited after grace period."
        : allowed
          ? "Entitlements active."
          : "Demo access only."
  };
}
