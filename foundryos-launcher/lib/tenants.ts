import { listTenantRecords, saveTenantRecords, getTenantRecord, transitionTenantRecord } from "@/lib/tenant-repository";

export type TenantLifecycle = "created" | "provisioning" | "booting" | "active" | "suspended" | "archived" | "failed";

export type TenantRecord = {
  id: string;
  name: string;
  plan: string;
  template: string;
  provider: string;
  region: string;
  lifecycle: TenantLifecycle;
  runtimeUrl: string;
  createdAt: string;
  notes: string[];
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40) || "tenant";
}

function nowIso() {
  return new Date().toISOString();
}

function mockRuntimeUrl(id: string) {
  return `https://${id}.foundryos-cloud.local`;
}

async function ensureSeedTenant() {
  const records = await listTenantRecords();
  if (records.length) return records;

  const seed = await createTenant({
    name: "FoundryOS Demo Agency",
    plan: "founder_install",
    template: "enterprise-hospitality-ai",
    provider: "fly_machines",
    region: "syd"
  });

  return [seed];
}

export async function createTenant(input: Partial<Pick<TenantRecord, "name" | "plan" | "template" | "provider" | "region">>) {
  const records = await listTenantRecords();
  const id = `tnt_${slugify(input.name ?? "foundryos-demo")}_${Date.now().toString(36)}`;
  const record: TenantRecord = {
    id,
    name: input.name ?? "FoundryOS Demo Company",
    plan: input.plan ?? "founder_install",
    template: input.template ?? "enterprise-hospitality-ai",
    provider: input.provider ?? "fly_machines",
    region: input.region ?? "syd",
    lifecycle: "created",
    runtimeUrl: mockRuntimeUrl(id),
    createdAt: nowIso(),
    notes: [
      "Tenant created.",
      "Provisioning plan pending execution.",
      "Paperclip v2 package should be attached before activation."
    ]
  };

  await saveTenantRecords([record, ...records]);
  return record;
}

export async function listTenants() {
  return (await ensureSeedTenant()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getTenant(id: string) {
  return (await getTenantRecord(id)) ?? null;
}

export async function transitionTenant(id: string, lifecycle: TenantLifecycle, note?: string) {
  return transitionTenantRecord(id, lifecycle, note);
}
