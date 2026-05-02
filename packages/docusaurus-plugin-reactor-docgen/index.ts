import type { LoadContext, Plugin } from "@docusaurus/types";
import { PluginOptions, LoadedContent, APIOptions } from "types";
import { AllReactors, Reactor } from "./src/reactorapi/types";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { fetchReactorDetails, fetchReactorNames } from "./src/reactorapi/reactorapi";
import {
    ProcessedSidebar,
    SidebarItemCategory,
    SidebarItemDoc,
} from "@docusaurus/plugin-content-docs/src/sidebars/types";
import { generateTryItOutSection } from "./src/tryItOut";
import { generateGenericReactorApiMetadata, generateReactorApiMetadata, ReactorInfo } from "./src/yamlTemplateUtils";

import JSON5 from "json5";
import { render } from "mustache";

// Load environment variables from .env file
dotenv.config({ path: './.env.local' });
dotenv.config({ path: './.env' });

/**
 * AI generated 
 * Sanitize description text by wrapping content with curly brackets and angle brackets in backticks
 * This prevents MDX/JSX parsing issues
 * Examples: 
 *   {'engineid':true/false} -> `{'engineid':true/false}`
 *   <namedStage> -> `<namedStage>`
 */
function sanitizeDescription(description: string): string {
    if (!description) return description;

    let sanitized = description;

    // Match content within curly brackets and wrap in backticks (if not already wrapped)
    sanitized = sanitized.replace(/(?<!`)(\{[^}]+\})(?!`)/g, '`$1`');

    // Match content within angle brackets (HTML/XML-like tags) and wrap in backticks (if not already wrapped)
    // This prevents MDX from treating them as JSX components
    sanitized = sanitized.replace(/(?<!`)(<[^>]+>)(?!`)/g, '`$1`');

    return sanitized;
}

/**
 * AI generated 
 * Generate reactor content section (without frontmatter)
 * Used for individual reactor entries in both per reactor file and multi-reactor files
 */
function generateReactorContentSection(reactorData: Reactor): string {
    // Extract reactor name from the full class name
    const fullName = reactorData.name || '';
    const reactorName = fullName.split('.').pop() || fullName;

    // Build required and optional keys sections
    const requiredKeys = reactorData.requiredKeys || [];
    const optionalKeys = reactorData.optionalKeys || [];

    let requiredKeysSection = '';
    let optionalKeysSection = '';

    if (requiredKeys.length > 0) {
        requiredKeysSection = `### Required Keys
${requiredKeys.map((key: string) => `- **${key}**`).join('\n')}

`;
    }

    if (optionalKeys.length > 0) {
        optionalKeysSection = `### Optional Keys
${optionalKeys.map((key: string) => `- **${key}**`).join('\n')}

`;
    }

    // Generate usage examples
    // Build usage example in the format: ReactorName(key1=[<key1>], key2=[<key2>])
    const requiredKeysFiltered = (reactorData.requiredKeys || []).filter(key => key !== "no keys defined");
    const keys = [
        ...requiredKeysFiltered,
        ...(reactorData.optionalKeys || []),
    ];
    //If a reactor does not have any keys/parameters then it will print with an empty parenthesis 
    const usageExample = keys.length > 0
        ? `${reactorName}(${keys.map(key => `${key}=[<${key}>]`).join(', ')})`
        : `${reactorName}()`;

    const usageSection = `### Usage
\`\`\`javascript
${usageExample}
\`\`\`

`;

    /* Generate "Try it out" section if OpenAPI spec is available
    let tryItOutSection = '';
    if (openAPISpecPath && fs.existsSync(openAPISpecPath)) {
        console.log(`Generating "Try it out" section for ${reactorName} using OpenAPI spec at ${openAPISpecPath}`);
        tryItOutSection = generateTryItOutSection(reactorData, openAPISpecPath);
    }*/

    // Build the reactor section content h2 level
    let content = `## ${reactorName}

`;

    if (reactorData.description) {
        const sanitizedDescription = sanitizeDescription(reactorData.description);
        content += `**Description:** 

        ${sanitizedDescription}

`;
    }

    content += `${requiredKeysSection}${optionalKeysSection}${usageSection}`;

    return content;
}

/**
 * Generate markdown file content for a single reactor
 * Use Case 1: One reactor per file
 */
function generateSingleReactorMarkdown(reactorData: Reactor, openAPISpecPath?: string): string {
    // Extract reactor name from the full class name
    const fullName = reactorData.name || '';
    const reactorName = fullName.split('.').pop() || fullName;
    const id = fullName.replace(/\./g, '-');

    // Extract description from reactor data
    const rawDescription = reactorData.description || `This method is used to ${reactorName.toLowerCase()}`;
    const description = sanitizeDescription(rawDescription).replace(/"/g, '\\"');

    // Build required and optional keys sections
    const requiredKeys = reactorData.requiredKeys || [];
    const optionalKeys = reactorData.optionalKeys || [];

    // Generate usage example
    const requiredKeysFiltered = (reactorData.requiredKeys || []).filter(key => key !== "no keys defined");
    const keys = [
        ...requiredKeysFiltered,
        ...(reactorData.optionalKeys || []),
    ];
    const usageExample = keys.length > 0
        ? `${reactorName}(${keys.map(key => `${key}=[<${key}>]`).join(', ')})`
        : `${reactorName}()`;

    // Generate compressed API metadata using YAML template
    const reactorInfo: ReactorInfo = {
        id: id,
        title: reactorName,
        description: sanitizeDescription(reactorData.description || description),
        requiredKeys: requiredKeys,
        optionalKeys: optionalKeys,
        usage: usageExample
    };

    const apiMetadata = generateReactorApiMetadata(reactorInfo, openAPISpecPath || '');
    console.log(`Generated API metadata for ${reactorName}: ${apiMetadata}`);

    // Create the full markdown content with API metadata
    let markdown = `---
id: ${id}
title: "${reactorName}"
sidebar_label: "${reactorName}"
description: "${description}"
api: ${apiMetadata}
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ${reactorName}

`;

    if (reactorData.description) {
        const sanitizedDescription = sanitizeDescription(reactorData.description);
        markdown += `**Description:** 

        ${sanitizedDescription}

`;
    }

    // Build required and optional keys sections for single reactor in h2 level
    let requiredKeysSection = '';
    let optionalKeysSection = '';

    if (requiredKeys.length > 0) {
        requiredKeysSection = `## Required Keys
${requiredKeys.map((key: string) => `- **${key}**`).join('\n')}

`;
    }

    if (optionalKeys.length > 0) {
        optionalKeysSection = `## Optional Keys
${optionalKeys.map((key: string) => `- **${key}**`).join('\n')}

`;
    }

    const usageSection = `## Usage
\`\`\`javascript
${usageExample}
\`\`\`

`;

    markdown += `
${requiredKeysSection}
${optionalKeysSection}
${usageSection}
`;

    return markdown;
}

/**
 * Generate markdown file content for multiple reactors grouped by category
 * Use Case 2: Multiple reactors per file (one file per category/key)
 * Note that if grouping is disabled, each file will contain one reactor
 * Also you will need to update the sidebar to be autogenerated for the directory, because side bar entries will not be created automatically
 */

function generateMultiReactorMarkdown(category: string, reactors: Reactor[], apiSpecPath: string, monolithApiUrl: string): string {
    // Extract category name for the title  
    const categoryName = category.split('.').pop() || category;
    const id = category.replace(/\./g, '-');
    const description = `Documentation for ${categoryName} reactors`;
    const apiMetadata = generateGenericReactorApiMetadata(apiSpecPath, monolithApiUrl);
    //console.log(`Generated generic API metadata for category ${categoryName}: ${apiMetadata}`);
    // Create the frontmatter with single metadata header
    // The api field is omitted here because it applies to individual reactors, not the category as a whole
    let markdown = `---
id: ${id}
title: "${categoryName}"
sidebar_label: "${categoryName}"
description: "${description}"
api: ${apiMetadata}

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ${categoryName}

This document contains multiple reactors in the ${categoryName} category.

---

`;

    // Add each reactor as a section
    reactors.forEach((reactor, index) => {
        markdown += generateReactorContentSection(reactor);

        // Add separator between reactors (except after the last one)
        if (index < reactors.length - 1) {
            markdown += '\n---\n\n';
        }
    });

    return markdown;
}

/**
 * Create output directory if it doesn't exist
 */
function ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

/**
 * Write markdown file for a single reactor
 * Use Case 1: One reactor per file
 */
function writeReactorFile(outputDir: string, reactorData: Reactor, openAPISpecPath: string, monolithApiUrl: string): void {
    // Extract reactor name from the full class name
    const fullName = reactorData.name || '';
    const reactorName = fullName.split('.').pop() || fullName;
    const safeName = fullName.toLowerCase().replace(/\./g, '-').replace(/[^a-z0-9-]/g, '-');
    const filename = `${safeName}.mdx`;
    const filepath = path.join(outputDir, filename);

    ensureDirectoryExists(outputDir);

    const markdownContent = generateSingleReactorMarkdown(reactorData, openAPISpecPath);
    fs.writeFileSync(filepath, markdownContent, 'utf8');

    //console.log(`Generated documentation for ${reactorName} at ${filepath}`);
}

/**
 * Write markdown file for multiple reactors in a category
 * Use Case 2: Multiple reactors per file (grouped by category)
 */
function writeGroupedReactorFile(outputDir: string, category: string, reactors: Reactor[], apiSpecPath: string, monolithApiUrl: string): void {
    // Create safe filename from category name
    const safeName = category.toLowerCase().replace(/\./g, '-').replace(/[^a-z0-9-]/g, '-');
    const filename = `${safeName}.mdx`;
    const filepath = path.join(outputDir, filename);

    ensureDirectoryExists(outputDir);
    console.log(`Writing grouped reactor file for category "${category}" with ${reactors.length} reactors at ${filepath} using API spec at ${apiSpecPath} and monolith API URL ${monolithApiUrl}`);
    const markdownContent = generateMultiReactorMarkdown(category, reactors, apiSpecPath, monolithApiUrl);
    fs.writeFileSync(filepath, markdownContent, 'utf8');

}

async function cleanAllReactors(options: APIOptions) {
    // Implementation for cleaning reactor docs will go here    
    if (fs.existsSync(options.outputDir)) {
        fs.rmSync(options.outputDir, { recursive: true, force: true });
        console.log(`Deleted directory: ${options.outputDir}`);
    } else {
        console.error(`Directory does not exist: ${options.outputDir}`);
    }
}

/**
 * Update server URLs in versioned reactor documentation files
 * This function updates the servers section in the API metadata of each .mdx file
 */
async function updateVersionedReactorServers(version: string, reactorsDir: string, serverUrl: string) {
    console.log(`Updating server URLs for version ${version} in ${reactorsDir}`);
    
    if (!fs.existsSync(reactorsDir)) {
        console.error(`Reactors directory does not exist: ${reactorsDir}`);
        return;
    }

    // Read all .mdx files in the reactors directory
    const files = fs.readdirSync(reactorsDir).filter(file => file.endsWith('.mdx'));
    
    for (const file of files) {
        const filePath = path.join(reactorsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Update the servers section in the frontmatter
        // Match the api: {..."servers":[...]} pattern and replace the servers array
        const serverPattern = /"servers":\s*\[([^\]]+)\]/;
        
        const newServersArray = `"servers":[{"url":"${serverUrl}","description":"Versioned API Endpoint"},{"url":"http://localhost:8080/Monolith/api","description":"Local Development"}]`;
        
        const updatedContent = content.replace(serverPattern, newServersArray);
        
        if (updatedContent !== content) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Updated server URLs in ${file}`);
        }
    }
    
    console.log(`Completed updating server URLs for ${files.length} files`);
}


export default function pluginReactorCodeGen(context: LoadContext, options: PluginOptions): Plugin<LoadedContent> {

    const {
        config,
        docsPlugin = "@docusaurus/plugin-content-docs",
        docsPluginId,
    } = options;

    return {
        name: "docusaurus-plugin-reactor-docgen",

        extendCli(cli): void {


            cli
                .command("generate-reactor-docs")
                .description("Generate API documentation from Reactor monolith")
                .arguments("<id>")
                .option("--output-dir <dir>", "Output directory for generated docs")
                .action(async (id, instance) => {
                    console.log("Generating Reactor API documentation...");
                    const options = instance.opts();
                    console.log("instance:", options);
                    console.log(`Docs Plugin: ${docsPlugin}`);
                    console.log(`Docs Plugin ID: ${docsPluginId}`);
                    console.log(`ID: ${id}`);
                    console.log(`Config: ${JSON.stringify(config, null, 2)}`);
                    console.log(`Monolith API URL from env: ${config.reactor.MONOLITH_API_URL}`);

                    // Process each API configuration
                    for (const [key, apiOptions] of Object.entries(config as Record<string, APIOptions>)) {
                        console.log(`Processing API: ${key}`);
                        console.log(`Reactors Resource Locator: ${apiOptions.reactorsResourceLocator}`);
                        console.log(`Output Directory: ${apiOptions.outputDir}`);
                        if (!apiOptions.apiSpecPath) {
                            throw new Error(`apiSpecPath is undefined for API: ${key}`);
                        }
                        try {

                            if (apiOptions.groupReactors) {
                                console.log("Grouping reactors is enabled.");
                                const reactorData: AllReactors = await fetchReactorDetails(apiOptions.reactorsResourceLocator);

                                if (reactorData) {
                                    const reactors = reactorData;
                                    console.log(`Found ${Object.keys(reactors)} reactors`);

                                    // Write one file per category with all reactors in that category
                                    for (const [category, reactorList] of Object.entries(reactors)) {
                                        console.log(`Processing category: ${category} with ${reactorList.length} reactors`);

                                        // Write the grouped markdown file for this category
                                        writeGroupedReactorFile(apiOptions.outputDir, category, reactorList, apiOptions.apiSpecPath, apiOptions.MONOLITH_API_URL);
                                    }
                                }

                            } else {
                                console.log("Grouping reactors is disabled.");
                                // First fetch all reactor names
                                console.log('Fetching reactor names...');


                                const reactorData: AllReactors = await fetchReactorDetails(apiOptions.reactorsResourceLocator);
                                //console.log('Reactor data fetched:', reactorData);
                                if (reactorData) {
                                    const reactors = reactorData;
                                    console.log(`Found ${Object.keys(reactors).length} reactors`);

                                    // Write the sidebar file

                                    createSidebarFile(apiOptions.outputDir, reactors).then(() => {
                                        console.log("Sidebar file created.");
                                    }).catch((err) => {
                                        console.error("Error creating sidebar file:", err);
                                    });

                                    // Generate documentation for each reactor
                                    for (const [category, reactorList] of Object.entries(reactors)) {
                                        console.log(`Processing category: ${category}`);
                                        for (const reactor of reactorList) {
                                            console.log(`Processing reactor: ${reactor.name}`);

                                            // Write the markdown file for this reactor
                                            writeReactorFile(apiOptions.outputDir, reactor, apiOptions.apiSpecPath, apiOptions.MONOLITH_API_URL);
                                        }
                                    }
                                } else {
                                    console.warn(`No reactor data found for ${key}`);
                                }
                            }

                            // Update server URLs in versioned reactor files if version is specified
                            if (apiOptions.version) {
                                console.log(`Version specified: ${apiOptions.version}. Updating server URLs in versioned reactor files.`);
                                // Construct the path to the versioned reactors directory
                                // Pattern: docusaurus/versioned_docs/version-{version}/developer/Reactors/
                                const versionedReactorsDir = path.join(
                                    context.siteDir,
                                    'versioned_docs',
                                    `version-${apiOptions.version}`,
                                    'developer',
                                    'Reactors'
                                );
                                await updateVersionedReactorServers(apiOptions.version, versionedReactorsDir, apiOptions.MONOLITH_API_URL);
                            }

                        } catch (error) {
                            console.error(`Error processing API ${key}:`, error);
                        }
                    }

                    console.log("Documentation generation completed.");
                });

            cli
                .command("clean-reactor-docs")
                .description("Clean generated Reactor API documentation")
                .option("--output-dir <dir>", "Output directory for generated docs")
                .action(async (instance) => {
                    console.log("Cleaning Reactor API documentation...");
                    const options = instance.opts();
                    console.log("instance:", options);

                    // Process each API configuration
                    for (const [key, apiOptions] of Object.entries(config as Record<string, APIOptions>)) {
                        console.log(`Processing API: ${key}`);
                        console.log(`Output Directory: ${apiOptions.outputDir}`);

                        await cleanAllReactors(apiOptions);
                    }

                    console.log("Clean up completed.");
                });
        },


    };
}


async function createSidebarFile(outputDir: string, reactors: AllReactors) {
    // Import necessary modules
    const fs = await import("fs/promises");
    const path = await import("path");

    // Ensure output directory exists
    ensureDirectoryExists(outputDir);

    // Import the generateSidebar function from the sidebars module
    let sidebarSliceTemplate = `import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";\n\n`;
    sidebarSliceTemplate += `const sidebar: SidebarsConfig = {{{slice}}};\n\n`;
    sidebarSliceTemplate += `export default sidebar.reactorsidebar;\n`;

    // Generate the sidebar structure
    const sidebar = generateSidebar(reactors);

    const view = render(sidebarSliceTemplate, {
        slice: JSON5.stringify(
            { reactorsidebar: sidebar },
            { space: 2, quote: '"' }
        ),
    });

    // Define the output path for the sidebar file
    const sidebarPath = path.join(outputDir, "sidebar.ts");
    try {
        await fs.writeFile(sidebarPath, view, "utf8");
        console.log(`Successfully created/updated "${sidebarPath}"`);
    } catch (err) {
        console.error(`Failed to write "${sidebarPath}"`, err);
    }
    console.log(`Sidebar file created at: ${outputDir}`);
}

function generateSidebar(reactorData: AllReactors): ProcessedSidebar {

    let schemasGroup = groupByReactors(reactorData);
    //console.log("Generated sidebar:", JSON.stringify(schemasGroup, null, 2));
    return schemasGroup;

}

/**
 * Generate sidebar structure for grouped reactors
 * Each category becomes a single document entry
 */
function generateGroupedSidebar(reactorData: AllReactors): SidebarItemDoc[] {
    return Object.entries(reactorData).map(([category, items]) => {
        // Create safe ID from category name
        const categoryName = category.split('.').pop() || category;
        const safeName = category.toLowerCase().replace(/\./g, '-').replace(/[^a-z0-9-]/g, '-');

        return {
            type: "doc" as const,
            id: `Reactors/${safeName}`,
            label: categoryName,
        };
    });
}

function groupByReactors(reactors: AllReactors): SidebarItemCategory[] {
    return Object.entries(reactors).map(([reactorName, items]) => ({
        type: "category" as const,
        label: reactorName.split('.').pop() || reactorName,
        collapsible: true,
        collapsed: true,
        items: items.map((item: any): SidebarItemDoc => {
            // Use the same naming logic as in generateReactorMarkdown
            const fullName = item.name || '';
            const reactorName = fullName.split('.').pop() || fullName;
            const safeName = reactorName.toLowerCase().replace(/[^a-z0-9]/g, '-');

            return {
                type: "doc",
                id: `Reactors/${fullName.replace(/\./g, '-')}`, // Use dashes instead of dots
                label: item.name.split('.').pop(),
            };
        }),
    }));
}