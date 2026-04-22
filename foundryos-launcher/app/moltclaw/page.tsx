import Link from "next/link";
import { moltclawDepartments, moltclawExecutionModel } from "@/lib/moltclaw-departments";

export default function MoltClawPage() {
  return (
    <main className="container">
      <div className="badge">FOUNDRYOS™ v0.3.0</div>
      <h1>MoltClaw Department Extension.</h1>
      <p>
        FOUNDRYOS/PaperAI controls the company brain. MoltClaw/HighLevel extends each
        department into native CRM, workflow, voice, conversation, billing, agency, and
        sub-account execution rails.
      </p>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Execution model</h2>
        <pre>{JSON.stringify(moltclawExecutionModel, null, 2)}</pre>
      </section>

      <section className="grid2" style={{ marginTop: 24 }}>
        {moltclawDepartments.map((department) => (
          <div className="card grid" key={department.name}>
            <div className="badge">Department extension</div>
            <h2>{department.name}</h2>
            <p>{department.purpose}</p>
            <pre>{department.examples.join("\n")}</pre>
          </div>
        ))}
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Agent-to-agent flow</h2>
        <pre>{`CRO Agent decides sales motion\n→ MoltClaw Revenue Agent executes GHL pipeline/opportunity actions\n→ Voice/Conversation agents interact with leads\n→ Outcomes return to FOUNDRYOS War Room\n→ Strategic Growth Loop improves the company`}</pre>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to launcher</Link>
      </p>
    </main>
  );
}
