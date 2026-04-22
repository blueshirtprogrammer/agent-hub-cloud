import { NextRequest, NextResponse } from "next/server";
import { createProvisionPlan } from "@/lib/company-provisioner";

export async function GET() {
  return NextResponse.json(createProvisionPlan({}));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json(
    createProvisionPlan({
      template: body.template,
      niche: body.niche,
      target: body.target
    })
  );
}
