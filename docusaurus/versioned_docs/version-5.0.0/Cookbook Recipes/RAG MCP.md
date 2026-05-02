---
title: RAG MCP
description: Convert a RAG or Policy Bot application into a Model Context Protocol tool using Pixel-based MCP generation.
sidebar_label: RAG MCP
sidebar_position: 15
tags:
  - RAG
  - MCP
  - Pro Code Apps
  - SEMOSSName
slug: /cookbook/rag-mcp
---

import AppName from "@site/src/components/CustomFields";

## Overview

This tutorial walks you through the process of turning your RAG application into a Model Context Protocol (MCP) tool. MCP enables your app’s key functions to be easily and securely called by services across the SEMOSSName ecosystem, such as Playground.

### What is MCP?

Model Context Protocol (MCP) is a standardized framework developed by Anthropic and was introduced in November 2024. It enables AI models to seamlessly connect with external tools and data sources without requiring custom integrations for each platform.

## Setup

You will need:

- Access to a SEMOSS instance
- An existing pro code app deployed in a SEMOSS instance (follow this tutorial to create a [Policy Bot app](Policy%20Bot.md))

## Steps

**Note**: This guide is written specifically for a Policy Bot app built on Pixel/low-code within SEMOSSName.
If you want to MCP-enable another app, you can follow these same steps—just find your reactor keywords as described below.

### 1. Open Your App in Edit Mode

Launch the Policy Bot app in the SEMOSSName [editor](./../Building%20Apps/Pro%20Code%20Apps.md#edit-app)

### 2. Identify Your Reactor Names

In the Files section look for the `classes` directory.

Each reactor you want to MCP-enable is found under the `classes` directory.
Use the file names, minus the word `Reactor` as your reactor names. For example, `RunPolicyReactor.java -> RunPolicy`

![ReactorName](/img/RAGMCP/ReactorName.png)

### 3. Run the MakePixelMCP Command

In the [terminal](./../Building%20Apps/Pro%20Code%20Apps.md#terminal) of your app editor, run the following command, adjusting for your project and reactor names as needed. Reminder that project ID is your current App ID.

```pixel
MakePixelMCP(project=<your_project_id>, reactor=["RunPolicy", "LoadPolicy"], comment="optional comment", mcpExecution=["ask", "ask"])
```

This will generate the `/mcp/pixel_mcp.json` manifest and prepares your app for MCP integration. For the mcpExecution parameter, if they array is invalid or if the array isn't long enough, then it will default to "ask".

### 4. Recompile Reactors

Still in edit mode, [recompile your reactors](./../Building%20Apps/Pro%20Code%20Apps.md#recompile-reactors)  so all MCP changes are captured.

### 5. Publish Changes

[Publish](./../Building%20Apps/Pro%20Code%20Apps.md#publish) your updated app code so the changes take effect.

### 6. Compile and Deploy on Your Instance

- Go to your app’s Settings.
- Click Compile Changes on This Instance.
- Choose Deploy and Persist Changes to make your updated app (now MCP-enabled) live.

![CompileandDeploy](/img/RAGMCP/CompileandDeploy.png)

### 7. Tag the App as MCP

- Return to the app library/dashboard.
- Add the MCP tag to your Policy Bot app.

![TagAsMCP](/img/RAGMCP/TagAsMCP.png)

## Deep Dive

See the [Pixel MCP](Pixel%20MCP#Steps) recipe for a deep dive into the `MakePixelMCP` command.

## Resources

You should now have an MCP-Enabled RAG App, where the reactors are now securely exposed for SEMOSSName services, such as playground.

![PlaygroundMCP](/img/RAGMCP/PlaygroundMCP.png)

You should also now have a `pixel_mcp.json` that is similar to the following

```json
{
    "_meta": {"last_modified_date": "2025-12-15"},
    "tools": [
        {
            "inputSchema": {
                "type": "object",
                "title": "LoadPolicy_Arguments",
                "properties": {"no keys defined": {
                    "description": "No description present",
                    "title": "no keys defined",
                    "type": "string"
                }},
                "required": ["no keys defined"]
            },
            "name": "LoadPolicy",
            "description": "No description present",
            "_meta": {"SMSS_MCP_EXECUTION": "ask"},
            "title": "Load Policy"
        },
        {
            "inputSchema": {
                "type": "object",
                "title": "RunPolicy_Arguments",
                "properties": {"question": {
                    "description": "No description present",
                    "title": "question",
                    "type": "string"
                }},
                "required": ["question"]
            },
            "name": "RunPolicy",
            "description": "No description present",
            "_meta": {"SMSS_MCP_EXECUTION": "auto"},
            "title": "Run Policy"
        }
    ]
}
```
