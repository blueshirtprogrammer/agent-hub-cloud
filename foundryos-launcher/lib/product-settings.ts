export type SettingMode = "off" | "draft" | "approval_gated" | "autopilot";
export type ApprovalRoutingMode = "owner_required" | "executive_chain" | "board_agent" | "autonomous_with_limits";

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

export type ApprovalRoute = {
  actionType: string;
  ownerVisible: boolean;
  defaultApprover: "department_head" | "c_suite" | "ceo_agent" | "board_agent" | "human_owner";
  fallbackApprover: "ceo_agent" | "board_agent" | "human_owner";
  autoApprovalLimit: string;
};

export const approvalRouting = {
  mode: "executive_chain" as ApprovalRoutingMode,
  ownerRole: "observer_capital_allocator",
  ownerEscalationOnly: true,
  operatingRule:
    "The owner should watch performance, cash, approvals-by-exception, and Stripe balance. Routine approvals route to department heads, C-suite, CEO Agent, or Board Agent according to policy limits.",
  escalationTriggers: [
    "outside_budget_limit",
    "new_legal_or_regulatory_risk",
    "new_public_claim_category",
    "new_payment_or_refund_policy",
    "contract_over_threshold",
    "licence_suspension_dispute",
    "security_or_credential_change",
    "customer_data_export_or_deletion",
    "capital_raise_or_investor_material",
    "board_agent_deadlock"
  ],
  routes: [
    {
      actionType: "content_asset_draft",
      ownerVisible: true,
      defaultApprover: "department_head",
      fallbackApprover: "c_suite",
      autoApprovalLimit: "Allowed within approved brand, claim, and channel policy."
    },
    {
      actionType: "social_post_publish",
      ownerVisible: true,
      defaultApprover: "c_suite",
      fallbackApprover: "ceo_agent",
      autoApprovalLimit: "Allowed only for pre-approved campaigns, claims, channels, and daily volume caps."
    },
    {
      actionType: "outreach_send",
      ownerVisible: true,
      defaultApprover: "cro_or_revenue_head",
      fallbackApprover: "ceo_agent",
      autoApprovalLimit: "Allowed for approved ICPs, approved sequence, and approved daily send cap."
    },
    {
      actionType: "proposal_send",
      ownerVisible: true,
      defaultApprover: "cfo_or_sales_closer",
      fallbackApprover: "ceo_agent",
      autoApprovalLimit: "Allowed under pricing floor, approved scope, and standard terms."
    },
    {
      actionType: "payment_link_send",
      ownerVisible: true,
      defaultApprover: "cfo_or_sales_closer",
      fallbackApprover: "ceo_agent",
      autoApprovalLimit: "Allowed for approved products, prices, refunds, tax, and fulfilment terms."
    },
    {
      actionType: "licence_feature_change",
      ownerVisible: true,
      defaultApprover: "licence_entitlements_agent",
      fallbackApprover: "board_agent",
      autoApprovalLimit: "Allowed only inside active Stripe entitlement mapping and grace-period policy."
    },
    {
      actionType: "licence_suspension",
      ownerVisible: true,
      defaultApprover: "board_agent",
      fallbackApprover: "human_owner",
      autoApprovalLimit: "Allowed only after grace-period rules, billing notices, and export access preservation are satisfied."
    },
    {
      actionType: "production_deploy",
      ownerVisible: true,
      defaultApprover: "cto_agent",
      fallbackApprover: "ceo_agent",
      autoApprovalLimit: "Allowed for non-destructive deploys with passing checks and rollback plan."
    },
    {
      actionType: "contract_or_custom_terms",
      ownerVisible: true,
      defaultApprover: "board_agent",
      fallbackApprover: "human_owner",
      autoApprovalLimit: "Standard terms only. Non-standard liability, exclusivity, refunds, data, or IP terms escalate."
    }
  ] satisfies ApprovalRoute[]
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
    key: "executive_approval_chain",
    name: "Executive Approval Chain",
    description:
      "Routes approvals to department heads, C-suite agents, CEO Agent, or Board Agent so the owner can operate as investor/observer instead of daily bottleneck.",
    defaultMode: "autopilot",
    recommendedMode: "autopilot",
    category: "governance",
    approvalRequired: false,
    enabledByDefault: true,
    features: [
      "department_head_approvals",
      "c_suite_approval_routing",
      "ceo_agent_escalation",
      "board_agent_governance",
      "owner_observer_mode",
      "policy_based_auto_approval",
      "budget_and_scope_limits",
      "exception_only_human_escalation"
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
      "Routes public posts, outbound campaigns, paid ads, proposals, payment links, contracts, testimonials, revenue claims, or licence suspension changes through the Executive Approval Chain.",
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
  defaultLaunchMode: "L4 executive-chain autopilot with owner observer mode",
  approvalRouting,
  safetyRule:
    "Draft, prepare, personalise, report, and approve within pre-approved policies autonomously. Escalate to the owner only when outside budget, scope, legal, production, security, or customer-impacting limits."
};
