export const foundryosLauncher = {
  name: "FOUNDRYOS Launcher",
  version: "0.1.0",
  commands: [
    "init",
    "install-company",
    "install-skills",
    "status",
    "spawn",
    "deal-room",
    "war-room"
  ],
  doctrine:
    "Deploy AI companies, not AI assistants. One product, many install surfaces, one licence heartbeat, one company operating layer."
};

export function getCommandPlan(command) {
  const plans = {
    init: "Scaffold a FOUNDRYOS launcher workspace.",
    "install-company": "Install/import a FOUNDRYOS company package.",
    "install-skills": "Install FOUNDRYOS skill packs into local agent skill folders.",
    status: "Show local launcher/runtime status.",
    spawn: "Create a new company package scaffold from a venture brief.",
    "deal-room": "Create a Studio Deal Room intake template.",
    "war-room": "Show owner war-room metrics."
  };

  return {
    command,
    plan: plans[command] ?? "Unknown command.",
    status: plans[command] ? "planned" : "unknown"
  };
}
