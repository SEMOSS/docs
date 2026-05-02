---
title: Pixel MCP
description: Create a Model Context Protocol (MCP) using Pixel reactors or Notebook-based MCP generation, understand execution modes, configure tool metadata, and validate MCP behavior within SEMOSS.
sidebar_label: Pixel MCP
sidebar_position: 3
tags:
  - MCP
  - Pixels
  - Pro Code Apps
  - SEMOSS
slug: /cookbook/pixel-mcp
---

import AppName from "@site/src/components/CustomFields";


## Overview

This recipe explains how to create a Pixel-based MCP tool in SEMOSSName. You can generate MCP tools in two ways:

1. Using the MakePixelMCP reactor in a Pro Code app.
2. Using the Notebook MCP Robot action to convert a notebook cell into an MCP tool.

Both approaches create an MCP manifest that exposes your Pixel logic as callable tools across SEMOSSName systems such as Playground.

### What is MCP

Model Context Protocol is a standardized way for AI models to access tools and data sources. MCP tools expose structured input schemas and tool actions that downstream AI systems can call securely.

## Setup

You need:

- Access to an SEMOSSName instance
- A Pro Code app or a Notebook environment
- Reactors or Pixel logic you want to expose as MCP tools

## Steps

### Create or Open a Pro Code App

Create a new Pro Code app or clone the template repository.

TODO: Insert screenshot of app creation  
`<!-- TODO: Add image showing Create App UI -->`

### Generate an MCP Using MakePixelMCP

Open the terminal inside the editor and run:

```pixel
MakePixelMCP(project=<your_project_id>, reactor=["ReactorOne", "ReactorTwo"], comment="optional comment", mcpExecution=["ask", "auto"])
```

Parameters:

- `project`: Project ID  
- `reactor`: List of reactors to expose  
- `comment`: Commit message when saving MCP files  
- `mcpExecution`: Execution mode per reactor (`ask`, `auto`, or `disabled`)  

After running it, the system generates:

- `/mcp/pixel_mcp.json`
- Tool metadata for each reactor
- MCP tag applied to your application

TODO: Insert screenshot of terminal running MakePixelMCP  
`<!-- TODO: Add MakePixelMCP terminal screenshot -->`

### Generate an MCP Using Notebook Robot

Inside a notebook:

1. Select a notebook cell.
2. Click the MCP Robot icon.
3. Provide a tool name and description.
4. Confirm MCP generation.

This creates an MCP tool from the Pixel inside that cell.

TODO: Insert screenshot of Robot button  
`<!-- TODO: Add Notebook Robot MCP icon screenshot -->`

### Recompile and Publish

Recompile reactors if using Pro Code. Publish changes so MCP metadata is pushed into version control.

### Deploy and Tag

Compile changes on your instance and deploy with persistence.  
The app will now appear with an MCP tag.

## Deep Dive

### How Pixel-Based MCP Works

Pixel MCP converts reactors or Pixel-defined logic into a JSON schema describing:

- tool name
- description
- input schema
- execution mode
- metadata

The input schema comes from:

- `getReactorDescription`
- `getDescriptionForKey`
- Reactor parameter definitions

If these are missing, the manifest will include placeholder descriptions.

### Execution Modes

- `ask`: Always ask before running  
- `auto`: Executes directly when called  
- `disabled`: Tool exists in manifest but cannot be executed  

### Notebook MCP Behavior

Notebook MCPs wrap the notebook cell Pixel code into a callable tool.  
Each tool represents one cell.  
The manifest in `/mcp/` updates automatically.

## Validation

- Confirm the `/mcp/pixel_mcp.json` file exists.
- Verify all tool names match reactor or cell identifiers.
- Ensure each tool has a valid input schema.
- Confirm execution modes appear under `_meta.SMSS_MCP_EXECUTION`.
- Validate that Playground can detect and register the MCP.

TODO: Insert screenshot of MCP appearing in Playground  
`<!-- TODO: Add MPC in Playground screenshot -->`

## Common Errors

### Missing Reactor Descriptions

If you do not implement:

- `getReactorDescription`
- `getDescriptionForKey`

then auto-generated descriptions will be vague.

### Mismatched mcpExecution Length

If the execution array is shorter than the reactor list, missing entries default to `ask`.

### Reactor Not Found

Occurs if the reactor name does not match the Java class name (minus the word “Reactor”).

### Notebook MCP Not Triggering

Occurs if the cell is empty or contains invalid Pixel syntax.

## Resources

- Pixel MCP JSON schema (generated in `/mcp/pixel_mcp.json`)
- Playground MCP integration
- Pro Code app terminal, notebook editor, and MCP tooling options
