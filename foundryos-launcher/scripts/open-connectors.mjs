import open from "open";
import { connectorLinks } from "../lib/catalog.js";

for (const link of connectorLinks) {
  console.log(`Opening ${link.name}: ${link.url}`);
  await open(link.url, { wait: false });
}

console.log("\nCreate keys inside each provider dashboard, then add them to your local environment or secrets manager.");
console.log("FOUNDRYOS does not scrape browser sessions or extract tokens from logged-in apps.");
