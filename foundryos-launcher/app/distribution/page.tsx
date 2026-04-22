import Link from "next/link";

const channels = [
  ["Vercel", "Public launcher URL", "Priority 1"],
  ["Product Hunt", "Launch page, demo, maker comment", "Priority 1"],
  ["Docker Hub", "foundryos/launcher image", "Priority 1"],
  ["npm", "@foundryos/launcher CLI", "Priority 1"],
  ["HighLevel", "Agency Company Launcher app", "Priority 2"],
  ["WordPress", "Plugin + venture studio theme", "Priority 2"],
  ["Skill marketplaces", "FOUNDRYOS skill packs", "Priority 2"],
  ["AWS Marketplace", "Private Foundry SaaS/container", "Priority 3"],
  ["Affiliates", "Founder install referral program", "Priority 1"]
];

export default function DistributionPage() {
  return (
    <main className="container">
      <div className="badge">FOUNDRYOS™ Distribution Supremacy</div>
      <h1>Distribution control room.</h1>
      <p>
        FOUNDRYOS should not depend on one website. It should be installable, purchasable,
        white-labelable, and discoverable across marketplaces, package registries, plugins,
        cloud deploy paths, affiliates, and agency ecosystems.
      </p>

      <section className="grid2" style={{ marginTop: 24 }}>
        {channels.map(([channel, product, status]) => (
          <div className="card grid" key={channel}>
            <div className="badge">{status}</div>
            <h2>{channel}</h2>
            <p>{product}</p>
            <pre>{`channel: ${channel}\nasset: ${product}\nstatus: ${status}`}</pre>
          </div>
        ))}
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>7-day channel sprint</h2>
        <div className="grid">
          <div className="step"><div className="num">1</div><div>Public URL + Product Hunt launch assets.</div></div>
          <div className="step"><div className="num">2</div><div>Docker image and npm CLI scaffold.</div></div>
          <div className="step"><div className="num">3</div><div>Affiliate founder install page and swipe copy.</div></div>
          <div className="step"><div className="num">4</div><div>HighLevel private app spec and install flow.</div></div>
          <div className="step"><div className="num">5</div><div>WordPress plugin and venture studio theme scaffold.</div></div>
          <div className="step"><div className="num">6</div><div>Skill marketplace bundle.</div></div>
          <div className="step"><div className="num">7</div><div>AWS readiness pack and enterprise procurement memo.</div></div>
        </div>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to launcher</Link>
      </p>
    </main>
  );
}
