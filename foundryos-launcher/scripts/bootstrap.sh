#!/usr/bin/env bash
set -euo pipefail

echo "FOUNDRYOS Launcher Bootstrap"
echo "1) Doctor"
node scripts/doctor.mjs

echo "2) Install local coding harnesses"
bash scripts/install-local.sh

echo "3) Open connector dashboards"
node scripts/open-connectors.mjs

echo "4) Import company when package exists"
if [ -f "./packages/foundryos-paperclip-import.zip" ]; then
  bash scripts/import-company.sh
else
  echo "Place foundryos-paperclip-import.zip into ./packages/ first."
fi

echo "5) Install local skills"
bash scripts/install-skills.sh || true

echo "Bootstrap finished. Verify credentials and approval gates before enabling heartbeats."
