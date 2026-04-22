export type SettingMode = "off" | "draft" | "approval_gated" | "autopilot";
export type ApprovalRoutingMode = "owner_required" | "executive_chain" | "board_agent" | "autonomous_with_limits";

export type ProductSetting = {
  key: string;
  name: string;
  description: string;
  defaultMode: SettingMode;
  recommendedMode: SettingMode;
  category: "launch" | "licensing" | "revenue" | "governance" | "strategy" | "venture" | "capital";
  approvalRequired: boolean;
  enabledByDefault: boolean;
  features: string[];
};

export type ApprovalRoute = {
  actionType: string;
  ownerVisible: boolean;
  defaultApprover: string;
  fallbackApprover: string;
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
    key: "acquirer_magnet_layer",
    name: "Acquirer Magnet Layer",
    description:
      "Builds strategic gravity, acquirer mapping, scarcity narrative, partnerships, moat compounding, and not-for-sale posture so FOUNDRYOS is pursued rather than shopped.",
    defaultMode: "autopilot",
    recommendedMode: "autopilot",
    category: "capital",
    approvalRequired: true,
    enabledByDefault: true,
    features: [
      "strategic_gravity_agent",
      "acquirer_mapping_agent",
      "scarcity_narrative_agent",
      "enterprise_partnership_agent",
      "platform_partnership_agent",
      "strategic_investor_agent",
      "moat_compounding_agent",
      "competitive_intelligence_agent",
      "not_for_sale_negotiation_agent"
    ]
  },
  {
    key: "capital_studio_layer",
    name: "Capital Studio Layer",
    description:
      "Lets founders bring ideas, capital, distribution, or domain insight into an AI investment-committee flow where FOUNDRYOS evaluates, structures, spawns, and operates ventures as an AI co-founder/studio partner.",
    defaultMode: "autopilot",
    recommendedMode: "autopilot",
    category: "capital",
    approvalRequired: true,
    enabledByDefault: true,
    features: [
      "deal_intake_agent",
      "founder_interview_agent",
      "ai_investment_committee",
      "due_diligence_agent",
      "venture_structuring_agent",
      "term_sheet_agent",
      "operator_cofounder_agent",
      "studio_portfolio_agent",
      "portfolio_growth_agent",
      "exit_path_agent"
    ]
  },
  {
    key: "venture_intelligence_layer",
    name: "Venture Intelligence Layer",
    description:
      "Lets FOUNDRYOS operate like an autonomous venture studio: detect market signals, simulate ventures, spawn company packages, run micro-tests, compound proof, and decide scale/pause/kill.",
    defaultMode: "autopilot",
    recommendedMode: "autopilot",
    category: "venture",
    approvalRequired: false,
    enabledByDefault: true,
    features: [
      "market_radar_agent",
      "venture_simulation_agent",
      "capital_allocator_agent",
      "company_spawner_agent",
      "synthetic_customer_council",
      "proof_factory_agent",
      "founder_narrative_agent",
      "m_and_a_radar_agent",
      "hive_court_agent"
    ]
  },
  {
    key: "strategic_growth_loop",
    name: "Strategic Growth Loop",
    description:
      "Lets FOUNDRYOS observe itself, dream strategically, set goals, design experiments, improve skills, and move toward proof, revenue, recurring customers, and exit readiness without waiting for owner prompts.",
    defaultMode: "autopilot",
    recommendedMode: "autopilot",
    category: "strategy",
    approvalRequired: false,
    enabledByDefault: true,
    features: [
      "chief_strategy_agent",
      "goal_architect",
      "experiment_designer",
      "monetisation_stage_tracking",
      "self_improvement_agent",
      "skill_evolution",
      "weekly_dream_memo",
      "owner_summary_by_exception"
    ]
  },
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
  defaultLaunchMode: "L4 executive-chain autopilot with owner observer mode, not-for-sale strategic gravity, capital studio, strategic self-evolution, and venture intelligence",
  approvalRouting,
  safetyRule:
    "Dream, detect opportunities, simulate ventures, evaluate founder deals, build strategic gravity, structure partnerships, set goals, draft, prepare, personalise, report, improve skills, and approve within pre-approved policies autonomously. Escalate to the owner and legal review for acquisition talks, securities, capital, non-standard contracts, regulated activity, or customer-impacting limits."
};
