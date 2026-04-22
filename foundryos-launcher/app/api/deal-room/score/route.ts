import { NextRequest, NextResponse } from "next/server";

const dimensions = [
  "founder_quality",
  "market_pain",
  "buyer_access",
  "speed_to_first_revenue",
  "automation_leverage",
  "distribution_advantage",
  "margin_potential",
  "recurring_revenue_potential",
  "defensibility",
  "exit_potential"
];

function scoreText(value: string | null) {
  return value && value.trim().length > 24 ? 4 : value && value.trim().length > 0 ? 2 : 1;
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const idea = String(form.get("idea") ?? "");
  const contribution = String(form.get("contribution") ?? "");
  const market = String(form.get("market") ?? "");

  const base = Math.min(5, Math.max(1, Math.round((scoreText(idea) + scoreText(contribution) + scoreText(market)) / 3)));
  const scores = Object.fromEntries(dimensions.map((dimension, index) => [dimension, Math.max(1, Math.min(5, base + (index % 3 === 0 ? 1 : 0)))]));
  const total = Object.values(scores).reduce((sum, value) => sum + Number(value), 0);
  const verdict = total >= 41 ? "studio_venture_candidate" : total >= 31 ? "paid_build_or_micro_test" : total >= 21 ? "research_more" : "reject";

  return NextResponse.json({
    status: "scored",
    verdict,
    total,
    scores,
    nextStep:
      verdict === "studio_venture_candidate"
        ? "Run due diligence and structure studio economics."
        : verdict === "paid_build_or_micro_test"
          ? "Run a 14-day market test or sell as paid install."
          : verdict === "research_more"
            ? "Collect stronger buyer proof and founder contribution detail."
            : "Reject or reposition as consulting only."
  });
}
