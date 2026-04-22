import Link from "next/link";

const sections = [
  ["Category", "AI company operating system", "Deploy AI companies, not AI assistants."],
  ["Wedge", "Founder installs + company leases", "Start service-led, convert to recurring software economics."],
  ["Platform", "Templates + skills + runtime + marketplace", "Every install compounds reusable assets."],
  ["Expansion", "Capital studio + venture intelligence", "Founders bring ideas; FOUNDRYOS co-builds and tracks portfolio upside."],
  ["Distribution", "WordPress, npm, Docker, AWS, GHL, Product Hunt", "Multiple install and buying surfaces."],
  ["Moat", "Operating data + skill library + templates", "The system improves with every venture, install, and objection."],
  ["Posture", "Not for sale", "Strategic partnerships considered, acquisition interest tracked not chased."]
];

export default function InvestorPage() {
  return (
    <main className="container">
      <div className="badge">FOUNDRYOS™ Pre-Seed Narrative</div>
      <h1>AI companies, not AI assistants.</h1>
      <p>
        FOUNDRYOS is an operating layer for deployable AI companies: launcher, templates,
        skills, executive approval chain, licence heartbeat, revenue autopilot, capital studio,
        venture intelligence, and distribution supremacy.
      </p>

      <section className="grid2" style={{ marginTop: 24 }}>
        {sections.map(([title, headline, body]) => (
          <div className="card grid" key={title}>
            <div className="badge">{title}</div>
            <h2>{headline}</h2>
            <p>{body}</p>
          </div>
        ))}
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Why this can become venture-scale</h2>
        <pre>{`1. Every deployed company creates reusable templates, skills, and data.\n2. Distribution is multi-surface: plugin, package, marketplace, cloud, agency, enterprise.\n3. Revenue begins with founder installs, then compounds into leases and studio economics.\n4. Strategic gravity grows through proof, templates, enterprise governance, and portfolio intelligence.\n5. The owner operates as capital allocator while the company self-launches and improves.`}</pre>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Pre-seed ask placeholder</h2>
        <pre>{`Raise: TBD\nUse of funds: public URL, demo, 3 founder installs, licence heartbeat, distribution channels, first marketplace launch\nTarget proof: 3 paid installs → 1-3 company leases → repeatable marketplace template`}</pre>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to launcher</Link>
      </p>
    </main>
  );
}
