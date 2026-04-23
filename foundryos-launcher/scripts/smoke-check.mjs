const baseUrl = process.env.FOUNDRYOS_BASE_URL || "http://localhost:3000";
const endpoints = [
  "/api/runtime/status",
  "/api/entitlements/check",
  "/api/company/provision-plan",
  "/api/cloud/provision-plan",
  "/api/cloud/tenants",
  "/api/deploy/report"
];

async function main() {
  const results = [];

  for (const endpoint of endpoints) {
    const url = `${baseUrl}${endpoint}`;
    try {
      const res = await fetch(url);
      results.push({ endpoint, status: res.status, ok: res.ok });
    } catch (error) {
      results.push({ endpoint, status: 0, ok: false, error: String(error) });
    }
  }

  const failed = results.filter((item) => !item.ok);
  console.log(JSON.stringify({ baseUrl, results }, null, 2));

  if (failed.length) {
    process.exitCode = 1;
  }
}

main();
