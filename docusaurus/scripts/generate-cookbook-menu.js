const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '..', 'docs', 'Cookbook Recipes');
const outputPath = path.join(__dirname, 'output', 'cookbook-recipes.json');

const cookbookRecipeContent = [
    {
        name: "Award Generator",
        description: "This Award Generator app uses advanced LLMs to automate personalized award citation creation, allowing users to select models, award types, and input candidate details to generate high-quality, consistent recognition text easily",
        tags: ["AI automation", "award generation", "language models"],
    },
    {
        name: "Code Modifier",
        description: "A no/low-code app named Code Modifier, which uses AI to transform code snippets based on user instructions and selected programming languages, by offering instant modified code with a simple drag-and-drop UI",
        tags: ["code transformation", "no-code", "low-code", "AI automation"],
    },
    {
        name: "Creating a Vector Database",
        description: "A step-by-step instructions for setting up a vector database engine in the AI Core platform, including sample code in JavaScript, Python, and Java for creating and connecting vector databases tailored for AI applications",
        tags: ["vector database", "JavaScript", "Python", "Java"],
    },
    {
        name: "Policy Bot",
        description: "This \"Policy Bot\" app using the React framework and AI Core, enabling automated policy Q&A apps that answer user questions using company documents and LLMs. It covers setup and usage with examples in a Pro-Code Workflow.",
        tags: ["policy-automation", "React app", "AI Core", "pro-code"],
    },
    {
        name: "Frames",
        description: "The document explains how to use SEMOSS Frames to import, manage, and change the format of datasets within dashboards, using frame types like GRID, PY, R, and GRAPH for flexible data analysis and visualization. It includes step-by-step instructions for creating, updating, and transforming frames using UI actions and command-line pixels",
        tags: ["data frames", "GRID", "Python", "R"],
    },
    {
        name: "RAG",
        description: "This recipe details building an Agent Builder app with Retrieval Augmented Generation (RAG) in AI Core, integrating vector databases to ground LLM answers in enterprise documents for precise, context-aware Q&A.",
        tags: ["RAG", "vector database", "LLM"],
    },
    {
        name: "Guide for Building a JavaScript App (Node.js)",
        description: "This recipe demonstrates building a GenAI application using React on the AI Core platform. It covers project setup, app structure, front-end architecture, SDK integration, local development with Webpack, bundling, and deploying the app into the AI Core App Catalog.",
        tags: ["JavaScript", "React", "GenAI", "AI Core", "pro-code"],
    },
    {
        name: "RegressionTestingUsingToPDF",
        description: "The Regression testing using ToPDF does automated visual regression testing for dashboards with ToPDF reactor, which snapshots dashboards as PDFs before and after upgrades for comparison. It describes parameters, workflow steps, HTML templates, and automation tips for reliable UI validation",
        tags: ["regression testing", "ToPDF", "AI Core"],
    },
    {
        name: "Python MCP",
        description: "This recipe walks through building a Model Context Protocol (MCP) tool in Python for AI Core. It covers writing MCP-enabled Python functions, using execution decorators, generating the mcp.json manifest, and deploying and testing MCP tools within the platform.",
        tags: ["MCP", "Python", "AI Core", "functions"],
    },
    {
        name: "Python Function",
        description: "This guide explains how to create and expose a custom Python function in AI Core. It walks through setting up a function engine, defining function metadata using SMSS files, implementing the Python logic, packaging the engine, uploading it to AI Core, and testing it using execution pixels.",
        tags: ["Python", "function engine", "AI Core", "pro-code"],
    },

    {
        name: "Pixel MCP",
        description: "This recipe explains how to convert a Pro Code app into a Model Context Protocol (MCP) using the MakePixelMCP reactor. It covers MCP concepts, setup, reactor configuration, execution modes, and generating the pixel_mcp.json manifest for AI Core integration.",
        tags: ["MCP", "Pixel", "Pro Code", "AI Core"],
    },
    {
        name: "Simple Model Interaction",
        description: "This document guides users through interacting with AI Core models, showing how to send prompts and receive responses using unique model IDs in both code and notebook environments. It includes code examples and workflows for integrating various LLMs into applications for text generation, and various tasks.",
        tags: ["model interaction", "LLM", "pro-code", "Python"],
    },
    {
        name: "VanillaJS App Quickstart Guide",
        description: "This guide demonstrates how to rapidly build a GenAI app with VanillaJS on the SEMOSS platform, covering setup, AI Core integration, and calling LLMs for natural language or code generation. Designed for beginners, it details app structure, feature integration, and deployment essentials using plain JavaScript.",
        tags: ["VanillaJS", "GenAI", "SEMOSS", "quickstart"],
    },
    {
        name: "Streamlit App Quickstart Guide",
        description: "To build a GenAI app with Streamlit, outlining how to integrate AI Core resources and models for local prototyping and data science workflows. It covers setup, authentication, adapting Python code to use AI Core, and provides practical guidance for connecting Streamlit to enterprise AI infrastructure.",
        tags: ["Streamlit", "GenAI", "Python"],
    }
   
];

const files = fs.readdirSync(folderPath).map(file => {
  const stat = fs.statSync(path.join(folderPath, file));
  const fileContent = fs.readFileSync(path.join(folderPath, file), 'utf-8');
  const slugRegexPattern = `^slug:\\s*["']?.*\\b\\w+\\b.*["']?\\s*$`;
  const slugRegex = new RegExp(slugRegexPattern, 'm');
  const slugMatch =slugRegex.exec(fileContent);
  const title = file.replace(".mdx","").replace(".md", "");
  const fileData = cookbookRecipeContent.find(item => item.name === title);
  return {
    title: fileData ? fileData.name : title,
    size: stat.size,
    lastModified: stat.mtime,
    isDirectory: stat.isDirectory(),
    description: fileData ? fileData.description : "",
    difficulty: "",
    time: "",
    tags: fileData ? fileData.tags : [],
    url: slugMatch ? slugMatch[0].replace("slug:", "").replace('"', "").replace('"', "").replace("'","").replace("'","").replace("\/","").replaceAll("\r","").trim() : "",
  };
});

fs.writeFileSync(outputPath, JSON.stringify(files, null, 2), 'utf-8');
console.log('Cookbook Menu Generation completed');