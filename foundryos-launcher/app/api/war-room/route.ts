import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "commercial_alpha",
    stage: "pre_revenue_public_url_pending",
    metrics: {
      cashCollected: 0,
      mrr: 0,
      arr: 0,
      founderInstallsSold: 0,
      founderInstallTarget: 3,
      activeLeases: 0,
      templates: 3,
      distributionChannels: 9,
      strategicInbound: 0,
      studioSubmissions: 0
    },
    nextMove: "Deploy public URL, record 5-minute demo, launch founder install offer.",
    ownerMode: "observer_capital_allocator",
    publicPosture: "not_for_sale_strategic_partnerships_considered"
  });
}
