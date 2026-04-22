import { connectorLinks, deploymentTargets, companyTemplates } from "@/lib/catalog";

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <div>
          <div className="badge">FOUNDRYOS™ Launcher Alpha</div>
          <h1>One-click company deployment.</h1>
          <p>
            Describe the company, pick the template, connect credentials, install Paperclip,
            wire agent harnesses, import the AI company, deploy locally or to cloud, then lease
            agents or full company setups behind a paywall.
          </p>
          <div className="card">
            <h2>Stand up a company</h2>
            <form action="/api/plan" method="post" className="grid">
              <textarea name="brief" defaultValue={"Build an enterprise hospitality AI company that sells AI concierge, smart minibar ops, procurement automation, venue CRM, brand activation dashboards, proposals, invoicing, and investor-grade reporting."} />
              <select name="template" defaultValue="enterprise-hospitality-ai">
                {companyTemplates.map(t => <option key={t.slug} value={t.slug}>{t.name}</option>)}
              </select>
              <select name="deployTarget" defaultValue="local">
                {deploymentTargets.map(t => <option key={t.slug} value={t.slug}>{t.name}</option>)}
              </select>
              <button type="submit">Generate install plan</button>
            </form>
          </div>
        </div>

        <aside className="card grid">
          <h2>Install sequence</h2>
          {[
            "Check system requirements",
            "Install/validate CLI harnesses",
            "Connect model + revenue credentials",
            "Import FOUNDRYOS company into Paperclip",
            "Install skills into OpenCode / Claude / agent directories",
            "Deploy local, Fly.io, or self-hosted",
            "Enable billing + marketplace access",
            "Start CEO → CRO → RevOps proof loop"
          ].map((s, i) => (
            <div className="step" key={s}>
              <div className="num">{i + 1}</div>
              <div>{s}</div>
            </div>
          ))}
        </aside>
      </section>

      <section className="grid2" style={{ marginTop: 24 }}>
        <div className="card">
          <h2>Connector cockpit</h2>
          <p>Open the exact provider pages where users create keys or authenticate. The launcher stores keys only when the user intentionally provides them.</p>
          <div className="grid">
            {connectorLinks.map(c => (
              <a key={c.name} href={c.url} target="_blank" rel="noreferrer">
                <button className="secondary" style={{ width: "100%" }}>{c.name} → {c.purpose}</button>
              </a>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Deployment targets</h2>
          <p>Local first, then Fly.io for runtime demos, Coolify for self-hosted commercial deployments, and enterprise private cloud later.</p>
          <pre>{`pnpm bootstrap\npnpm import-company\npnpm install-skills\npnpm dev`}</pre>
          <p className="small">
            External sending, invoices, contracts, production deletes, and capital raise material stay behind approval gates.
          </p>
        </div>
      </section>
    </main>
  );
}
