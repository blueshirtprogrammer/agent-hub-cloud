export type HarnessTaskType =
  | "strategy"
  | "coding"
  | "research"
  | "crm"
  | "voice"
  | "client_ops"
  | "browser_gui"
  | "desktop_work"
  | "cloud_worker"
  | "distribution";

export type HarnessRecommendation = {
  primary: string;
  secondary: string[];
  rationale: string;
};

export function recommendHarness(taskType: HarnessTaskType): HarnessRecommendation {
  switch (taskType) {
    case "coding":
    case "research":
      return {
        primary: "openagent_internal",
        secondary: ["paperclip_company_runtime"],
        rationale:
          "Use Oh My OpenAgent for internal operator swarm work: coding, research, orchestration, and deep execution loops."
      };
    case "crm":
    case "voice":
    case "client_ops":
      return {
        primary: "moltclaw_highlevel",
        secondary: ["openagent_internal"],
        rationale:
          "Use MoltClaw/HighLevel for revenue, client operations, CRM, workflows, and Voice AI."
      };
    case "browser_gui":
    case "desktop_work":
    case "cloud_worker":
      return {
        primary: "orgo_computer_use",
        secondary: ["openagent_internal", "moltclaw_highlevel"],
        rationale:
          "Use Orgo for cloud desktop and computer-use execution when tasks require browser, GUI, or multi-app workers."
      };
    case "distribution":
      return {
        primary: "docker_npm_distribution",
        secondary: ["openagent_internal"],
        rationale:
          "Use distribution harnesses for packaging, installation, and developer delivery surfaces."
      };
    case "strategy":
    default:
      return {
        primary: "paperclip_company_runtime",
        secondary: ["openagent_internal", "moltclaw_highlevel", "orgo_computer_use"],
        rationale:
          "Use PaperAI/Paperclip as the company brain for strategy, governance, and routing across the harness stack."
      };
  }
}
