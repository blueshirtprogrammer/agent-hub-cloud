import { NextResponse } from "next/server";
import { productSettings, settingsSummary } from "@/lib/product-settings";

export async function GET() {
  return NextResponse.json({
    status: "configured",
    summary: settingsSummary,
    settings: productSettings,
    note:
      "These settings are deployed as product defaults. Persistent customer-specific settings should be backed by the licence/entitlement database when Stripe is wired."
  });
}
