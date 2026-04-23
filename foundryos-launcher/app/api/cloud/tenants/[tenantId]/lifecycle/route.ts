import { NextRequest, NextResponse } from "next/server";
import { getTenant, transitionTenant, type TenantLifecycle } from "@/lib/tenants";

const allowed: TenantLifecycle[] = [
  "created",
  "provisioning",
  "booting",
  "active",
  "suspended",
  "archived",
  "failed"
];

export async function POST(req: NextRequest, context: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await context.params;
  const existing = await getTenant(tenantId);

  if (!existing) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  const body = await req.json().catch(() => ({}));
  const requested = typeof body.lifecycle === "string" ? body.lifecycle : "provisioning";
  const note = typeof body.note === "string" ? body.note : `Lifecycle changed to ${requested}.`;

  if (!allowed.includes(requested as TenantLifecycle)) {
    return NextResponse.json(
      { status: "invalid_lifecycle", allowed },
      { status: 400 }
    );
  }

  const updated = await transitionTenant(tenantId, requested as TenantLifecycle, note);

  return NextResponse.json({
    status: "updated",
    tenant: updated
  });
}
