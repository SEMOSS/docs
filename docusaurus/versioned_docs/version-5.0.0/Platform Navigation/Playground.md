---
sidebar_position: 1
sidebar_label: Playground
description: Detailed documentation for the SEMOSSName Playground, including purpose, design philosophy, UI walkthrough, and real-world usage scenarios.
tags: [playground, system-apps, semoss, ai, prompts]
---

import AppName, {ShowVideoTag, WrapVariable} from "@site/src/components/CustomFields";

# Playground

The **Playground** is an interactive SEMOSSName System App created to help users test, refine, and evaluate prompts across a wide range of AI models. Whether you are experimenting with text generation, summarizing documents, reasoning through workflows, or generating images, the Playground provides a controlled environment where you can explore model behavior and understand the effects of prompt variations without writing any code.

The Playground serves as a unified space for performing experiments with AI models integrated through SEMOSSName. It is designed with simplicity, clarity, and power in mind, allowing users to:

- Test individual prompts and compare outputs across different models.
- Upload documents and interact with their content.
- Adjust underlying LLM parameters such as instructions, temperature, and token limits.
- Switch between conversation modes such as **Ask** and **Plan** to explore different reasoning styles.
- Extend model capabilities through MCP (Model Context Protocol) tools.

AI prompt behavior is highly dependent on both the phrasing of the prompt and the characteristics of the model. Before committing prompts to automation flows, dashboards, agents, or business processes, users need a safe space to iterate quickly.

This makes the Playground valuable for prototyping AI-driven features, validating prompt designs, and learning how different models behave before integrating them into larger workflows or products.

## Accessing the Playground

You can access the Playground directly from SEMOSSName. When you arrive on the SEMOSSName landing page, click the **Build** button at the top right. This opens the App Library.

![SEMOSSName Landing Page](/img/PlatformNavigation/Playground/FromAICoreMainScreen.png)

In the App Library, look for the feature card titled **“Experiment in our Playground™”**. This card is the entry point to the Playground.

![Try Playground](/img/PlatformNavigation/Playground/Clickonthebuildbutton.png)

Click **Try it out**, and you will be taken straight to the Playground main screen.

## Interface Walkthrough

The Playground interface is structured to be intuitive and minimal while still offering advanced controls. Below is a breakdown of each component.

![Playground Main Screen](/img/PlatformNavigation/Playground/PlaygroundMainScreen.png)

When you open the Playground, the interface loads into a ready-to-use chat workspace with all primary UI components visible. The layout consists of the following elements:

**Left Sidebar** - This panel provides navigation for Rooms, Workspaces, and recent sessions. Here you can create a new room, switch between existing rooms, or open the Workspace Manager.

**Main Prompt Area** -  The central input field where you type prompts. This area also displays the conversation history for the active room.

**Mode Switcher** - A toggle control above the prompt area that allows you to switch between Ask mode and Plan mode.

**Configuration Menu** - Accessible through the settings icon near the prompt field. This menu includes model selection, system instructions, MCP tool configuration, temperature settings, and max token limits.

**Attachment Control** - A file upload button for adding PDFs, images, or text documents to the session.

**Voice Input Control** - A microphone icon for recording voice input. The recorded audio is converted to text and inserted into the prompt field.

**Workspace Indicator** - If a workspace is active, its name appears near the mode switcher. This helps you see when workspace-specific instructions or MCP tools are applied.

This layout allows you to start interacting immediately. All essential controls for prompting, configuring the model, attaching files, and managing context are available on a single screen, reducing setup time and simplifying the overall workflow.

## Sidebar & Rooms

The sidebar serves as the primary navigation panel within the Playground. It provides quick access to Rooms, Workspaces, and recent activity, allowing you to switch contexts without losing progress. The design keeps all active conversations and reusable environments within reach while maintaining a clean, unobtrusive layout.

![Sidebar – Workspace Manager](/img/PlatformNavigation/Playground/Workspace.png)

### Sidebar structure

The sidebar is divided into dedicated sections that help you organize experiments efficiently:

- **Search bar** - Use this to locate existing rooms or workspaces quickly, especially when working across many sessions.
- **New** - Creates a new room with a blank chat state. This is useful when you want to start fresh without carrying over context from previous conversations.
- **Workspaces** - Opens the Workspace Manager, where you can create, edit, and launch structured work environments with predefined instructions or MCP tools.
- **Recents** - Displays the list of recently accessed rooms, allowing you to resume ongoing experiments instantly.

The sidebar can also be collapsed to maximize the central workspace when needed.

### Rooms

Rooms function as persistent conversation threads. Each room maintains its own message history, attachments, and model configuration. This ensures that different lines of experimentation remain isolated and easy to revisit.

Rooms are particularly useful when you:

- Test multiple prompt versions in parallel  
- Compare results across models or configurations  
- Explore different approaches to the same task  
- Maintain long-running conversations for iterative refinement  

Creating a new room initializes a clean workspace, while reopening an existing room restores its entire context.

If no rooms are available, the sidebar displays **“No rooms found”** until you create your first room.

### Navigation

Navigation between rooms and workspaces is seamless. You can switch to any room from the Recents list, start a fresh session using **New**, or launch a workspace-backed session directly from the Workspace Manager.

![Workspace Switching](/img/PlatformNavigation/Playground/WorkspacesSwitchMode.png)

When you open a workspace, the Playground loads its configuration automatically. If the workspace includes MCP tools, they become available in the configuration menu for immediate use. You can see the active workspace reflected above the prompt area in the switch mode panel.

![Using Workspace](/img/PlatformNavigation/Playground/Usingtheworkspace.png)

This model allows you to move quickly between conversations, structured environments, and different experimentation threads without losing context or configuration.

## Workspaces

Workspaces provide a structured environment for running consistent experimentation sessions inside the Playground. A workspace stores configuration elements such as system instructions, MCP tools, and metadata, allowing you to reuse the same setup across multiple chats without configuring everything manually each time.

![Workspace Manager](/img/PlatformNavigation/Playground/Workspace.png)

### Workspace structure

The Workspace Manager lists all available workspaces and provides actions for creating, editing, and launching workspace-based sessions. Each workspace entry displays its name, description, and available quick actions, including launching a new chat tied to that workspace.

Using workspaces helps you standardize tasks that require predefined parameters (such as specific instructions, expected output formats, or attached MCP tools). This reduces setup time and ensures consistent behavioral constraints across sessions.

### Creating a workspace

When you select **Create Workspace**, the Playground opens a configuration dialog where you define the workspace properties.

![Workspace Create Dialog](/img/PlatformNavigation/Playground/WorkspaceCreateDialog.png)

In this dialog, you can specify:

- **Name**. A descriptive identifier for the workspace.  
- **Description**. A short summary of the workspace’s purpose.  
- **Workspace Instructions**. System-level guidance that is applied automatically whenever you start a chat using this workspace.  
- **MCP Tools**. A selection of tools that extend the model’s capabilities and are enabled by default for the workspace.

After saving, the workspace appears in the Workspace Manager.

![Workspace Created](/img/PlatformNavigation/Playground/WorkspaceCreated.png)

### Using a workspace in a session

When you launch a workspace-attached session, the Playground loads all workspace-specific settings into the active chat. This includes instructions, model configuration, and any MCP tools assigned to the workspace.

![Using Workspace](/img/PlatformNavigation/Playground/Usingtheworkspace.png)

If the workspace includes MCP tools, they appear immediately inside the configuration panel as available integrations.

![Using Workspace MCP](/img/PlatformNavigation/Playground/UsingWorkspaceMCP.png)

This allows you to start working with tools such as Python execution, external API access, or structured automation without performing any additional setup.

### Switching workspaces

You can switch workspaces within the chat interface using the workspace selector displayed near the mode switcher. Changing the workspace updates the active configuration automatically.

![Workspace Switcher](/img/PlatformNavigation/Playground/WorkspacesSwitchMode.png)

This makes it easy to move between different testing environments, such as a documentation workspace, a Python-driven analysis workspace, or an automation-oriented setup.

Workspaces provide a repeatable, controlled foundation for experimentation and help maintain consistency when you work across multiple tasks or collaborate with other users.

## Prompt Area

### Mode Switching (Ask / Plan)

![Switch Mode](/img/PlatformNavigation/Playground/WorkspacesSwitchMode.png)
![Switch Mode Plan](/img/PlatformNavigation/Playground/SwitchMode_Plan.png)

#### Ask Mode

Ask Mode is the default conversational mode, ideal for natural, fluid interactions with the model. This mode is best suited for:

- General Q&A
- Simple summaries
- Rapid exploration of prompt variations
- Drafting content or generating ideas

#### Plan Mode

Plan Mode introduces an experimental structured‑reasoning workflow. When enabled, the model responds with more deliberate, step-by-step thinking. This mode is ideal when you want:

- Multi-step reasoning
- Chain-of-thought-like structured breakdowns
- Process-oriented instructions
- Planning workflows before building them in SEMOSSName

Plan Mode helps you visualize how an AI might interpret instructions and break down a procedure.

### File Attachment

![Attach Document](/img/PlatformNavigation/Playground/AttachDocument.png)

The file attachment feature allows you to upload documents or assets directly into the Playground. Supported file types include:

- PDF files
- Images
- Text documents
- Data or structured text files

Once uploaded, the model can analyze and interpret the contents.

You can:

- Upload a long report and request a concise summary.
- Extract key themes or action items from a document.
- Ask the AI to convert file content into structured formats.
- Use images for captioning or text extraction (model-dependent).

This feature allows prompt testing in realistic scenarios using real-world data.

### Configuration Menu

![Configuration Menu](/img/PlatformNavigation/Playground/ConfigurationMenu.png)

The configuration menu gives you detailed control over how the selected AI model behaves. You can open it using the settings icon located near the prompt input area.

Each part of the configuration menu directly influences how the model processes your instructions and generates its responses

#### Model Selection

![Model Selection](/img/PlatformNavigation/Playground/ConfigMenuModelSeclection.png)

This dropdown lets you choose from a list of supported models. Different models are optimized for different tasks, and this menu helps you select the model that best fits your current experiment.

- Compare outputs between general-purpose and specialized models.
- Test prompts with a variety of reasoning, creative, and expressive capabilities.
- Switch to an image model like DALL·E to generate visuals.

Selecting a model immediately changes the engine that will process the next prompt.

#### System Instructions

![Instructions](/img/PlatformNavigation/Playground/ConfigMenu_UpdateInstrcutions.png)

System instructions define the model’s persona, constraints, tone, or operational behavior. This acts as a permanent guiding layer beneath user prompts.

Examples of how system instructions can be used:

- "You are a strict, compliance-focused assistant."
- "Always respond in JSON format unless instructed otherwise."
- "Use precise technical language suitable for engineering documentation."

This field allows you to create predictable, consistent behavior across multiple interactions.

#### MCP Tools

![Add MCP Tools](/img/PlatformNavigation/Playground/ConfigMenu_AddMCPTools.png)

The MCP (Model Context Protocol) Tools section allows you to extend the capabilities of the selected model by enabling it to interact with external systems, tools, or data sources. These tools enable the model to perform actions beyond text generation—such as searching external databases, triggering APIs, retrieving information, or executing predefined operations.

When you click the **+ Add Tools** button in the configuration panel, the **Add MCP** dialog appears.

#### Add MCP Dialog

![Add MCP Dialog](/img/PlatformNavigation/Playground/AddMCPTools.png)

The Add MCP dialog provides a list of available MCP tools that you can enable for use within the Playground session.

##### **Search Bar**

The search field at the top of the dialog allows you to quickly filter through the available MCP tools. This is especially useful when many tools are published through SEMOSSName.

You can type partial or full tool names, and the list automatically updates to match the query.

##### **Available Tools List**

Under the *Available Tools* section, you will find MCP tools that have been registered through SEMOSSName. Each tool can be selected to extend the AI model’s actions for your current session.

If no tools are available, the list will appear empty until tools are published in SEMOSSName.

##### **Creating New MCP Tools**

Clicking the **new** hyperlink in the description takes you directly to the **App Catalog** in SEMOSSName.

From there, you can:

- Create new MCP tools
- Publish tools to be consumed in Playground
- Manage existing tools and their configurations

This creates an integrated workflow between Playground experimentation and SEMOSSName tool management.

After selecting one or more tools, you can:

- Click **Save** to attach those tools to the Playground model session.
- Click **Cancel** to close the dialog without changes.

Once saved, the tools become immediately available for the LLM to invoke as needed when responding to your prompts.

##### What You Can Achieve With MCP Tools

Enabling MCP tools allows the LLM to:

- Perform real-time lookups
- Trigger external APIs
- Query enterprise systems
- Execute structured operations
- Enrich responses with up-to-date or system-specific data

This is especially useful when creating powerful prototypes of AI-driven automation or agent behavior directly within the Playground.

#### Temperature

The temperature slider controls the randomness of the model’s output. Lower temperatures produce more deterministic, factual responses, while higher temperatures generate more creative and varied results.

Explanation:

- **0.0 – 0.3:** Highly stable, concise responses.
- **0.4 – 0.7:** Balanced creativity and accuracy.
- **0.8 – 1.2:** Creative, exploratory, and unpredictable.

This gives users the flexibility to tune the expressive behavior of the model.

#### Max Tokens

Max tokens specify the maximum allowed length of the AI’s response. Increasing this value enables longer replies, while decreasing it enforces brevity.

You might adjust max tokens when:

- They need extremely concise summaries.
- They want detailed multi-paragraph explanations.
- They require long-form content generation.

## Using the Python MCP

The **Python Code Execution MCP** lets you run real Python code directly inside the Playground. After enabling it from the Configuration Menu, you can execute functions, validate logic, parse logs, transform data, and build quick prototypes without leaving the interface.

### Selecting the Python MCP in the Configuration Menu

To run Python code through the MCP, you first configure the model and the tools for your session.

1. Open the **Configuration Menu**.
2. Select a model such as **GPT-4o**, which supports tool invocation and code interpretation.
3. Let's keep the default **temperature** at **0.3** for our example
4. In the **MCPs** section, enable **Python Code Execution MCP**.
5. Once enabled, the MCP becomes available to execute Python code you send in the prompt window.

![Selecting Python MCP](/img/PlatformNavigation/Playground/RunningPythonProgramMCP.png)

After this setup, the Playground can evaluate Python functions and return actual execution results.

### Running a Python Program in the Playground

After enabling the MCP, you can send Python code directly in the prompt window.  
Here is a complete, working example that demonstrates how developers can prototype logic using the Playground.

#### Example: Extracting ERROR Lines from a Log File

This example defines a Python function, provides a sample log, and runs the function using the MCP.

```python
log_text = (
    "INFO Initializing module\n"
    "ERROR Failed to load configuration\n"
    "INFO Retrying connection\n"
    "ERROR Connection timeout after retry\n"
    "INFO Cleanup complete"
)

def extract_errors(log):
    lines = log.split("\n")
    return [line for line in lines if line.startswith("ERROR")]

extract_errors(log_text)
```

#### Output from the MCP

When you run the function in the Playground, the Python MCP executes the code in an isolated environment and returns the evaluated result. In this case, the MCP parses the log string, applies the filtering logic from the `extract_errors` function, and produces a list containing only the lines that begin with `"ERROR"`.

This confirms that the MCP executed the Python code correctly, processed the input as expected, and returned real output rather than a simulated response.

![Python MCP Response](/img/PlatformNavigation/Playground/PythonMCPLogParseResponse.png)

## What You Can Achieve in the Playground

The Playground is designed to support a broad set of real-world tasks that help you evaluate model behavior, validate ideas, and prototype workflows before building them into SEMOSSName. Below are the most common ways you can use it.

### Model Comparison

You can run the same prompt across different models to evaluate differences in:

- Tone
- Accuracy
- Creativity
- Technical depth
- Handling of nuance

This helps you determine which model is best suited for your downstream application or workflow.

### Prompt Engineering

The Playground gives you an environment where you can iteratively craft and refine prompts. Small changes in wording often produce significantly different outputs, and the interface makes it easy to test variations quickly before integrating them into agents, dashboards, or custom workflows.

### Document Processing

By uploading documents, you can:

- Generate concise summaries  
- Extract insights or structured information  
- Convert unstructured text into usable formats  
- Perform entity or metadata extraction  

This is especially useful when designing document-centric AI features.

### Workflow Prototype Design

Plan Mode helps you experiment with multi-step reasoning. You can simulate logic, test how the model breaks down complex tasks, and validate that the sequence of steps makes sense before automating anything in SEMOSSName.

### Image Generation

If you select an image generation model (such as DALL·E), you can:

- Produce quick visual concepts  
- Create draft illustrations or mockups  
- Generate diagrams or visual ideas for prototyping  

This allows design exploration without leaving the Playground.

## Example Use Cases

The following scenarios show how you can apply the Playground to practical, real-world tasks. These examples highlight how different feature-models, prompts, documents, and MCP tools work together to support common development and analysis workflows.

### Scenario 1: Choosing the Right Model for Reporting Workflows

You upload a policy document or a long report and run the same summarization prompt across multiple models. Reviewing the outputs side by side helps you choose the model that produces the clearest, most reliable executive summary for integration into your reporting or compliance workflows.

### Scenario 2: Validating Technical Instructions Before Automation

Before wiring instructions into a SEMOSSName automation flow, you use the Playground to test the prompt in Plan Mode. This lets you confirm that the model interprets each step correctly and that the reasoning aligns with your expected process.

### Scenario 3: Preparing Documentation or Developer Content

If you're generating API descriptions, installation notes, or architectural explanations, you can set strict system instructions and tune parameters like temperature. This produces deterministic, high-clarity content that you can later refine and publish.

### Scenario 4: Designing a Document Ingestion Feature

You test a variety of prompts using uploaded PDFs, logs, or reports to verify how well the model extracts fields or patterns. This helps you understand what preprocessing is needed and reduces downstream rework during integration.

### Scenario 5: Rapid Ideation for UI or Workflow Design

Using an image generation model, you quickly create rough UI sketches or systems diagrams. These outputs help you iterate through design decisions before committing to tools like Figma or code-level prototypes.
