import { NextRequest, NextResponse } from "next/server";
import { getTenant } from "@/lib/tenants";
import { createCloudProvisionPlan } from "@/lib/cloud-provisioner";

export async function GET(_: NextRequest, context: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await context.params;
  const tenant = await getTenant(tenantId);

  if (!tenant) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    status: "ok",
    tenant,
    cloudPlan: createCloudProvisionPlan({
      tenantName: tenant.name,
      plan: tenant.plan,
      provider: tenant.provider as any,
      region: tenant.region,
      template: tenant.template
    })
  });
}
