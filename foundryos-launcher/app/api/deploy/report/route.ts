import { NextResponse } from "next/server";
import { listTenants } from "@/lib/tenants";

export async function GET() {
  const tenants = listTenants();
  const active = tenants.filter((tenant) => tenant.lifecycle === "active").length;
  const provisioning = tenants.filter((tenant) => tenant.lifecycle === "provisioning" || tenant.lifecycle === "booting").length;
  const suspended = tenants.filter((tenant) => tenant.lifecycle === "suspended").length;
  const failed = tenants.filter((tenant) => tenant.lifecycle === "failed").length;

  return NextResponse.json({
    status: "ok",
    version: "0.3.0",
    deployment: {
      mode: "alpha",
      runtime: "FOUNDRYOS Launcher",
      cloud: "tenant_control_plane",
      reportTime: new Date().toISOString()
    },
    tenants: {
      total: tenants.length,
      active,
      provisioning,
      suspended,
      failed
    },
    nextActions: [
      "Connect persistent database.",
      "Connect Stripe entitlements.",
      "Connect provider execution for Fly/Coolify.",
      "Bind authorised MoltClaw/HighLevel runtime.",
      "Publish Founder Install offer and onboard first customer."
    ]
  });
}
