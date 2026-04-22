import { NextResponse } from "next/server";
import { foundryHarnesses } from "@/lib/harnesses";

export async function GET() {
  return NextResponse.json({
    status: "configured",
    doctrine:
      "FOUNDRYOS sits above specialised harnesses. MoltClaw/HighLevel is the CRM, voice, workflow, marketplace and agency-distribution harness.",
    harnesses: foundryHarnesses
  });
}
