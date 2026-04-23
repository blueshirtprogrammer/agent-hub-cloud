import type { CloudProvider } from "@/lib/cloud-provisioner";

export type ProviderPlan = {
  provider: CloudProvider;
  name: string;
  mode: string;
  bestFor: string[];
  provisionSteps: string[];
  requiredSecrets: string[];
  notes: string[];
};

export const providerPlans: Record<CloudProvider, ProviderPlan> = {
  fly_machines: {
    provider: "fly_machines",
    name: "Fly Machines",
    mode: "per_tenant_machine",
    bestFor: ["fast per-tenant runtime instances", "PaaS-style hosted companies", "isolated alpha tenants"],
    provisionSteps: [
      "Create or select Fly app.",
      "Create Machine from foundryos/launcher image.",
      "Attach tenant env vars.",
      "Expose port 3000.",
      "Run health check /api/runtime/status.",
      "Return tenant URL."
    ],
    requiredSecrets: ["FLY_API_TOKEN"],
    notes: ["Best first provider for hosted runtime alpha."]
  },
  coolify_compose: {
    provider: "coolify_compose",
    name: "Coolify Compose",
    mode: "self_hosted_stack",
    bestFor: ["self-hosted customers", "private infrastructure", "agency-owned runtime clusters"],
    provisionSteps: [
      "Prepare Docker Compose service.",
      "Attach env vars/secrets.",
      "Deploy stack to project/environment.",
      "Run health check /api/runtime/status.",
      "Return tenant URL."
    ],
    requiredSecrets: ["COOLIFY_API_TOKEN", "COOLIFY_PROJECT_ID"],
    notes: ["Best for self-hosted or private deployments."]
  },
  manual_docker: {
    provider: "manual_docker",
    name: "Manual Docker",
    mode: "manual_runtime",
    bestFor: ["local installs", "technical agency setup", "controlled demos"],
    provisionSteps: [
      "Build or pull foundryos/launcher image.",
      "Run container on chosen host.",
      "Attach env vars.",
      "Expose port 3000.",
      "Run health check /api/runtime/status."
    ],
    requiredSecrets: [],
    notes: ["Fallback/manual mode; not true PaaS automation."]
  }
};

export function getProviderPlan(provider: CloudProvider) {
  return providerPlans[provider];
}

export function listProviderPlans() {
  return Object.values(providerPlans);
}
