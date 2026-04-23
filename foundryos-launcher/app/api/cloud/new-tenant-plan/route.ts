import { NextRequest, NextResponse } from "next/server";
import { createTenant } from "@/lib/tenants";
import { createCloudProvisionPlan } from "@/lib/cloud-provisioner";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const tenant = await createTenant({
    name: body.name,
    plan: body.plan,
    template: body.template,
    provider: body.provider,
    region: body.region
  });

  return NextResponse.json({
    status: "planned",
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
