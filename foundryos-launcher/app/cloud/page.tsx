import Link from "next/link";
import { listTenants } from "@/lib/tenants";
import { createCloudProvisionPlan } from "@/lib/cloud-provisioner";
import CloudDashboard from "@/components/cloud-dashboard";

export default function CloudPage() {
  const tenants = listTenants();
  const plan = createCloudProvisionPlan({});

  return (
    <main className="container">
      <div className="badge">FOUNDRYOS™ Cloud</div>
      <h1>Tenant control plane.</h1>
      <p>
        FOUNDRYOS Cloud is the first step toward PaperAI companies in the cloud: tenant records,
        isolated runtime plans, Paperclip package attachment, MoltClaw department routing, and
        owner-facing War Room URLs.
      </p>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Default cloud provision plan</h2>
        <pre>{JSON.stringify(plan, null, 2)}</pre>
      </section>

      <section style={{ marginTop: 24 }}>
        <CloudDashboard initialTenants={tenants} />
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Cloud flow</h2>
        <pre>{`signup/payment\n→ tenant record\n→ cloud runtime plan\n→ package attach\n→ MoltClaw routing\n→ War Room URL`}</pre>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to launcher</Link>
      </p>
    </main>
  );
}
