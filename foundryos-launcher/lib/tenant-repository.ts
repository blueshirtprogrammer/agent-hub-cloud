import { readCollection, writeCollection } from "@/lib/db";
import type { TenantLifecycle, TenantRecord } from "@/lib/tenants";

const COLLECTION = "tenants";

export function listTenantRecords() {
  return readCollection<TenantRecord[]>(COLLECTION, []);
}

export function saveTenantRecords(records: TenantRecord[]) {
  writeCollection(COLLECTION, records);
}

export function getTenantRecord(id: string) {
  return listTenantRecords().find((record) => record.id === id) ?? null;
}

export function upsertTenantRecord(record: TenantRecord) {
  const records = listTenantRecords();
  const index = records.findIndex((item) => item.id === record.id);
  const next = [...records];

  if (index === -1) {
    next.unshift(record);
  } else {
    next[index] = record;
  }

  saveTenantRecords(next);
  return record;
}

export function transitionTenantRecord(id: string, lifecycle: TenantLifecycle, note?: string) {
  const current = getTenantRecord(id);
  if (!current) return null;

  return upsertTenantRecord({
    ...current,
    lifecycle,
    notes: note ? [...current.notes, note] : current.notes
  });
}
