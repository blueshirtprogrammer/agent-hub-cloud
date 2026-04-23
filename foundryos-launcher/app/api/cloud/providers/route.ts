import { NextResponse } from "next/server";
import { listProviderPlans } from "@/lib/cloud-providers";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    providers: listProviderPlans()
  });
}
