export type SettingMode = "off" | "draft" | "approval_gated" | "autopilot";

export type ProductSetting = {
  key: string;
  name: string;
  description: string;
  defaultMode: SettingMode;
  recommendedMode: SettingMode;
  category: "launch" | "licensing" | "revenue" | "governance";
  approvalRequired: boolean;
  enabledByDefault: boolean;
  features: string[];
};

export const productSettings: ProductSetting[] = [
  {
    key: "self_launch_autopilot",
    name: "Self-Launch Autopilot",
    description:
      "Launches FOUNDRYOS itself: public URL, demo assets, social strategy, prospecting, outreach drafts, founder installs, case studies, lease conversion, and board reporting.",
    defaultMode: "approval_gated",
    recommendedMode: "approval_gated",
    category: "launch",
    approvalRequired: true,
    enabledByDefault: true,
    features: [
      "public_url_status",
      "demo_producer",
      "ai_video_agent",
      "ai_voice_agent",
      "social_strategy",
      "prospecting",
      "personalised_outreach",
      "founder_install_sales",
      "case_studies",
      "lease_conversion"
    ]
  },
  {
    key: "licence_heartbeat",
    name: "Licence Heartbeat",
    description:
      "Checks paid entitlements and gracefully controls access to premium templates, agent heartbeats, revenue autopilot, premium skills, hosted runtime, and company leases.",
    defaultMode: "approval_gated",
    recommendedMode: "approval_gated",
    category: "licensing",
    approvalRequired: true,
    enabledByDefault: true,
    features: [
      "stripe_entitlements",
      "licence_activation",
      "heartbeat_check",
      "grace_periods",
      "premium_template_gate",
      "agent_heartbeat_gate",
      "revenue_autopilot_gate",
      "data_export_preserved"
    ]
  },
  {
    key: "revenue_autopilot",
    name: "Revenue Autopilot",
    description:
      "Moves from ICP to lead list, outreach draft, reply triage, booked call, proposal, invoice draft, delivery, and case study.",
    defaultMode: "approval_gated",
    recommendedMode: "approval_gated",
    category: "revenue",
    approvalRequired: true,
    enabledByDefault: true,
    features: [
      "icp_research",
      "lead_sourcing",
      "outreach_drafts",
      "reply_triage",
      "booking",
      "proposal_drafts",
      "invoice_drafts",
      "case_study_loop"
    ]
  },
  {
    key: "public_action_approvals",
    name: "Public Action Approval Gates",
    description:
      "Requires approval before public posts, outbound campaigns, paid ads, proposals, payment links, contracts, testimonials, revenue claims, or licence suspension changes.",
    defaultMode: "approval_gated",
    recommendedMode: "approval_gated",
    category: "governance",
    approvalRequired: false,
    enabledByDefault: true,
    features: [
      "public_post_approval",
      "outbound_approval",
      "proposal_approval",
      "payment_link_approval",
      "testimonial_approval",
      "licence_suspension_approval"
    ]
  }
];

export const settingsSummary = {
  enabled: productSettings.filter((setting) => setting.enabledByDefault).map((setting) => setting.key),
  defaultLaunchMode: "L3/L4 approval-gated autopilot",
  safetyRule:
    "Draft, prepare, personalise, and report autonomously. Require approval before public, financial, legal, production, or customer-impacting actions."
};
