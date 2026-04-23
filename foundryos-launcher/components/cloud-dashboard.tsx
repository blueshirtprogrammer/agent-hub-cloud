"use client";

import { useMemo, useState, useTransition } from "react";

type TenantLifecycle = "created" | "provisioning" | "booting" | "active" | "suspended" | "archived" | "failed";

type TenantRecord = {
  id: string;
  name: string;
  plan: string;
  template: string;
  provider: string;
  region: string;
  lifecycle: TenantLifecycle;
  runtimeUrl: string;
  createdAt: string;
  notes: string[];
};

type Props = {
  initialTenants: TenantRecord[];
};

const lifecycleButtons: TenantLifecycle[] = ["provisioning", "booting", "active", "suspended", "archived", "failed"];

export default function CloudDashboard({ initialTenants }: Props) {
  const [tenants, setTenants] = useState<TenantRecord[]>(initialTenants);
  const [name, setName] = useState("FoundryOS New Company");
  const [plan, setPlan] = useState("founder_install");
  const [template, setTemplate] = useState("enterprise-hospitality-ai");
  const [provider, setProvider] = useState("fly_machines");
  const [region, setRegion] = useState("syd");
  const [message, setMessage] = useState("Ready.");
  const [isPending, startTransition] = useTransition();

  const tenantCount = useMemo(() => tenants.length, [tenants]);

  function createTenant() {
    startTransition(async () => {
      setMessage("Creating tenant plan...");
      const res = await fetch("/api/cloud/new-tenant-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, plan, template, provider, region })
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(`Create failed: ${data.status || res.status}`);
        return;
      }
      setTenants((prev) => [data.tenant, ...prev]);
      setMessage(`Tenant planned: ${data.tenant.name}`);
    });
  }

  function transitionTenant(id: string, lifecycle: TenantLifecycle) {
    startTransition(async () => {
      setMessage(`Updating tenant → ${lifecycle} ...`);
      const res = await fetch(`/api/cloud/tenants/${id}/lifecycle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lifecycle, note: `Lifecycle changed to ${lifecycle} from Cloud dashboard.` })
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(`Update failed: ${data.status || res.status}`);
        return;
      }
      setTenants((prev) => prev.map((tenant) => (tenant.id === id ? data.tenant : tenant)));
      setMessage(`Tenant updated: ${data.tenant.name} → ${data.tenant.lifecycle}`);
    });
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="grid2">
        <div className="card grid">
          <h2>Create tenant</h2>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tenant name" />
          <select value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="founder_install">Founder Install</option>
            <option value="company_lease">Company Lease</option>
            <option value="agency_pro">Agency Pro</option>
            <option value="enterprise_private_foundry">Enterprise Private Foundry</option>
          </select>
          <input value={template} onChange={(e) => setTemplate(e.target.value)} placeholder="Template slug" />
          <select value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option value="fly_machines">Fly Machines</option>
            <option value="coolify_compose">Coolify Compose</option>
            <option value="manual_docker">Manual Docker</option>
          </select>
          <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Region" />
          <button onClick={createTenant} disabled={isPending}>{isPending ? "Working..." : "Create tenant plan"}</button>
          <p className="small">{message}</p>
        </div>
        <div className="card grid">
          <h2>Cloud alpha snapshot</h2>
          <pre>{`tenants: ${tenantCount}\nmode: alpha control plane\nprovider default: ${provider}\nnext move: provider execution + Stripe + persistent DB`}</pre>
        </div>
      </section>

      <section className="card grid">
        <h2>Tenant registry</h2>
        {tenants.map((tenant) => (
          <div className="card grid" key={tenant.id}>
            <div className="badge">{tenant.lifecycle}</div>
            <strong>{tenant.name}</strong>
            <span className="small">{tenant.plan} • {tenant.template} • {tenant.provider} • {tenant.region}</span>
            <span className="small">{tenant.runtimeUrl}</span>
            <div className="grid2">
              {lifecycleButtons.map((lifecycle) => (
                <button key={lifecycle} className="secondary" onClick={() => transitionTenant(tenant.id, lifecycle)} disabled={isPending || tenant.lifecycle === lifecycle}>
                  {lifecycle}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
