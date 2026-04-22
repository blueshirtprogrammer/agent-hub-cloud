import { NextResponse } from "next/server";

const channels = [
  { channel: "Vercel", product: "Public launcher URL", priority: 1, status: "ready_for_user_deploy" },
  { channel: "Product Hunt", product: "Launch page assets", priority: 1, status: "assets_scaffolded" },
  { channel: "Docker Hub", product: "foundryos/launcher image", priority: 1, status: "dockerfile_ready" },
  { channel: "npm", product: "@foundryos/launcher CLI", priority: 1, status: "scaffold_needed" },
  { channel: "HighLevel", product: "Agency Company Launcher app", priority: 2, status: "spec_ready" },
  { channel: "WordPress", product: "Plugin + theme", priority: 2, status: "scaffold_needed" },
  { channel: "AWS Marketplace", product: "Private Foundry SaaS/container", priority: 3, status: "readiness_pack_ready" },
  { channel: "Affiliates", product: "Founder install referral program", priority: 1, status: "spec_ready" }
];

export async function GET() {
  return NextResponse.json({
    status: "configured",
    doctrine: "One product, many install surfaces, one licence heartbeat, one company operating layer.",
    channels
  });
}
