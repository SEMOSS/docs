# Documentation Versioning Release Checklist

## 1. Prepare Documentation

1. Finalize and review all updates in the `docs/` folder (**Next Release**).
2. Ensure images, videos, and assets are correctly linked.
3. Run a local build (`pnpm run build`) to check for errors.

## 2. Version the Documentation

Run the following command:

```bash
npx docusaurus docs:version <version>
```

**Example:**  
```bash
npx docusaurus docs:version 4.4.0
```

Verify the following are created:

- `versioned_docs/version-<version>/`
- `versioned_sidebars/version-<version>-sidebars.json`
- `versions.json` is updated.

## 3. Create Static Asset Version Folder

1. Manually create a folder under `/static/versioned/<version>/`.
2. Inside it, recreate subdirectories for each type of asset (e.g. `img`, `demos`, `pdf`, etc.).
3. Copy all referenced static files from `/static/` into the matching paths under `/static/versioned/<version>/`.

## 4. Update Asset References

Run the custom path update script to adjust all links inside `versioned_docs/`:

- Replace relative static links (e.g., `../../static/...`)
- With versioned paths (e.g., `../versioned/<version>/img/...`).

Verify all updated paths resolve correctly in the browser.

## 5. Update Configuration

In `docusaurus.config.js`, add the new version entry under `versions: {}` with:

- Correct label (e.g. `"4.4.0"`)
- Banner setting as `"none"`
- Ensure current (**Next Release**) remains active for ongoing work.

## 6. Validate and Build

Run:

```bash
pnpm run clear && pnpm run build
```

Verify:

- Both the new version and the **Next Release** appear in the dropdown.
- All media and image files render correctly.

## 7. Reactors and APIs

### APIs

In order to rewrite URLs for APIs based on client needs we need to copy the OAS file for versioning. 

1. Copy/Create a Spec file for the version.
1. Add new configuration for the version in the docusaurus-plugin-openapi-docs plugin

Example
```js 

 plugins: [
 [
      require.resolve("docusaurus-plugin-openapi-docs"),
      {
        id: "openapi-reactor",
        docsPluginId: "classic",
        config: {
          next: {
            //specPath: "https://raw.githubusercontent.com/SEMOSS/Monolith/refs/heads/swagger-feature/swagger-ui/swagger.json",
            specPath: "examples/semoss-api-spec.json",
            disableCompression: true,
            outputDir: "docs/developer/ai-core-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            //infoTemplate: "templates/info.mustache",
          },
          v5_0: {
            specPath: "examples/semoss-api-spec5.json",
            disableCompression: true,
            outputDir: "versioned_docs/version-5.0.0/developer/ai-core-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          v4_3: {
            specPath: "examples/semoss-api-spec4.json",
            disableCompression: true,
            outputDir: "versioned_docs/version-4.3.2/ai-core-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            }, 
          }, 
        },
      },
    ],
 ]

```

## 8. Commit and Deploy

1. Commit the updated `versioned_docs/`, `static/versioned/`, and config files.
2. Push changes to the main branch.
3. Deploy or publish as per project workflow.
