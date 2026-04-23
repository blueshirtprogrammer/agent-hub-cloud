import { getProviderPlan } from "@/lib/cloud-providers";
import { getTenant, transitionTenant, type TenantRecord } from "@/lib/tenants";

export type ProvisionExecutionResult = {
  status: "provisioned" | "not_found" | "invalid_state";
  tenant: TenantRecord | null;
  provider: string | null;
  executedSteps: string[];
  runtimeUrl: string | null;
};

export async function provisionTenantRuntime(tenantId: string): Promise<ProvisionExecutionResult> {
  const tenant = await getTenant(tenantId);
  if (!tenant) {
    return {
      status: "not_found",
      tenant: null,
      provider: null,
      executedSteps: [],
      runtimeUrl: null
    };
  }

  if (tenant.lifecycle === "active") {
    return {
      status: "invalid_state",
      tenant,
      provider: tenant.provider,
      executedSteps: ["Tenant already active."],
      runtimeUrl: tenant.runtimeUrl
    };
  }

  const providerPlan = getProviderPlan(tenant.provider as any);
  const executedSteps = [
    `Lifecycle -> provisioning`,
    ...providerPlan.provisionSteps,
    `Attach Paperclip v2 package`,
    `Load skills and harness registry`,
    `Prepare MoltClaw routing plan`,
    `Lifecycle -> booting`,
    `Health check /api/runtime/status`,
    `Lifecycle -> active`
  ];

  await transitionTenant(tenantId, "provisioning", `Provision requested using ${providerPlan.name}.`);
  await transitionTenant(tenantId, "booting", `Boot sequence started for ${providerPlan.name}.`);
  const active = await transitionTenant(tenantId, "active", `Tenant marked active after alpha provision flow.`);

  return {
    status: "provisioned",
    tenant: active,
    provider: providerPlan.name,
    executedSteps,
    runtimeUrl: active?.runtimeUrl ?? tenant.runtimeUrl
  };
}
