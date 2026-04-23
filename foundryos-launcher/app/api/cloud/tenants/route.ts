import { NextResponse } from "next/server";
import { listTenants } from "@/lib/tenants";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    tenants: await listTenants()
  });
}
