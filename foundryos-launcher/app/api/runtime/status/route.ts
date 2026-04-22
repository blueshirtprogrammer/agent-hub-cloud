import { NextResponse } from "next/server";
import { productSettings, settingsSummary } from "@/lib/product-settings";
import { foundryHarnesses } from "@/lib/harnesses";

export async function GET() {
  return NextResponse.json({
    status: "runtime_alpha_ready",
    version: "0.3.0",
    product: "FOUNDRYOS Launcher",
    doctrine: "Deploy AI companies, not AI assistants.",
    settingsEnabled: settingsSummary.enabled,
    settingsCount: productSettings.length,
    harnesses: foundryHarnesses.map((harness) => ({
      key: harness.key,
      name: harness.name,
      status: harness.status,
      type: harness.type
    })),
    nextRequiredActions: [
      "Deploy public Vercel URL",
      "Build and test Docker image",
      "Run pnpm paperclip:v2",
      "Connect authorised MoltClaw/HighLevel runtime",
      "Connect Stripe or entitlement provider",
      "Sell first Founder Install"
    ]
  });
}
