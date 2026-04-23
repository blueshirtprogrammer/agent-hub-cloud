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

function ensureSeedTenant() {
  const records = listTenantRecords();
  if (records.length) return records;

  const seed = createTenant({
    name: "FoundryOS Demo Agency",
    plan: "founder_install",
    template: "enterprise-hospitality-ai",
    provider: "fly_machines",
    region: "syd"
  });

  return [seed];
}

export function createTenant(input: Partial<Pick<TenantRecord, "name" | "plan" | "template" | "provider" | "region">>) {
  const records = listTenantRecords();
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

  saveTenantRecords([record, ...records]);
  return record;
}

export function listTenants() {
  return ensureSeedTenant().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getTenant(id: string) {
  return getTenantRecord(id) ?? null;
}

export function transitionTenant(id: string, lifecycle: TenantLifecycle, note?: string) {
  return transitionTenantRecord(id, lifecycle, note);
}
