import { execa } from "execa";

const checks = [
  ["node", ["--version"]],
  ["npm", ["--version"]],
  ["git", ["--version"]],
  ["docker", ["--version"]]
];

let ok = true;
for (const [cmd, args] of checks) {
  try {
    const { stdout } = await execa(cmd, args);
    console.log(`✓ ${cmd}: ${stdout}`);
  } catch {
    ok = false;
    console.log(`✗ ${cmd}: missing or unavailable`);
  }
}

if (!ok) {
  console.log("\nInstall missing prerequisites before running the full bootstrap.");
  process.exit(1);
}
console.log("\nSystem looks ready for FOUNDRYOS Launcher bootstrap.");
