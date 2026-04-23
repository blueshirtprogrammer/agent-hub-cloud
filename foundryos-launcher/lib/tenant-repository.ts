import { readCollection, writeCollection } from "@/lib/db";
import { getPool, hasDatabase } from "@/lib/postgres";
import type { TenantLifecycle, TenantRecord } from "@/lib/tenants";

const COLLECTION = "tenants";
let schemaReady = false;

async function ensureSchema() {
  if (!hasDatabase() || schemaReady) return;

  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS foundryos_tenants (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      plan TEXT NOT NULL,
      template TEXT NOT NULL,
      provider TEXT NOT NULL,
      region TEXT NOT NULL,
      lifecycle TEXT NOT NULL,
      runtime_url TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      notes JSONB NOT NULL DEFAULT '[]'::jsonb
    )
  `);

  schemaReady = true;
}

function fromRow(row: any): TenantRecord {
  return {
    id: row.id,
    name: row.name,
    plan: row.plan,
    template: row.template,
    provider: row.provider,
    region: row.region,
    lifecycle: row.lifecycle,
    runtimeUrl: row.runtime_url,
    createdAt: new Date(row.created_at).toISOString(),
    notes: Array.isArray(row.notes) ? row.notes : []
  };
}

export async function listTenantRecords() {
  if (!hasDatabase()) {
    return readCollection<TenantRecord[]>(COLLECTION, []);
  }

  await ensureSchema();
  const pool = getPool();
  const res = await pool.query(`SELECT * FROM foundryos_tenants ORDER BY created_at DESC`);
  return res.rows.map(fromRow);
}

export async function saveTenantRecords(records: TenantRecord[]) {
  if (!hasDatabase()) {
    writeCollection(COLLECTION, records);
    return records;
  }

  await ensureSchema();
  const pool = getPool();
  await pool.query(`DELETE FROM foundryos_tenants`);

  for (const record of records) {
    await pool.query(
      `INSERT INTO foundryos_tenants (id, name, plan, template, provider, region, lifecycle, runtime_url, created_at, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb)`,
      [
        record.id,
        record.name,
        record.plan,
        record.template,
        record.provider,
        record.region,
        record.lifecycle,
        record.runtimeUrl,
        record.createdAt,
        JSON.stringify(record.notes)
      ]
    );
  }

  return records;
}

export async function getTenantRecord(id: string) {
  if (!hasDatabase()) {
    return (await listTenantRecords()).find((record) => record.id === id) ?? null;
  }

  await ensureSchema();
  const pool = getPool();
  const res = await pool.query(`SELECT * FROM foundryos_tenants WHERE id = $1 LIMIT 1`, [id]);
  return res.rows[0] ? fromRow(res.rows[0]) : null;
}

export async function upsertTenantRecord(record: TenantRecord) {
  if (!hasDatabase()) {
    const records = await listTenantRecords();
    const index = records.findIndex((item) => item.id === record.id);
    const next = [...records];

    if (index === -1) {
      next.unshift(record);
    } else {
      next[index] = record;
    }

    await saveTenantRecords(next);
    return record;
  }

  await ensureSchema();
  const pool = getPool();
  await pool.query(
    `INSERT INTO foundryos_tenants (id, name, plan, template, provider, region, lifecycle, runtime_url, created_at, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb)
     ON CONFLICT (id) DO UPDATE SET
       name = EXCLUDED.name,
       plan = EXCLUDED.plan,
       template = EXCLUDED.template,
       provider = EXCLUDED.provider,
       region = EXCLUDED.region,
       lifecycle = EXCLUDED.lifecycle,
       runtime_url = EXCLUDED.runtime_url,
       created_at = EXCLUDED.created_at,
       notes = EXCLUDED.notes`,
    [
      record.id,
      record.name,
      record.plan,
      record.template,
      record.provider,
      record.region,
      record.lifecycle,
      record.runtimeUrl,
      record.createdAt,
      JSON.stringify(record.notes)
    ]
  );
  return record;
}

export async function transitionTenantRecord(id: string, lifecycle: TenantLifecycle, note?: string) {
  const current = await getTenantRecord(id);
  if (!current) return null;

  return upsertTenantRecord({
    ...current,
    lifecycle,
    notes: note ? [...current.notes, note] : current.notes
  });
}
