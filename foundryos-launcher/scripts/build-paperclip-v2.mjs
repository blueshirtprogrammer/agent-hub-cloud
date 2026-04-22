import { mkdir, rm, cp, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "runtime", "paperclip-v2");
const packageDir = path.join(root, "packages");
const zipPath = path.join(packageDir, "foundryos-paperclip-import-v2.zip");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await mkdir(packageDir, { recursive: true });

const companyFiles = {
  "COMPANY.md": `# FOUNDRYOS MetaCompany\n\nFOUNDRYOS is the PaperAI company brain for creating, launching, licensing, and scaling AI companies.\n\n## Core posture\n\nDeploy AI companies, not AI assistants.\n`,
  "ORG_CHART.md": `# FOUNDRYOS Org Chart\n\n- CEO Agent\n- Chief Strategy Agent\n- CRO Agent\n- CMO Agent\n- CTO Agent\n- CFO Agent\n- COO Agent\n- Board Agent\n- MoltClaw Department Extension\n`,
  "HEARTBEAT.md": `# Heartbeat\n\nDaily: check public URL, revenue, licences, deal room, distribution, MoltClaw department proof, and next bottleneck.\n`,
  "TOOLS.md": `# Tools and Harnesses\n\n- Paperclip / PaperAI company runtime\n- MoltClaw / HighLevel department extension\n- Docker / npm distribution\n- WordPress plugin/theme\n- Stripe or entitlement provider\n`
};

for (const [file, content] of Object.entries(companyFiles)) {
  await writeFile(path.join(outDir, file), content, "utf8");
}

const skillsSrc = path.join(root, "skills");
const skillsDest = path.join(outDir, "skills");
if (existsSync(skillsSrc)) {
  await cp(skillsSrc, skillsDest, { recursive: true });
}

const docsSrc = path.join(root, "docs");
const docsDest = path.join(outDir, "docs");
if (existsSync(docsSrc)) {
  await cp(docsSrc, docsDest, { recursive: true });
}

try {
  execFileSync("zip", ["-qr", zipPath, "."], { cwd: outDir, stdio: "inherit" });
  console.log(`Created ${zipPath}`);
} catch (error) {
  console.log("Paperclip v2 package folder created, but zip command failed or is unavailable.");
  console.log(`Folder: ${outDir}`);
  process.exitCode = 1;
}
