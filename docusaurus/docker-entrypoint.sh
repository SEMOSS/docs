#!/bin/sh
set -eu

cd /repo/docusaurus

# Build at *runtime* so env vars passed via `docker run`/`--env-file` are applied.
# Docusaurus config loads `.env` via `dotenv` as defaults; Docker env vars can override.

echo "[docs] Building site (runtime)…"
pnpm run build

echo "[docs] Serving site on 0.0.0.0:${PORT:-3000}…"
exec pnpm exec docusaurus serve --host 0.0.0.0 --port "${PORT:-3000}"
