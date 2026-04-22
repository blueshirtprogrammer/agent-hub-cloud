import Link from "next/link";
import { connectorLinks, deploymentTargets, companyTemplates } from "@/lib/catalog";

const commandLinks = [
  ["Owner War Room", "/war-room", "Cash, MRR, installs, leases, bottlenecks."],
  ["MoltClaw", "/moltclaw", "Department extension for HighLevel-native execution."],
  ["Studio Deal Room", "/deal-room", "Founder ideas, AI investment committee, venture structures."],
  ["Distribution", "/distribution", "WordPress, npm, Docker, AWS, GHL, Product Hunt, affiliates."],
  ["Pricing", "/pricing", "Founder installs, leases, agency, enterprise, studio economics."],
  ["Investor", "/investor", "Pre-seed category narrative and platform thesis."],
  ["Settings", "/settings", "Autopilot layers, licence heartbeat, approval chain."],
];

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <div>
          <div className="badge">FOUNDRYOS™ v0.3.0 / MoltClaw Department Extension</div>
          <h1>Deploy AI companies, not AI assistants.</h1>
          <p>
            Describe the company, pick the template, connect credentials, install Paperclip,
            wire agent harnesses, import the AI company, and extend each department into
            MoltClaw/HighLevel execution rails for CRM, voice, workflows, bookings, and agency rollout.
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
          <h2>Command surfaces</h2>
          {commandLinks.map(([label, href, description], i) => (
            <Link href={href} key={href}>
              <button className={i === 0 ? undefined : "secondary"} style={{ width: "100%", textAlign: "left" }}>
                {label}<br />
                <span className="small">{description}</span>
              </button>
            </Link>
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
            External sending, invoices, contracts, production deletes, and capital raise material route through executive approval chains.
          </p>
        </div>
      </section>
    </main>
  );
}
