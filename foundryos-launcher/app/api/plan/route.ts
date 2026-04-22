import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { companyTemplates, deploymentTargets } from "@/lib/catalog";

const PlanSchema = z.object({
  brief: z.string().min(10),
  template: z.string(),
  deployTarget: z.string()
});

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const parsed = PlanSchema.parse({
    brief: form.get("brief"),
    template: form.get("template"),
    deployTarget: form.get("deployTarget")
  });

  const template = companyTemplates.find(t => t.slug === parsed.template) ?? companyTemplates[0];
  const deploy = deploymentTargets.find(t => t.slug === parsed.deployTarget) ?? deploymentTargets[0];

  const plan = {
    template: template.name,
    deployTarget: deploy.name,
    brief: parsed.brief,
    installCommands: [
      "pnpm doctor",
      "pnpm open-connectors",
      "pnpm install-local",
      "pnpm import-company",
      "pnpm install-skills",
      deploy.command
    ],
    approvalGates: [
      "send_mass_outbound",
      "send_invoice",
      "sign_contract",
      "move_money",
      "publish_public_claim",
      "submit_capital_raise_material"
    ],
    firstOperatingLoop: "CEO → CRO → RevOps → Proposal/Invoice → COO Delivery → Board Report"
  };

  return NextResponse.json(plan, { status: 200 });
}
