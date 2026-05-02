# Branding Audit Report

**Date:** March 16, 2026
**Status:** Read-only review of documentation branding consistency
**Branch:** docker-refactor

---

## Notes for Review

Before proceeding with remediation of items in this report, please consider the following:

1. **Database Identifiers**: The following appear to be actual database/system identifiers that may require separate consideration:
   - `cfg_ai_sec` - Security database
   - `cfg_ai_lm` - Language Model database
   - `cfg_ai_sched` - Scheduler database
   - `cfg_ai_user` - User database
   - `cfg_ai_model_logs` - Model Logs database

   These are used in configuration files and connection strings and should NOT be changed unless the underlying database names are also updated.

2. **`<AppName />` Component**: This is a React/MDX component used as a dynamic placeholder. Verify with the development team whether this should be:
   - Replaced with literal "SEMOSS" text
   - Kept as a dynamic variable for future rebranding flexibility
   - Updated in the component definition itself (located at `docusaurus/src/components/CustomFields.tsx`)

3. **Internal Style Guide Context**: The `Internal Style Guide.md` document contains mentions of old names (CortexAI, CFG, cfgai) **explicitly in the context of "DO NOT USE" guidance** for documentation authors. These instances are intentionally present as reference material for style compliance.

4. **Versioned Documentation**: Issues found in current docs (docusaurus/docs/) are mirrored in versioned documentation:
   - `docusaurus/versioned_docs/version-4.3.2/` (754 instances of <AppName /> alone)
   - `docusaurus/versioned_docs/version-5.0.0/` (many instances)

   These versioned docs represent archived releases. Determine the strategy:
   - Keep as-is for historical accuracy
   - Update for consistency
   - Mark with version-specific notices

---

## Section 1: Old Product Names (CFG, AI Core, CortexAI, GovConnect, cfgai, cfg-ai, cfg_ai)

### Summary Statistics

| Term | Count | Priority |
|------|-------|----------|
| AI Core | 330 | High |
| CFG | 315 | High |
| cfgai | 51 | Medium |
| GovConnect | 6 | Medium |

**Total old product name occurrences: 702**

### AI Core (330 occurrences)

"AI Core" appears primarily in documentation descriptions, headings, and metadata. This is the most frequent old product name.

**Files with 10+ occurrences:**

- `docusaurus/docs/Cookbook Recipes/Award Generator.mdx` (lines: 3, 9)
- `docusaurus/docs/Cookbook Recipes/Code Modifier.mdx` (lines: 3, 10)
- `docusaurus/docs/Cookbook Recipes/Creating a Vector Database.mdx` (lines: 3, 10)
- `docusaurus/docs/Cookbook Recipes/Frames.md` (lines: 3, 10)
- `docusaurus/docs/Cookbook Recipes/Guide for Building a JavaScript App (Node.js).md` (lines: 3, 11)
- `docusaurus/docs/Cookbook Recipes/Pixel MCP.md` (lines: 3, 10)
- `docusaurus/docs/Cookbook Recipes/Policy Bot.md` (lines: 3, 9)
- `docusaurus/docs/Cookbook Recipes/Python MCP.md` (lines: 3, 10)
- `docusaurus/docs/Cookbook Recipes/RAG MCP.md` (line: 10)
- `docusaurus/docs/Cookbook Recipes/RAG.mdx` (lines: 3, 10)
- `docusaurus/docs/Cookbook Recipes/Simple Model Interaction.mdx` (lines: 3, 9)
- `docusaurus/docs/Cookbook Recipes/Streamlit App Quickstart Guide.md` (lines: 3, 10)
- `docusaurus/docs/Building Apps/Add Custom Reactors to Apps/Writing Unit Tests.mdx` (line: 3)
- `docusaurus/REACTOR_DOCGEN_YAML_SYSTEM.md` (line: 47)
- `CookbookRecipes.md` (line: 86)

**Recommendation:** Replace with "SEMOSS" or current product brand name throughout documentation.

### CFG (315 occurrences)

"CFG" appears as an acronym in various contexts: URLs, file paths, database references, environment variables, configuration examples, and some comments.

**Key usage patterns:**

| Context | Files | Example |
|---------|-------|---------|
| URLs (workshop.cfg.deloitte.com) | Multiple | `https://workshop.cfg.deloitte.com/cfg-ai-demo` |
| Database names | AI Server Config Parameters | `databaseName=cfg_ai_sec` |
| File paths | Multiple | `cfg-ai-demo/SemossWeb/` |
| Subpaths | Deployment docs | `/cfg-ai-demo/Monolith/` |
| Kubernetes labels | K8s config | `app.kubernetes.io/name: cfg-ai` |
| Comments | Various | "Remove those three commands when you deploy your app to CFG" |

**Top files with CFG references:**

1. `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Advanced Installation/Deploying a Private Server/AI Server Configuration Parameters.md` (31 occurrences on lines: 58, 61, 69, 117, 129, 140, 152, 163, 175, 186, 198, 209, 226, 283, 295, 357, 360, 361, 364, 365, 427, 443, 444, 455, 484, 489, 491, 509, 513, 521, 523)
2. `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Advanced Installation/Deploying a Private Server/High Availability Deployment.md` (2 occurrences on lines: 45, 49)
3. `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Advanced Installation/Deploying a Private Server/Sandbox Deployment.md` (1 occurrence on line: 106)
4. `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Advanced Installation/Docker BE Install Guide.md` (1 occurrence on line: 15)
5. `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Building Apps/Add Custom Reactors to Apps/Pixels.md` (1 occurrence on line: 43)
6. `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Building Apps/Add Custom Reactors to Apps/Run Pixels.md` (1 occurrence on line: 44)
7. `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Building Apps/Pro Code Apps.md` (1 occurrence on line: 270)
8. `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Cookbook Recipes/Guide for Building a JavaScript App (Node.js).md` (5 occurrences on lines: 191, 216, 248, 257, 259)
9. `/Users/kunalppatel9/Documents/documentation/Contributing.md` (1 occurrence on line: 146)

**Recommendation:**
- CRITICAL: Must be careful with database names - these may be live identifiers
- Update URLs to point to new domain or service
- Update documentation links and examples
- Update Kubernetes configuration examples

### cfgai (51 occurrences)

"cfgai" appears in repository names, file paths, example code, and directory references.

**Usage contexts:**

| Context | Count | Notes |
|---------|-------|-------|
| GitHub repo names (Deloitte-Default/cfgai-*) | ~20 | References to old repo URLs |
| File paths | ~15 | Examples in deployment scripts |
| Configuration examples | ~10 | Container paths, subpaths |
| Comments | ~5 | References in code comments |
| Package paths | ~1 | npm/directory structures |

**Representative files:**

- `/Users/kunalppatel9/Documents/documentation/Contributing.md` (line: 126)
- `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Advanced Installation/Frontend Installation.md` (lines: 48, 96)
- `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Advanced Installation/Deploying a Private Server/Sandbox Deployment.md` (line: 28)
- `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Advanced Installation/Docker BE Install Guide.md` (line: 72)
- `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Cookbook Recipes/Guide for Building a JavaScript App (Node.js).md` (lines: 47, 51, 211, 219)
- `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Cookbook Recipes/Streamlit App Quickstart Guide.md` (line: 220)

**Recommendation:** Replace with new repository naming scheme and update example paths accordingly.

### GovConnect (6 occurrences)

"GovConnect" appears in video demo filenames, API examples, and static assets.

**Detailed occurrences:**

| File | Line | Context |
|------|------|---------|
| `/Users/kunalppatel9/Documents/documentation/docusaurus/docs/Getting Started/Overview.mdx` | 15 | Video demo: `/Demos/GovConnectaiIntroduction.mp4` |
| `/Users/kunalppatel9/Documents/documentation/docusaurus/versioned_docs/version-5.0.0/Getting Started/Overview.mdx` | 15 | Video demo: `/Demos/GovConnectaiIntroduction.mp4` |
| `/Users/kunalppatel9/Documents/documentation/docusaurus/examples/semoss-api-spec.json` | 8 | Example API URL: `http://localhost:8080/GovConnect.ait/Monolith/api` |
| `/Users/kunalppatel9/Documents/documentation/docusaurus/examples/semoss-api-spec4.json` | 9 | Example API URL: `http://localhost:8080/GovConnect.ait/Monolith/api` |
| `/Users/kunalppatel9/Documents/documentation/docusaurus/examples/semoss-api-spec5.json` | 8 | Example API URL: `http://localhost:8080/GovConnect.ait/Monolith/api` |
| `/Users/kunalppatel9/Documents/documentation/docusaurus/static/versioned/static_4.3.2_structure.txt` | 1028 | Image asset path: `./img/ProvenSolutions/GovConnectaiart.png` |

**Recommendation:** Update demo video references, remove/update old API example files, verify image assets still exist.

---

## Section 2: `<AppName />` Component Placeholder Instances

### Summary

**Total occurrences: 754**

The `<AppName />` component is a React/MDX placeholder used throughout the documentation. This component is defined in:
- `/Users/kunalppatel9/Documents/documentation/docusaurus/src/components/CustomFields.tsx` (1 occurrence)

### Top Files by `<AppName />` Count

| File | Count | Type |
|------|-------|------|
| docusaurus/docs/Advanced Installation/Mac Developer Install.md | 27 | Installation guide |
| docusaurus/versioned_docs/version-5.0.0/Advanced Installation/Mac Developer Install.md | 27 | Archived v5.0.0 |
| docusaurus/versioned_docs/version-4.3.2/Advanced Installation/Mac Developer Install.md | 27 | Archived v4.3.2 |
| docusaurus/versioned_docs/version-5.0.0/Building Apps/Troubleshooting/DebugAICorePython.md | 20 | Troubleshooting |
| docusaurus/docs/Building Apps/Troubleshooting/DebugAICorePython.md | 20 | Troubleshooting |
| docusaurus/docs/Advanced Installation/Docker BE Install Guide.md | 17 | Installation guide |
| docusaurus/versioned_docs/version-5.0.0/Platform Navigation/Playground.md | 13 | Platform guide |
| docusaurus/versioned_docs/version-5.0.0/Integrating with SEMOSS/Packages and Pre-requisites.md | 13 | Integration guide |
| docusaurus/versioned_docs/version-5.0.0/Advanced Installation/Docker BE Install Guide.md | 13 | Archived installation |
| docusaurus/versioned_docs/version-4.3.2/Advanced Installation/Docker BE Install Guide.md | 13 | Archived installation |

### Breakdown by File Category

- **Installation Guides**: 90+ instances (Mac Developer, Docker, Frontend Installation, Windows)
- **Cookbook Recipes**: 120+ instances (various app development guides)
- **Platform Navigation**: 45+ instances (UI guides, Settings, Catalogs)
- **Integrating with SEMOSS**: 65+ instances (SDK, Python SDK, Packages)
- **Building Apps**: 85+ instances (Pro Code, Reactors, Templates)
- **Getting Started**: 35+ instances (Overview, How to Access, Glossary)
- **Advanced Installation**: 70+ instances (Docker, Deployment, Troubleshooting)
- **Versioned Docs v4.3.2 & v5.0.0**: 180+ instances (mirrors of above)

### Examples of Usage

The component appears in contexts such as:

```markdown
## <AppName /> Installation for Mac Silicon
The main way that you'll interact with a Gen AI app is through the <AppName /> server.
You need an account on the <AppName /> platform.
- **Username**: Enter your <AppName /> username.
```

### Action Items for `<AppName />`

**Before implementing changes, determine:**

1. Whether `<AppName />` should resolve to literal "SEMOSS" text
2. If the component definition in `CustomFields.tsx` needs updating
3. Whether to keep this as a dynamic variable for internationalization/multi-brand support
4. Whether versioned docs should be updated or preserved as historical records

---

## Section 3: Deloitte Company References (Text Mentions)

**Total text references to "Deloitte": 46+ direct mentions**

### Files with Deloitte References

| File | Lines | Type | Context |
|------|-------|------|---------|
| Contributing.md | 126, 146 | Repository links | GitHub URLs |
| Internal Style Guide.md | 3, 11, 73, 81 | Style guide, DO NOT USE | References to old names |
| docusaurus/docs/Advanced Installation/Frontend Installation.md | 48, 50, 96 | Repository link, email | GitHub URL + support email |
| docusaurus/docs/Cookbook Recipes/Guide for Building a JavaScript App (Node.js).md | 47 | Repository link | GitHub URL |
| docusaurus/docs/Cookbook Recipes/Streamlit App Quickstart Guide.md | 220 | Repository link | GitHub URL |
| docusaurus/docs/Cookbook Recipes/VanillaJS App Quickstart Guide.md | 32, 34 | Text reference | "Deloitte GitHub" instruction |
| docusaurus/docs/Getting Started/Glossary.md | 83 | Trademark | "Trustworthy AI™" (Deloitte) |
| docusaurus/docs/Getting Started/Overview.mdx | 130 | Support email | SEMOSS@deloitte.com |
| docusaurus/docs/Integrating with SEMOSS/Packages and Pre-requisites.md | 76, 191 | Support email + URL | Global AI Core Platform contact |
| docusaurus/docs/Building Apps/Pro Code Apps.md | 270 | URL | workshop.cfg.deloitte.com |
| docusaurus/docs/Building Apps/Add Custom Reactors to Apps/Pixels.md | 43 | URL | workshop.cfg.deloitte.com |
| docusaurus/docs/Platform Navigation/App Library.mdx | 83 | URL | workshop.cfg.deloitte.com |
| docusaurus/docs/Platform Navigation/Settings/My Profile.mdx | 33, 49 | URL | workshop.cfg.deloitte.com |
| docusaurus/docs/Platform Navigation/Systems App.mdx | 21 | URL | workshop.cfg.deloitte.com |
| docusaurus/docs/Advanced Installation/Docker BE Install Guide.md | 15 | URL | workshop.cfg.deloitte.com (live link) |
| docusaurus/docusaurus.config.js | 115 | Commented-out URL | workshop.cfg.deloitte.com |
| docusaurus/reactors/reactorLLMSpec.json | 105 | URL | workshop.cfg.deloitte.com |
| docusaurus/reactors/reactorPixelOAS.json | 105 | URL | workshop.cfg.deloitte.com |
| packages/docusaurus-plugin-reactor-docgen/readme.md | 143 | URL | workshop.cfg.deloitte.com |
| packages/docusaurus-plugin-reactor-docgen/example-helpjson.mdx | 31, 40, 60, 79 | URLs | workshop.cfg.deloitte.com (4 examples) |
| packages/docusaurus-plugin-reactor-docgen/example-reactor-with-params.mdx | 39, 48, 68, 87, 202, 216 | URLs | workshop.cfg.deloitte.com (6 examples) |
| pre-processor/README.md | 12, 55-57 | "Deloitte credentials" + author emails | Configuration & contact info |
| pre-processor/process_pdfs_and_compute_embeddings.py | 3 | Author email | pbimalshah@deloitte.com |
| streamlit/streamlit.md | 6 | Repository link | GitHub URL |
| docusaurus/static/versioned/4.3.2/assets/Backend Files/SRC/reactors/email/SIMPLE_EMAIL.html | 6 | Text reference | "Deloitte homepage" |
| docusaurus/versioned_docs/version-4.3.2/Getting Started/Overview.md | 129 | Support email | SEMOSS@deloitte.com |
| docusaurus/versioned_docs/version-4.3.2/Getting Started/How to Access SEMOSS.mdx | 8, 10, 13 | URLs | workshop.cfg.deloitte.com |
| docusaurus/versioned_docs/version-4.3.2/Integrating with SEMOSS/Packages and Pre-requisites.md | 75, 190 | URL + email | workshop.cfg.deloitte.com + globalaicoreplatform@deloitte.com |
| docusaurus/versioned_docs/version-4.3.2/Understanding Development/Java Development/Writing Unit Tests.mdx | 148 | Support email | CFGAI@deloitte.com |
| docusaurus/versioned_docs/version-4.3.2/Advanced Installation/Frontend Installation.md | 49, 51, 97 | GitHub URLs + email | Deloitte repos + SEMOSS@deloitte.com |
| docusaurus/versioned_docs/version-4.3.2/Cookbook Recipes/React App In-Depth Guide.md | 22, 189, 221 | GitHub URLs + URL | Deloitte repos + workshop URL |
| docusaurus/versioned_docs/version-4.3.2/Advanced Installation/Deploying a Private Server/Sandbox Deployment.md | 22, 24, 35 | URLs | docker.cfg.deloitte.com (3 instances) |
| docusaurus/versioned_docs/version-4.3.2/Advanced Installation/Deploying a Private Server/AI Server Configuration Parameters.md | 283, 295, 474, 477, 503, 506, 520, 521, 523 | URLs | workshop.cfg.deloitte.com (9 instances) |
| docusaurus/versioned_docs/version-5.0.0/* | Multiple | All mirrors | Duplicates of v4.3.2 and current issues |

### Key Deloitte Contact Points

**Support Emails:**
- `SEMOSS@deloitte.com` (14 instances)
- `globalaicoreplatform@deloitte.com` (2 instances)
- `CFGAI@deloitte.com` (1 instance)
- `pbimalshah@deloitte.com` (author contact in code)

**GitHub Organization:**
- `github.com/Deloitte-Default` (20+ repository references)

### Recommendation

These are company-specific references that should be reviewed for organizational/branding alignment. Determine if/how these should be updated based on organizational restructuring or if this represents a government product still maintained by Deloitte.

---

## Section 4: Deloitte Domains & URLs

### Summary

**Total domain/URL occurrences: 90+**

### Primary Domains

| Domain | Primary Use | Occurrences |
|--------|-------------|-------------|
| workshop.cfg.deloitte.com | Live demo environment, documentation examples | 75+ |
| docker.cfg.deloitte.com | Docker image registry | 3 |
| prod.eu.aicore.deloitte.com | Production EU environment | 2 |

### workshop.cfg.deloitte.com URLs

**Most common endpoint:** `/cfg-ai-demo/SemossWeb/`

**Usage contexts:**
1. Live web server link in Docker BE Install Guide (line 15) - appears to be active documentation link
2. Example configuration URLs in deployment guides
3. Example URLs in tutorial documentation
4. Internal example code in reactors and plugins
5. Commented-out configuration in docusaurus.config.js

**Files referencing workshop.cfg.deloitte.com:**

- Contributing.md:146
- Frontend Installation.md:50
- Guide for Building a JavaScript App (Node.js).md:216, 248
- Streamlit App Quickstart Guide.md:220
- VanillaJS App Quickstart Guide.md:103
- Code Modifier.mdx:29
- How to Access SEMOSS.mdx:11, 13, 16
- Overview.mdx:130
- Pro Code Apps.md:270
- Pixels.md:43
- App Library.mdx:83
- My Profile.mdx:33, 49
- Systems App.mdx:21
- Docker BE Install Guide.md:15
- docusaurus.config.js:115 (commented)
- reactorLLMSpec.json:105
- reactorPixelOAS.json:105
- Versioned docs (v4.3.2, v5.0.0): 50+ additional instances

### docker.cfg.deloitte.com URLs

Found in `docusaurus/versioned_docs/version-4.3.2/Advanced Installation/Deploying a Private Server/Sandbox Deployment.md` (lines: 22, 24, 35)

**Context:** Docker container registry configuration examples

### prod.eu.aicore.deloitte.com URLs

Found in:
- Code Modifier.mdx:29
- Versioned docs version-4.3.2:16

**Context:** Production EU AI Core platform endpoint reference

### Action Items

1. **Live Links**: The workshop.cfg.deloitte.com link in Docker BE Install Guide (line 15) appears to be an active, documented reference point
2. **Example URLs**: Many instances are in code examples and configuration templates - determine if these should be:
   - Replaced with placeholder syntax `<domain>`
   - Updated to new production domain
   - Kept as historical examples
3. **Registry Migration**: If docker.cfg.deloitte.com is being deprecated, update all registry references
4. **Region-specific Endpoints**: Clarify whether prod.eu.aicore.deloitte.com is still in use

---

## Section 5: Deloitte GitHub Repositories

### Summary

**Total GitHub references: 20+**

### Repository References

All repositories follow the pattern: `github.com/Deloitte-Default/*`

| Repository | References | Primary Use |
|------------|------------|-------------|
| cfgai-docs | 6 | Main documentation repo |
| cfgai-ui | 4 | Frontend UI component library |
| cfgai-apps | 3 | Sample application examples |
| cfgai-py-ai-server | 1 | Python AI Server |

### Detailed File References

| File | Line | Repository | Reference Type |
|------|------|------------|-----------------|
| Contributing.md | 126 | cfgai-docs | Pull Requests tab link |
| Internal Style Guide.md | 73, 81 | cfgai-docs | "DO NOT USE" examples |
| Frontend Installation.md | 48 | cfgai-ui | Repository link |
| Frontend Installation.md | 96 | cfgai-ui | Package reference |
| Guide for Building a JavaScript App (Node.js).md | 47 | cfgai-apps | App examples reference |
| Streamlit App Quickstart Guide.md | 220 | cfgai-docs | Code example link (CFG_Chatbot.py) |
| VanillaJS App Quickstart Guide.md | 32, 34 | cfgai-apps | Repository link + instruction |
| streamlit/streamlit.md | 6 | cfgai-py-ai-server | Repository reference |
| Versioned docs (v4.3.2, v5.0.0) | Multiple | All above | Mirrors of current references |

### Action Items

1. If Deloitte-Default organization or repositories are being deprecated, update all links to point to new locations
2. Verify repository accessibility and update documentation accordingly
3. Consider whether these should be converted to internal documentation examples or example code snippets embedded directly

---

## Section 6: Deloitte Email Addresses

### Summary

**Total email references: 20+ instances**

### Email Addresses by Type

| Email | Type | Occurrences | Context |
|-------|------|-------------|---------|
| SEMOSS@deloitte.com | Support/Documentation | 14 | User support, implementation guidance |
| globalaicoreplatform@deloitte.com | Platform Support | 2 | Global AI Core Platform contact |
| CFGAI@deloitte.com | Legacy Support | 1 | Version 4.3.2 documentation |
| pbimalshah@deloitte.com | Author/Contributor | 1 | Code author comment |

### Files with Email References

| File | Email | Lines |
|------|-------|-------|
| Frontend Installation.md | SEMOSS@deloitte.com | 50 |
| How to Access SEMOSS.mdx | (implicit in context) | - |
| Overview.mdx | SEMOSS@deloitte.com | 130 |
| Packages and Pre-requisites.md | globalaicoreplatform@deloitte.com | 76, 191 |
| pre-processor/README.md | Multiple @deloitte.com | 55-57 |
| pre-processor/process_pdfs_and_compute_embeddings.py | pbimalshah@deloitte.com | 3 |
| Versioned docs (v4.3.2) | SEMOSS@deloitte.com, CFGAI@deloitte.com | Multiple |
| Versioned docs (v5.0.0) | SEMOSS@deloitte.com | Multiple |

### Action Items

1. Determine if these email addresses are still valid
2. Update to appropriate support channels if organization has changed
3. Remove or replace author contact emails in code if no longer applicable
4. Update all versioned docs email references consistently

---

## Section 7: Miscellaneous / Other Concerns

### CFG_Chatbot.py Filename

**Location:** Referenced in Streamlit App Quickstart Guide.md (line: 220)

**Context:** Example code repository link to `CFG_Chatbot.py` in cfgai-docs repository

**Status:** This is a named example file that may be intentionally named or a legacy holdover

**Recommendation:** Verify if this file still exists and consider renaming to `SEMOSS_Chatbot.py` or more generic name like `StreamlitChatbotExample.py`

### "Trustworthy AI™" Trademark

**Location:**
- Getting Started/Glossary.md (line: 83)
- Versioned docs version-4.3.2 (line: 81)

**Context:** Defined as a Deloitte trademark in glossary

**Status:** This is a legitimate trademark and should be preserved with trademark notation

**Recommendation:** No change needed - this is intentionally branded content

### CFG_Chatbot Pattern

**Additional references to CFG_Chatbot:**
- Appears as filename in repository examples
- May have corresponding implementation files

**Recommendation:** Audit codebase for actual `CFG_Chatbot.py` or similar files and rename consistently

### Show Tags Components

**Files affected:**
- ShowVideoTag component (referenced in Getting Started/Overview.mdx)
- ShowInternalDockerTag component (referenced in Docker BE Install Guide.md)

**Status:** These appear to be conditional rendering components for documentation display

**Context:** The components control whether certain content is visible, based on version/context

**Recommendation:** Verify these components are properly configured for current branding

### Configuration Subpaths

**Pattern:** `/cfg-ai-demo/` appears in many deployment configurations

**Locations:**
- AI Server Configuration Parameters.md (multiple lines)
- Deployment guides
- Example configuration files
- Docker and Kubernetes examples

**Type:** These may be actual configured subpaths in live systems

**Recommendation:** Determine if these are:
- Hard-coded in actual deployments (requires database/config changes)
- Template examples (can be updated)
- Legacy artifacts (can be removed)

### Commented-out Configuration

**File:** `docusaurus/docusaurus.config.js` (line: 115)

**Content:** Commented-out URL `workshop.cfg.deloitte.com`

**Status:** This configuration is not currently active

**Recommendation:** Remove commented-out code or clarify if it's needed for documentation purposes

---

## Audit Summary Table

| Category | Total Count | Priority | Files Affected | Notes |
|----------|-------------|----------|-----------------|-------|
| AI Core | 330 | HIGH | 80+ | Product name throughout docs |
| CFG | 315 | HIGH | 40+ | URLs, paths, configurations |
| cfgai | 51 | MEDIUM | 25+ | Repository names, file paths |
| GovConnect | 6 | MEDIUM | 6 | Legacy demo videos, examples |
| <AppName /> | 754 | HIGH | 140+ | Component placeholders throughout |
| Deloitte text | 46+ | MEDIUM | 35+ | Company references, links, emails |
| workshop.cfg.deloitte.com | 75+ | HIGH | 30+ | Live demo environment reference |
| docker.cfg.deloitte.com | 3 | MEDIUM | 2 | Registry references |
| prod.eu.aicore.deloitte.com | 2 | LOW | 2 | Regional endpoint references |
| Deloitte repos (Deloitte-Default) | 20+ | MEDIUM | 15+ | GitHub organization references |
| Email addresses | 20+ | MEDIUM | 10+ | Support contacts |
| **TOTAL** | **1,800+** | **MULTI** | **200+** | Comprehensive branding update needed |

---

## Recommended Next Steps

1. **Define Branding Strategy**: Clarify product name, domain, and organizational identity
2. **Component Resolution**: Determine final disposition of `<AppName />` component
3. **Database Identifier Review**: Audit which "cfg_ai_*" references are system identifiers vs. rebranding candidates
4. **Versioned Docs Policy**: Decide on approach for v4.3.2 and v5.0.0 documentation
5. **URL/Domain Migration**: Plan migration path for Deloitte domains if needed
6. **Phase Implementation**: Prioritize by impact:
   - Phase 1: Product names (AI Core, CFG, GovConnect) - 700+ occurrences
   - Phase 2: URLs and domains - 80+ occurrences
   - Phase 3: Organization references - 50+ occurrences
   - Phase 4: Component cleanup - 754 <AppName /> instances
7. **Validation**: Establish automated checks for old product names in future documentation

---

**Report Generated:** March 16, 2026
**Repository:** documentation
**Branch:** docker-refactor
**Status:** Ready for review and strategic planning