import Link from "next/link";
import { productSettings, settingsSummary } from "@/lib/product-settings";

function modeLabel(mode: string) {
  return mode
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function SettingsPage() {
  return (
    <main className="container">
      <div className="badge">FOUNDRYOS™ Control Room</div>
      <h1>Product settings.</h1>
      <p>
        Self-Launch Autopilot and Licence Heartbeat are deployed as first-class settings.
        They default to approval-gated mode: the company can prepare, draft, personalise,
        monitor, and report autonomously, but public/commercial/legal actions require approval.
      </p>

      <section className="grid2" style={{ marginTop: 24 }}>
        {productSettings.map((setting) => (
          <div className="card grid" key={setting.key}>
            <div className="badge">{setting.category}</div>
            <h2>{setting.name}</h2>
            <p>{setting.description}</p>
            <pre>{`key: ${setting.key}\nenabled: ${setting.enabledByDefault}\nmode: ${modeLabel(setting.defaultMode)}\napproval_required: ${setting.approvalRequired}`}</pre>
            <div className="grid">
              {setting.features.map((feature) => (
                <div className="step" key={feature}>
                  <div className="num">✓</div>
                  <div>{feature.replaceAll("_", " ")}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Default launch posture</h2>
        <pre>{JSON.stringify(settingsSummary, null, 2)}</pre>
        <p className="small">
          This is currently a product-control surface and settings registry. Persistent customer-level settings should be backed by the licence/entitlement database when Stripe is wired.
        </p>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Next implementation layer</h2>
        <div className="grid">
          <div className="step"><div className="num">1</div><div>Wire Stripe Entitlements to licence settings.</div></div>
          <div className="step"><div className="num">2</div><div>Add installation-level heartbeat records.</div></div>
          <div className="step"><div className="num">3</div><div>Add approval queue for social, outbound, proposals, payment links, and licence actions.</div></div>
          <div className="step"><div className="num">4</div><div>Add self-launch board report dashboard.</div></div>
        </div>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to launcher</Link>
      </p>
    </main>
  );
}
