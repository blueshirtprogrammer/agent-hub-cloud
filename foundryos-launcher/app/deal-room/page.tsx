import Link from "next/link";

const scoreItems = [
  "Founder quality",
  "Market pain",
  "Buyer access",
  "Speed to first revenue",
  "Automation leverage",
  "Distribution advantage",
  "Margin potential",
  "Recurring revenue potential",
  "Defensibility",
  "Exit potential"
];

export default function DealRoomPage() {
  return (
    <main className="container">
      <div className="badge">FOUNDRYOS™ Capital Studio</div>
      <h1>Studio deal room.</h1>
      <p>
        Founders bring ideas, capital, distribution, domain insight, data, or assets.
        FOUNDRYOS runs intake, founder interview, AI investment committee, venture structure,
        company spawning, market test, and portfolio tracking.
      </p>

      <section className="grid2" style={{ marginTop: 24 }}>
        <div className="card grid">
          <h2>Submit venture idea</h2>
          <form action="/api/deal-room/score" method="post" className="grid">
            <input name="founder" placeholder="Founder / company" />
            <input name="market" placeholder="Market / niche" />
            <textarea name="idea" placeholder="What should FOUNDRYOS co-build?" />
            <textarea name="contribution" placeholder="What does the founder contribute? Capital, access, data, IP, distribution, expertise..." />
            <select name="desiredStructure" defaultValue="hybrid">
              <option value="paid_install">Paid install</option>
              <option value="licence">Licence deal</option>
              <option value="revenue_share">Revenue share</option>
              <option value="studio_equity">Studio equity</option>
              <option value="hybrid">Hybrid cash + upside</option>
            </select>
            <button type="submit">Run AI investment committee</button>
          </form>
        </div>

        <div className="card grid">
          <h2>Deal scorecard</h2>
          {scoreItems.map((item, index) => (
            <div className="step" key={item}>
              <div className="num">{index + 1}</div>
              <div>{item}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Committee outcomes</h2>
        <pre>{`Reject\nResearch more\nPaid install only\nRun micro-test\nAccept as licence deal\nAccept as revenue-share deal\nAccept as studio venture candidate`}</pre>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to launcher</Link>
      </p>
    </main>
  );
}
