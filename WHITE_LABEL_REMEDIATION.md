# White-Label Remediation Guide

> Generated: 2026-03-24
> Branch: client
> Goal: Remove all client/product-specific hardcoding so the product can be deployed as "AIProduct" (or any name) via config swap

---

## How Parameterization Works (existing system)

The repo already has a build-time replacement system:

| Mechanism | What it does |
|---|---|
| `.env` → `APP_NAME` | Replaces `SEMOSSName` placeholder in markdown at build |
| `.env` → `MONOLITH_API_URL` | Replaces `MonoLithURL` placeholder in markdown at build |
| `<AppName />` React component | Renders `APP_NAME` inline in docs |
| `appNameUpdater()` | Replaces "AI Core" in sidebar nav labels |

**To rename the product to "AIProduct" you only need to set `APP_NAME=AIProduct` in `.env` — but the files below still have hardcoded strings that won't be touched by that system.**

---

## Priority 1 — Config Files (do these first)

### `/docusaurus/package.json`
**Why:** Package name `cfg-docs` exposes the internal CFG product codename.
```
Line 2:  "name": "cfg-docs"
Change to: "name": "ai-product-docs"   ← or whatever your deploy name is
```

---

### `/docusaurus/docusaurus.config.js`
**Why:** Site title, org name, navbar, and footer all hardcode "SEMOSS" — these are visible in the browser tab, header, and page footer. These are NOT covered by the `SEMOSSName` replacement system.
```
Line 14:  title: "SEMOSS"                              → your product name
Line 17:  organizationName: "SEMOSS"                   → your org name
Line 153: title: "SEMOSS"  (navbar)                    → your product name
Line 187: "Copyright © ... SEMOSS Documentation"       → your org name
```

---

### `/docusaurus/.env`
**Why:** `CURRENT_APP_NAME` is set to `GovConnectSupper.ait` — a deprecated internal product name. Docker URLs also embed the `cfg` codename.
```
Line 9:  CURRENT_APP_NAME=GovConnectSupper.ait         → remove or set to your app name
Line 19: DOCUSAURUS_DOCKER_URL=docker.cfg.dev-monolith.com  → your docker registry
Line 20: DOCUSAURUS_DOCKER_IMAGE=docker.cfg.dev-monolith.com/ai_core/ai_core:5.0.0  → your image path
```

---

## Priority 2 — Hardcoded Domain URLs (demo/staging/prod environments)

These are scattered across docs and all point to Deloitte-era infrastructure. Replace with placeholder text like `<YOUR_INSTANCE_URL>` or your actual client domain.

### `/docusaurus/docs/Integrating with SEMOSS/Packages and Pre-requisites.md`
```
Line 76:  https://workshop.cfg.semoss.com/cfg-ai-demo/SemossWeb/...  → <YOUR_INSTANCE_URL>
Line 191: globalaicoreplatform@semoss.com                            → <SUPPORT_EMAIL>
```

### `/docusaurus/docs/Getting Started/Glossary.md`
```
Lines 82-83: "Trustworthy AI™" — Deloitte registered trademark
             → Remove trademark symbol or replace with generic "Trustworthy AI" framing
```

### `/docusaurus/docs/Getting Started/Overview.mdx`
```
Line 15: url="/Demos/GovConnectaiIntroduction.mp4"   → update to new demo video filename
         (also need to swap the actual video asset if it has GovConnect branding)
```

### `/docusaurus/docs/Advanced Installation/Docker BE Install Guide.md`
```
→ Search for workshop.cfg.semoss.com and docker.cfg.semoss.com
  Replace with <YOUR_DOCKER_REGISTRY> / <YOUR_INSTANCE_URL>
```

### `/docusaurus/docs/Advanced Installation/Deploying a Private Server/Sandbox Deployment.md`
```
→ Contains docker.cfg.semoss.com and workshop.cfg.semoss.com in deploy scripts
  Replace with <YOUR_DOCKER_REGISTRY> / <YOUR_INSTANCE_URL>
```

### `/docusaurus/docs/Cookbook Recipes/Code Modifier.mdx`
```
Line 29: https://prod.eu.aicore.com/SemossWeb/...     → <YOUR_INSTANCE_URL>
```

### `/docusaurus/docs/Platform Navigation/Admin Settings/Admin Query.mdx`
```
Lines 145, 149: https://workshop.semoss.semoss.com/docs/...  → <YOUR_DOCS_URL>
Lines 153+:     dev.eu.aijumpstart.semoss.com                → <YOUR_INSTANCE_URL>
                "SEMOSS Global Services Limited"             → your company legal name
                "SEMOSS Network"                             → your product/network name
```

---

## Priority 3 — API Spec Files

### `/docusaurus/examples/semoss-api-spec.json`
### `/docusaurus/examples/semoss-api-spec4.json`
### `/docusaurus/examples/semoss-api-spec5.json`
**Why:** All three have `GovConnect.ait` hardcoded in the demo API server URL — this is a deprecated product name that will confuse users.
```
Line 8-9 (each file): "url": "http://localhost:8080/GovConnect.ait/Monolith/api"
                    → "url": "http://localhost:8080/<YOUR_APP>.ait/Monolith/api"
```

---

## Priority 4 — Versioned Docs (same issues, mirrored)

The `/docusaurus/versioned_docs/` directory mirrors the main docs for each release. Each of the files below has the same hardcoded references as their counterparts above.

| Versioned File | Same Issue As |
|---|---|
| `version-5.0.0/Getting Started/Overview.mdx` | GovConnect demo video (line 15) |
| `version-5.0.0/Getting Started/Glossary.md` | Trustworthy AI™ trademark (lines 82-83) |
| `version-5.0.0/Integrating with SEMOSS/Packages and Pre-requisites.md` | Domain URLs + email |
| `version-5.0.0/Cookbook Recipes/Code Modifier.mdx` | prod.eu.aicore.com URL |
| `version-5.0.0/Advanced Installation/Docker BE Install Guide.md` | Docker/workshop domains |
| `version-5.0.0/Advanced Installation/Deploying a Private Server/Sandbox Deployment.md` | Docker domains |
| `version-5.0.0/Advanced Installation/Deploying a Private Server/AI Server Configuration Parameters.md` | workshop.cfg.semoss.com in Ingress config (lines 474, 477, 503, 506, 520-523) |
| `version-5.0.0/Advanced Installation/Frontend Installation.md` | SEMOSS@semoss.com support email (line 49) |
| `version-5.0.0/Platform Navigation/Admin Settings/Admin Query.mdx` | Hardcoded domains |
| `version-4.3.2/Advanced Installation/Docker BE Install Guide.md` | workshop.cfg.semoss.com (line 18) |
| `version-4.3.2/Advanced Installation/Deploying a Private Server/AI Server Configuration Parameters.md` | workshop.cfg.semoss.com Ingress examples |
| `version-4.3.2/Advanced Installation/Deploying a Private Server/Sandbox Deployment.md` | docker.cfg.semoss.com (line 35) |
| `version-4.3.2/Integrating with SEMOSS/Packages and Pre-requisites.md` | workshop.cfg.semoss.com URL (line 75) |
| `version-4.3.2/Understanding Development/Java Development/Pixels.md` | workshop.cfg.semoss.com terminal embed (line 36) |
| `version-4.3.2/Cookbook Recipes/React App Quickstart Guide.md` | ENDPOINT="https://workshop.cfg.semoss.com/cfg-ai-demo" (line 120) |
| `version-4.3.2/Cookbook Recipes/React App In-Depth Guide.md` | workshop.cfg.semoss.com in webpack config (lines 189, 221) |
| `version-4.3.2/Cookbook Recipes/Streamlit App Quickstart Guide.md` | workshop.cfg.semoss.com |
| `version-4.3.2/Cookbook Recipes/Code Modifier.mdx` | prod.eu.aicore.com (line 29) |
| `version-4.3.2/Windows Developer Install.md` | github.com/SEMOSS hardcoded org |

---

## What Does NOT Need Changing (already parameterized or internal)

| Item | Why it's fine |
|---|---|
| `<AppName />` in doc body | Pulls from `APP_NAME` env var at build |
| `SEMOSSName` in markdown | Replaced at build via remark plugin |
| `MonoLithURL` in markdown | Replaced at build via env var |
| `cfg_ai_sec`, `cfg_ai_lm`, etc. | These are internal DB identifiers, not branding |
| Sidebar nav labels "AI Core" | Replaced by `appNameUpdater()` at build |

---

## Quick Checklist for "AIProduct" Deploy Tomorrow

- [ ] Set `APP_NAME=AIProduct` in `.env` — covers most of the doc body
- [ ] Update `docusaurus.config.js` lines 14, 17, 153, 187
- [ ] Update `package.json` line 2
- [ ] Fix `.env` line 9 (`CURRENT_APP_NAME`)
- [ ] Decide what to do with `Trustworthy AI™` trademark (2 files × 3 versions)
- [ ] Decide what to do with `GovConnect` demo video (swap asset + reference)
- [ ] Replace hardcoded `workshop.cfg.*` / `docker.cfg.*` / `prod.eu.aicore.*` domains
- [ ] Replace hardcoded support emails
- [ ] Update versioned_docs mirrors of the above
