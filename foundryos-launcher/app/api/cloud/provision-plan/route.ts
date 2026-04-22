import { NextRequest, NextResponse } from "next/server";
import { createCloudProvisionPlan } from "@/lib/cloud-provisioner";

export async function GET() {
  return NextResponse.json(createCloudProvisionPlan({}));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json(
    createCloudProvisionPlan({
      tenantName: body.tenantName,
      plan: body.plan,
      provider: body.provider,
      region: body.region,
      template: body.template
    })
  );
}
