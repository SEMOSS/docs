# ReactorDocGen YAML Template System

This document describes the updated ReactorDocGen system that uses YAML OpenAPI templates with compression for reactor documentation metadata.

## Overview

The ReactorDocGen system has been updated to:
1. Use a YAML OpenAPI specification as a template for all reactor APIs
2. Compress the YAML using gzip compression and base64 encoding
3. Store the compressed data in the `api` frontmatter field of reactor MDX files
4. Generate interactive documentation and code examples from this compressed API metadata

## Key Components

### 1. YAML Template System (`yamlTemplateUtils.ts`)

The core utility functions for processing YAML templates:

- **`loadYamlTemplate()`**: Loads the OpenAPI YAML template
- **`processYamlTemplate(template, reactorInfo)`**: Processes template with reactor-specific information
- **`compressYaml(yamlContent)`**: Compresses YAML using gzip and base64 encoding
- **`decompressYaml(compressedData)`**: Decompresses base64+gzip compressed YAML
- **`generateReactorApiMetadata(reactorInfo)`**: Generates compressed API metadata
- **`createReactorFileTemplate(reactorInfo, apiMetadata)`**: Creates complete MDX file content

### 2. Updated Components

- **`ReactorCodeGenerator.tsx`**: Simplified to generate HTTP request examples without Postman dependencies
- **`TryItOutSection.tsx`**: Interactive API testing component 
- **`utils.ts`**: Updated to handle both new `api` field and legacy `reactorapi` field

### 3. Generator Script (`testReactorGeneration.js`)

A Node.js script to convert existing reactor files to use the new compressed format:

```bash
node testReactorGeneration.js
```

## YAML Template Structure

The base template (`reactorPixelOAS.yaml`) includes:

```yaml
openapi: 3.0.1
info:
  title: AI Core
  version: 1.0.0
servers:
  - url: http://localhost:9999/Monolith_War
paths:
  /engine/runPixel:
    post:
      tags: [engine]
      summary: Execute Pixel synchronously  
      description: Executes a Pixel expression and returns the full result
      operationId: runPixelSync
      x-codeSamples:
        - lang: Python
          source: |
            from semoss import Insight
            insight = Insight(insight_id = 'insight_id')
            insight.run_pixel("${usage}")
        - lang: JavaScript  
          source: |
            const { actions } = useInsight();
            const { pixelReturn } = await actions.run("${usage};");
      requestBody:
        required: true
        content:
          application/x-www-form-urlencoded:
            schema:
              title: RunPixelRequest
              required: [expression]
              properties:
                expression:
                  type: string
                  description: "expression=${usage};"
                  example: "${usage};"
                # ... other properties
      responses:
        '200':
          description: Pixel executed
          # ... response schema
```

The `${usage}` placeholder gets replaced with the actual reactor usage string.

## New Reactor File Format

Reactor MDX files now use the `api` frontmatter field with compressed OpenAPI data:

```markdown
---
id: prerna-reactor-model-LLM
api: H4sIAAAAAAACA81W227bOBB991cM8mIbqCynSbaJ0gTotgXWu8m2iNtdFEUQ0NJIYiuRKknFdtL8e4e6xJKtOMXmoasnajjXQ84ZygwFy7gHe6PxaLfHRSi9HoDhJkEPXk3gtVRIgmtUmkvhwS7pjXsalZVYVQdylXgQG5N5rptInyWx1MY7os89l0Im3MRX/zLVy5iJCxMXRcQFuioX7/kCEysDyKxVsaL4LNL12oYoDSqBztOUqaUHbxfo5wbh7OwcLpD5RqpKJUDtK56ZIuUPMdeQoollALTKNQZgJFB0YKIwNrgwToQCFbMmQDUklSeZVcJJ4EGd8HQp/Gp/4fgywClLswRbKSdMRB68X1JYcS8GEs+oYJi+PX83ncL0zV+NPS1z5RPs3xsygFDJFDSmUmvgaSaVgYnQPIpNS42XMjipdweV5IoHJOyv/vrDLsMRFXeV2eoGO4TJoIT85PPLcnF6+Qx8ScCLgGTVygoJzj+4JuiXJF/92K2MKZb+w5IcNe01/kpnwsJeOCtWp5fDneEGgH+yazYtzvJJIFIMbeAW6JLQWWq4I0go2Rqq4XGvQ53pr6Q2+EYZW6shnJzCbUuv6brA7gJNrkThns0ZN3VAi+5gw9R+vwzs452NfNZhsJ/rQoQGTIzUQ1qzCB9AoNqlyhtIfB5fjmRuspzuF+qMFPG4014mOEpkNKi8DNtad/WvwuI0fpfBctVsVsgVUoMala/SK0oVxmt4YlmWcL/oZ3fhzOdzJ5QqdYjBUNg+DrxWWO3HmDJvLeGKHC8qMrgoU1pTus9po1pis0VGYFg+Xfe8zMixnH1Bf91fpiwTGd4kmfpb+fM6rljpVBvFRdSx3aLKlaeTX3YtO3LERcGvHvx/kqpYcxI8FfKKgoAHdFd5yFGN4KNG6Auc9+2c8hUyGnIMSHDP8lKBTIle6PrS9LJTgSbiaBt0s/D53sHhwZ5z+NvshbN/uBc6bMwOHIb7h0ezEIOjF7MNe3Pz1PJeJ5zqop5J8UYKhMmbbUm+SlFRf7p/4/zqk1RfN3QDaoMzGdHBRw9nNpPEJkw8inxY8MWzwmlNQpCU3oGFBpWd+NvybfBNTW+N/uw/H4/7zTRb4QvyIFfFGybotehwnbfazPVFb3Z6N1VtpZRVHR0lasNMrumUc98nRujCkhnmdY40giJPTLtC+6wqB0GvM4cOWisfVfSyK4H1HjvPNf0O9Wvb5N05P17vtop/uub+/rYrMRGUIT3X1MZI+bk7Abd3zUi7D0f6KFhOL1PFb/7D1bNhfgC/vFgWOQwAAA==
title: "LLM"
sidebar_label: "LLM"
description: "This method is used to run an LLM text-generation call"
---

import { TryItOutSection } from '@site/src/components/ReactorDocgen';

# LLM

**Description:** 
```markdown
This method is used to run an LLM text-generation call
```

## Required Keys
- **engine**
- **command**

## Optional Keys
- **useHistory**
- **paramValues**  
- **context**

## Usage
```javascript
LLM(engine=[<engine>], command=[<command>], useHistory=[<useHistory>], paramValues=[<paramValues>], context=[<context>])
```

<TryItOutSection 
  reactorName="LLM"
  requiredKeys={["engine","command"]}
  optionalKeys={["useHistory","paramValues","context"]}
  endpoint="http://localhost:9999/Monolith_War/engine/runPixel"
  pixelExpression="LLM(engine=[<engine>], command=[<command>], useHistory=[<useHistory>], paramValues=[<paramValues>], context=[<context>])"
  includeInteractive={true}
  description="Fill in the parameters below to generate the API request."
/>
```

## Benefits

1. **Consistency**: All reactor APIs follow the same OpenAPI specification structure
2. **Compression**: Large API specifications are compressed to save space in frontmatter
3. **Interactivity**: Rich interactive API testing components
4. **Code Generation**: Automatic generation of code examples in multiple languages
5. **Maintainability**: Single YAML template can be updated to affect all reactors
6. **Standards Compliance**: Uses OpenAPI 3.0 specification

## Migration Process

To convert existing reactor files:

1. Run the generation script: `node testReactorGeneration.js`
2. The script parses existing MDX files and extracts reactor information
3. Generates compressed OpenAPI metadata using the YAML template
4. Creates updated MDX files with the new `api` field

## Files Modified

- `src/components/ReactorDocgen/yamlTemplateUtils.ts` (NEW)
- `src/components/ReactorDocgen/utils.ts` (UPDATED)
- `src/components/ReactorDocgen/ReactorCodeGenerator.tsx` (SIMPLIFIED) 
- `src/components/ReactorDocgen/TryItOutSection.tsx` (EXISTING)
- `src/components/ReactorDocgen/index.ts` (UPDATED)
- `reactors/reactorPixelOAS.yaml` (NEW TEMPLATE)
- `testReactorGeneration.js` (NEW GENERATOR)
- `docs/Reactors/prerna-reactor-model-llm-updated.mdx` (EXAMPLE OUTPUT)

## Next Steps

1. Convert all existing reactor MDX files to use the new format
2. Update the YAML template as needed for specific reactor requirements
3. Enhance the interactive testing components
4. Consider adding validation for the compressed API metadata
5. Add support for reactor-specific API customizations