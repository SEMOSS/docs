import * as fs from 'fs';
import * as path from 'path';

export interface ReactorInfo {
  id: string;
  title: string;
  description: string;
  requiredKeys: string[];
  optionalKeys: string[];
  usage: string;
}

/**
 * Loads and parses a JSON template file
 */
export function loadJsonTemplate(apiSpecPath: string): any {
  try {
    // Load from the reactors directory JSON template
    const jsonTemplatePath = path.resolve(apiSpecPath);


    if (fs.existsSync(jsonTemplatePath)) {
      const jsonContent = fs.readFileSync(jsonTemplatePath, 'utf-8');
      return JSON.parse(jsonContent);
    }

    // Fallback to default JSON template if file doesn't exist
    return getDefaultTemplate();
  } catch (error) {
    console.error('Failed to load JSON template:', error);
    return null;
  }
}



/**
 * Returns the default template as a JavaScript object
 */
function getDefaultTemplate(): any {
  return {
    openapi: "3.0.1",
    info: {
      title: "SEMOSS",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:9999/Monolith_War"
      }
    ],
    paths: {
      "/engine/runPixel": {
        post: {
          tags: ["engine"],
          summary: "Execute Pixel synchronously",
          description: "Executes a Pixel expression and returns the full result in the response.",
          operationId: "runPixelSync",
          "x-codeSamples": [
            {
              lang: "Python",
              label: "SEMOSS SDK",
              source: `from semoss import Insight
insight = Insight(insight_id = 'insight_id')
insight.run_pixel("\${usage}")`
            },
            {
              lang: "JavaScript",
              label: "SEMOSS SDK",
              source: `const { actions } = useInsight();

const ask = (question) => {
    const { pixelReturn } = await actions.run(
        "\${usage};"
    );

    // get the message
    const message = pixelReturn[0].output.response;
    console.log(message);
};`
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/x-www-form-urlencoded": {
                schema: {
                  title: "RunPixelRequest",
                  required: ["expression"],
                  type: "object",
                  properties: {
                    expression: {
                      type: "string",
                      description: "expression=\${usage};",
                      example: "\${usage};"
                    },
                    insightId: {
                      type: "string",
                      description: "Insight identifier. Use 'new' to create a new insight or omit for temporary.",
                      example: "bf235853-86b7-483f-a0a5-ae489bfed97b"
                    },
                    tz: {
                      type: "string",
                      description: "Client timezone ID",
                      example: "America/New_York"
                    },
                    dropLogging: {
                      type: "boolean",
                      description: "If true, drop console logging after run",
                      example: true
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Pixel executed",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      status: "success",
                      data: {
                        result: "Pixel execution output"
                      }
                    }
                  },
                  examples: {
                    "Sample Response": {
                      description: "Sample Response",
                      value: {
                        status: "success",
                        data: {
                          result: "Pixel execution output"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              description: "Invalid request",
              content: {
                "application/json": {}
              }
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {}
              }
            }
          }
        }
      }
    }
  };
}

/**
 * Loads template from either JSON or YAML file (with preference for JSON)
 */
export function loadAPISpectTemplate(apiSpecPath: string): any {
  // Try JSON first
  const jsonTemplate = loadJsonTemplate(apiSpecPath);
  if (jsonTemplate) {
    return jsonTemplate;
  }
  // Return default template if neither file exists
  return getDefaultTemplate();
}

/**
 * Processes the template with reactor-specific information
 */
export function processTemplate(template: any, reactorInfo: ReactorInfo, monolithApiUrl?: string): any {
  if (!template) {
    return null;
  }

  // Deep clone the template to avoid modifying the original
  const processedTemplate = JSON.parse(JSON.stringify(template));

  // Update the usage placeholder with the actual reactor usage
  const usage = reactorInfo.usage || buildDefaultUsage(reactorInfo);

  // Function to recursively replace placeholders in the template
  const replacePlaceholders = (obj: any): any => {
    if (typeof obj === 'string') {
      return obj.replace(/\$\{usage\}/g, usage);
    } else if (Array.isArray(obj)) {
      return obj.map(replacePlaceholders);
    } else if (typeof obj === 'object' && obj !== null) {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = replacePlaceholders(value);
      }
      return result;
    }
    return obj;
  };

  const finalTemplate = replacePlaceholders(processedTemplate);

  // Replace the first server URL with monolithApiUrl if provided
  if (monolithApiUrl && finalTemplate.servers && Array.isArray(finalTemplate.servers) && finalTemplate.servers.length > 0) {
    finalTemplate.servers[0].url = monolithApiUrl;
  }

  // Update operation metadata
  if (finalTemplate.paths && finalTemplate.paths['/engine/runPixel'] && finalTemplate.paths['/engine/runPixel'].post) {
    console.log(`Updating OpenAPI template with reactor info: ${reactorInfo.title}`);
    const operation = finalTemplate.paths['/engine/runPixel'].post;
    operation.summary = `Execute ${reactorInfo.title} Reactor`;
    operation.description = reactorInfo.description || `Executes the ${reactorInfo.title} reactor and returns the result.`;
  }

  return finalTemplate;
}



/**
 * Builds a default usage string from reactor info
 */
function buildDefaultUsage(reactorInfo: ReactorInfo): string {
  const allParams = [...reactorInfo.requiredKeys, ...reactorInfo.optionalKeys];
  if (allParams.length === 0) {
    return `${reactorInfo.title}()`;
  }

  const paramString = allParams.map(key => `${key}=[<${key}>]`).join(', ');
  return `${reactorInfo.title}(${paramString})`;
}






/**
 * Generates the complete compressed API metadata for a reactor
 */
export function generateReactorApiMetadata(reactorInfo: ReactorInfo, apiSpecPath: string): string {
  try {
    const template = loadAPISpectTemplate (apiSpecPath);
    const processedTemplate = processTemplate(template, reactorInfo);
    return JSON.stringify(processedTemplate);
  } catch (error) {
    console.error('Failed to generate reactor API metadata:', error);
    return '';
  }
}

export function generateGenericReactorApiMetadata(apiSpecPath: string, monolithApiUrl: string): string {
  const reactorInfo = {
    id: "generic",
    title: "ReactorName",
    description: "Generic Reactor Description",
    requiredKeys: ["key1"],
    optionalKeys: ["key2"],
    usage: "ReactorName(key1=[<key1>], key2=[<key2>])"
  };
  const template = loadAPISpectTemplate(apiSpecPath); 
  const processedTemplate = processTemplate(template, reactorInfo, monolithApiUrl);
  return JSON.stringify(processedTemplate);
}

/**
 * Saves template as JSON file
 */
export function saveJsonTemplate(template: any, filePath: string): boolean {
  try {
    const jsonString = JSON.stringify(template, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf-8');
    return true;
  } catch (error) {
    console.error('Failed to save JSON template:', error);
    return false;
  }
}

