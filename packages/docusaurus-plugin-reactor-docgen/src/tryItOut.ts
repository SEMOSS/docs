import * as fs from "fs";
import * as path from "path";
import { Reactor } from "./reactorapi/types";

interface OpenAPISpec {
    openapi: string;
    info: {
        title: string;
        version: string;
    };
    servers: Array<{
        url: string;
    }>;
    paths: Record<string, any>;
}

/**
 * Generate "Try it out" section for a reactor using the OpenAPI specification
 */
export function generateTryItOutSection(reactorData: Reactor, openAPISpecPath: string, serverUrl?: string, includeInteractive: boolean = true): string {
    // Extract reactor name from the full class name
    const fullName = reactorData.name || '';
    const reactorName = fullName.split('.').pop() || fullName;

    // Build the pixel expression for the reactor
    const keys = [
        ...(reactorData.requiredKeys || []),
        ...(reactorData.optionalKeys || []),
    ];
    
    // Create the basic reactor call - for HelpJson() it would just be "HelpJson()"
    let pixelExpression = `${reactorName}()`;
    if (keys.length > 0) {
        const keyParams = keys.map(key => `${key}=[<${key}>]`).join(', ');
        pixelExpression = `${reactorName}(${keyParams})`;
    }

    // Load and parse the OpenAPI spec
    let openApiSpec: OpenAPISpec;
    let defaultServerUrl = serverUrl || 'http://localhost:9999/Monolith_War';
    
    try {
        const specContent = fs.readFileSync(openAPISpecPath, 'utf8');
        openApiSpec = JSON.parse(specContent);
        
        // Use the server URL from OpenAPI spec if available, otherwise use the provided default
        if (process.env.MONOLITH_API_URL) {
            defaultServerUrl = process.env.MONOLITH_API_URL;
        }
        //else if (openApiSpec.servers?.[0]?.url) {
        //    defaultServerUrl = openApiSpec.servers[0].url;
       // }
    } catch (error) {
        console.error(`Error loading OpenAPI spec from ${openAPISpecPath}:`, error);
        // Continue with default server URL
    }

    // Extract the endpoint path - assuming it's the runPixel endpoint
    const runPixelPath = '/engine/runPixel';
    const fullEndpoint = `${defaultServerUrl}${runPixelPath}`;
    //console.log(`Using endpoint: ${fullEndpoint}`);

    const requiredKeys = reactorData.requiredKeys || [];
    const optionalKeys = reactorData.optionalKeys || [];

    return `
<TryItOutSection 
  reactorName="${reactorName}"
  requiredKeys={${JSON.stringify(requiredKeys)}}
  optionalKeys={${JSON.stringify(optionalKeys)}}
  endpoint="${fullEndpoint}"
  pixelExpression="${pixelExpression}"
  includeInteractive={${includeInteractive}}
  description="Fill in the parameters below to generate the API request."
/>`;
}



/**
 * Generate interactive API explorer section using React components
 */
export function generateInteractiveSection(reactorData: Reactor, endpoint: string): string {
    const fullName = reactorData.name || '';
    const reactorName = fullName.split('.').pop() || fullName;
    
    const requiredKeys = reactorData.requiredKeys || [];
    const optionalKeys = reactorData.optionalKeys || [];
    const allKeys = [...requiredKeys, ...optionalKeys];

    if (allKeys.length === 0) {
        return ''; // No parameters to show
    }

    // Generate pixel expression with parameter placeholders
    const paramPlaceholders = allKeys.map(key => `${key}=[<${key}>]`).join(', ');
    const pixelExpression = paramPlaceholders ? `${reactorName}(${paramPlaceholders})` : `${reactorName}()`;

    return `

<TryItOutSection 
  reactorName="${reactorName}"
  requiredKeys={${JSON.stringify(requiredKeys)}}
  optionalKeys={${JSON.stringify(optionalKeys)}}
  endpoint="${endpoint}"
  pixelExpression="${pixelExpression}"
  includeInteractive={true}
  description="Fill in the parameters below to generate the API request."
/>`;
}

