import { NextRequest, NextResponse } from "next/server";
import { evaluateEntitlements } from "@/lib/entitlements";

export async function GET() {
  return NextResponse.json(
    evaluateEntitlements({
      status: "trial",
      plan: "demo",
      featuresRequested: ["launcher_ui", "premium_templates"]
    })
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json(
    evaluateEntitlements({
      status: body.status,
      plan: body.plan,
      featuresRequested: body.featuresRequested
    })
  );
}
