import Link from "next/link";

const metrics = [
  ["Cash collected", "$0", "Stripe live once connected"],
  ["MRR", "$0", "leases pending"],
  ["ARR", "$0", "leases pending"],
  ["Founder installs", "0 / 3", "first target"],
  ["Active leases", "0", "convert installs"],
  ["Templates", "3", "hospitality, retail, PM growth"],
  ["Distribution channels", "9", "active roadmap"],
  ["Strategic inbound", "0", "not-for-sale mode"],
  ["Studio submissions", "0", "deal room active"],
  ["Next bottleneck", "Public URL", "Vercel deploy"],
];

export default function WarRoomPage() {
  return (
    <main className="container">
      <div className="badge">FOUNDRYOS™ Owner War Room</div>
      <h1>Watch the machine.</h1>
      <p>
        The owner should not be approving every micro-action. The owner should see cash,
        recurring revenue, installs, leases, strategic gravity, exceptions, and the next move.
      </p>

      <section className="grid2" style={{ marginTop: 24 }}>
        {metrics.map(([name, value, note]) => (
          <div className="card" key={name}>
            <div className="badge">{note}</div>
            <h2>{value}</h2>
            <p>{name}</p>
          </div>
        ))}
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>CEO daily summary</h2>
        <pre>{`Stage: pre-revenue commercial alpha\nPrimary bottleneck: public URL + demo proof\nNext move: deploy Vercel, record 5-minute demo, launch founder install offer\nRevenue target: 3 founder installs at $2,500\nUpside: $7,500 cash + 3 case study paths + lease conversion`}</pre>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Owner posture</h2>
        <pre>{`Owner mode: observer_capital_allocator\nApprovals: exception-only\nRoutine approvals: department head / C-suite / CEO / Board Agent\nPublic posture: not for sale; strategic partnerships considered`}</pre>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to launcher</Link>
      </p>
    </main>
  );
}
