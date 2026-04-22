export type CloudProvider = "fly_machines" | "coolify_compose" | "manual_docker";

export type CloudProvisionRequest = {
  tenantName?: string;
  plan?: string;
  provider?: CloudProvider;
  region?: string;
  template?: string;
};

export function createCloudProvisionPlan(input: CloudProvisionRequest) {
  const tenantName = input.tenantName ?? "foundryos-demo-company";
  const plan = input.plan ?? "founder_install";
  const provider = input.provider ?? "fly_machines";
  const region = input.region ?? "syd";
  const template = input.template ?? "enterprise-hospitality-ai";

  return {
    status: "planned",
    version: "0.3.0",
    tenant: {
      name: tenantName,
      plan,
      template,
      lifecycle: "created"
    },
    provider,
    region,
    architecture:
      "Central FOUNDRYOS control plane plus isolated per-tenant/company runtime instances.",
    instance: {
      image: "foundryos/launcher:0.3.0",
      port: 3000,
      healthPath: "/api/runtime/status",
      warRoomPath: "/war-room",
      provisionPath: "/api/company/provision-plan"
    },
    requiredSecrets: [
      "FOUNDRYOS_LICENCE_SECRET",
      "ENTITLEMENTS_PROVIDER_KEY",
      "PAPERCLIP_RUNTIME_URL_OR_IMPORT_TARGET",
      "MOLTCLAW_RUNTIME_CONTEXT_IF_AVAILABLE"
    ],
    bootSequence: [
      "Create tenant record.",
      "Verify entitlement/payment status.",
      "Provision isolated runtime instance.",
      "Attach tenant environment config.",
      "Boot FOUNDRYOS image.",
      "Run runtime status health check.",
      "Generate or attach Paperclip v2 package.",
      "Load skills and harness registry.",
      "Connect MoltClaw/HighLevel context if authorised.",
      "Return tenant War Room URL."
    ],
    guardrails: [
      "No unauthorised bundling of third-party proprietary runtimes.",
      "No hidden token/session extraction.",
      "Use official licence/OAuth/key flows.",
      "Maintain tenant isolation.",
      "Keep data export available.",
      "Suspend premium features gracefully."
    ]
  };
}
