import Link from "next/link";

const plans = [
  ["Self-Install", "$297-$997", "Template access, docs, local install path, basic skills."],
  ["Founder Install", "$2,500", "Done-with-you install, first company template, revenue sprint, proof workflow."],
  ["Company Lease", "$999+/mo", "Premium templates, licence heartbeat, revenue autopilot, hosted runtime path."],
  ["Agency Pro", "$2,500+/mo", "White-label agency launcher, GHL pipeline, reseller economics, client templates."],
  ["Enterprise Private Foundry", "$10k-$25k+/mo", "Private deployment, governance, custom templates, support, enterprise onboarding."],
  ["Capital Studio", "Custom", "Equity, rev-share, licence, hybrid, or operating partner structures after review."]
];

export default function PricingPage() {
  return (
    <main className="container">
      <div className="badge">FOUNDRYOS™ Commercial Model</div>
      <h1>Start with cash. Compound into platform value.</h1>
      <p>
        FOUNDRYOS begins with founder installs and company leases, then expands into agency,
        enterprise, marketplace, and capital studio economics.
      </p>

      <section className="grid2" style={{ marginTop: 24 }}>
        {plans.map(([name, price, body]) => (
          <div className="card grid" key={name}>
            <div className="badge">{price}</div>
            <h2>{name}</h2>
            <p>{body}</p>
          </div>
        ))}
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>First target</h2>
        <pre>{`3 founder installs at $2,500 = $7,500 cash\nThen convert installs into $999+/mo company leases\n10 leases = ~$10k MRR / ~$120k ARR`}</pre>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to launcher</Link>
      </p>
    </main>
  );
}
