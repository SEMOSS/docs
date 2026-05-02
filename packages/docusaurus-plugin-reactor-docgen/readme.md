# Docusaurus Plugin: Reactor Documentation Generator

This plugin automatically generates documentation for SEMOSS reactors by fetching metadata from the SEMOSS API and creating comprehensive documentation pages with interactive "Try it out" functionality.

## Features

- **Automatic Documentation Generation**: Fetches reactor metadata from the SEMOSS API
- **Interactive API Testing**: Provides "Try it out" sections with code examples
- **Multi-language Examples**: Includes cURL, JavaScript, and Python examples
- **Interactive Form**: Allows users to fill in parameters and generate API requests
- **OpenAPI Integration**: Uses OpenAPI specification for accurate endpoint information

## Original Objective

Develop a brand new custom Docusaurus plugin that fetches metadata for all AbstractReactor subclasses from a specified API endpoint and generates documentation pages accordingly. This plugin will be independent of any previous code-scanning logic and will serve as a clean, maintainable solution for automated documentation.

### User Story

> **As a** documentation maintainer,  
> **I want** a new Docusaurus plugin that retrieves reactor class metadata from an API,  
> **So that** documentation pages are generated dynamically and kept in sync with the latest data provided by the backend.

## Acceptance Criteria

### Core Requirements

- [ ] A new Docusaurus plugin package is created (e.g., `docusaurus-plugin-reactor-api-docs`)
- [ ] The plugin is configurable with the API endpoint URL and authentication (if needed)
- [ ] On build, the plugin fetches all reactor metadata from the API (expects a structured JSON response)
- [ ] The plugin generates a documentation page for each reactor class, using the metadata fields
- [ ] The plugin handles API errors gracefully and provides meaningful build-time feedback
- [ ] The generated docs are integrated into the Docusaurus sidebar/navigation
- [ ] Documentation updates automatically when the API data changes and the site is rebuilt




## Technical Requirements

### Plugin Initialization
- Accepts configuration for API endpoint, credentials, and output directory

### API Integration
- Fetches metadata via HTTP GET (or as specified)
- Supports pagination or batching if required by the API

### Content Generation
- Creates a Markdown/MDX file for each reactor class using the metadata
- Supports templating for consistent formatting

### Error Handling
- Logs and fails gracefully on API or data issues

### Documentation
- Provides setup and usage instructions for maintainers




## Success Metrics

- ✅ Plugin is installable and configurable in any Docusaurus project
- ✅ All reactor class documentation is generated solely from API data
- ✅ Documentation is accurate, up-to-date, and easy to navigate

## Next Steps

1. **Design** the API response schema for reactor metadata
2. **Scaffold** the new Docusaurus plugin project
3. **Implement** API fetching and content generation logic
4. **Test** with sample API data and integrate into the documentation site
5. **Document** plugin usage and configuration for the team

---

## Configuration Options

The plugin will support the following configuration options in `docusaurus.config.js`:

```javascript
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-reactor-api-docs',
      {
        // API endpoint URL OR static file path
        apiEndpoint: 'https://api.semoss.org/reactors',
        // Alternative: use a static JSON file
        // apiEndpoint: 'path/to/reactors.json',
        // apiEndpoint: './static/reactor-data.json',
        
        authToken: process.env.API_AUTH_TOKEN, // Optional, only for API endpoints
        outputDir: 'docs/reactors',
        templatePath: './templates/reactor.mdx', // Optional custom template
        sidebarPosition: 'auto', // or specific number
        enableCache: true, // Cache API responses during development
        retryAttempts: 3,
        timeout: 10000, // 10 seconds
      },
    ],
  ],
};
```

## New Feature: "Try It Out" Functionality

This plugin now includes comprehensive "Try it out" sections for each reactor, powered by the OpenAPI specification (`reactorURLSpec.json`).

### Configuration

Configure the plugin in your `docusaurus.config.js`:

```javascript
plugins: [
  [
    path.resolve(__dirname, './plugins/docusaurus-plugin-reactor-docgen'),
    {
      id: 'reactor-docs',
      docsPluginId: 'default',
      config: {
        reactorAPI: {
          monolithURL: 'https://your-ai-core-instance.com/api',
          outputDir: path.resolve(__dirname, './docs/Reactors'),
          apiSpecPath: path.resolve(__dirname, './plugins/docusaurus-plugin-reactor-docgen/static/reactorURLSpec.json'),
        },
      },
    },
  ],
]
```

### Generated Documentation Features

#### 1. Code Examples
Each reactor documentation page includes:

- **cURL**: Command-line example for testing
- **JavaScript (Fetch API)**: Browser/Node.js example
- **Python (requests)**: Python example

Example for HelpJson reactor:
```bash
curl -X POST "https://workshop.semoss.com/semoss-ai-dev/Monolith/api/engine/runPixel" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: application/json" \
  -H "Authorization: Basic ****" \
  -d "expression=HelpJson()"
```

#### 2. Interactive Form (for reactors with parameters)
- Input fields for all required and optional parameters
- Live generation of API requests
- Copy-paste ready cURL commands

#### 3. Request Details
- Full endpoint information
- Required headers
- Request body format
- Authentication notes

### File Structure for "Try It Out"

```
src/
├── tryItOut.ts            # Main "Try it out" functionality
├── ReactorTester.tsx      # Interactive React component
└── tryItOut.css           # Styling for interactive elements
static/
└── reactorURLSpec.json    # OpenAPI specification for runPixel endpoint
```

### Key Functions

- `generateTryItOutSection()`: Main function that creates the entire "Try it out" section
- `generateCurlExample()`: Creates cURL command examples
- `generateFetchExample()`: Creates JavaScript fetch examples  
- `generatePythonExample()`: Creates Python requests examples
- `generateInteractiveSection()`: Creates interactive form for parameter input

### OpenAPI Integration

The `reactorURLSpec.json` file defines the `runPixelSync` endpoint:
- Endpoint: `/engine/runPixel`
- Method: `POST`
- Content-Type: `application/x-www-form-urlencoded`
- Required parameter: `expression` (the Pixel command)

### Customization

**Server URL**: Modify `reactorURLSpec.json` or pass custom URL to functions
**Styling**: Customize appearance by modifying `tryItOut.css`

## Data Sources

The plugin supports two data source types:

### 1. API Endpoints

Fetch reactor data from a live API:
- Set `apiEndpoint` to a URL (starts with `http://` or `https://`)
- Requires authentication via environment variables: `SEMOSS_USERNAME` and `SEMOSS_PASSWORD`
- Makes network requests during build time

### 2. Static JSON Files

Load reactor data from local files:
- Set `apiEndpoint` to a file path (does not start with `http://` or `https://`)
- Supports relative paths (resolved from project root) or absolute paths
- No authentication required
- Faster builds and works offline
- Version controlled with your documentation

**Example static file configuration:**
```javascript
{
  apiEndpoint: 'docusaurus/reactors/All.json', // relative path
  // or apiEndpoint: '/absolute/path/to/data.json', // absolute path
}
```

## Expected API Response Schema

```json
{
  "reactors": [
    {
      "className": "ExampleReactor",
      "description": "A sample reactor for demonstration",
      "category": "data-processing",
      "parameters": [
        {
          "name": "inputFile",
          "type": "string",
          "required": true,
          "description": "Path to input file"
        }
      ],
      "examples": [
        {
          "title": "Basic Usage",
          "code": "ExampleReactor(inputFile=\"data.csv\")"
        }
      ],
      "lastModified": "2025-09-10T12:00:00Z"
    }
  ]
}
```

