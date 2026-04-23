import { NextRequest, NextResponse } from "next/server";
import { provisionTenantRuntime } from "@/lib/provider-executor";

export async function POST(_: NextRequest, context: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await context.params;
  const result = await provisionTenantRuntime(tenantId);

  if (result.status === "not_found") {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  if (result.status === "invalid_state") {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result);
}
