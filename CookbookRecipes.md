# Cookbook Recipes Style Guide

This guide defines the required structure, metadata, and writing rules for all Cookbook Recipes.  
Every recipe must follow this standard to ensure consistency, clarity, and maintainability.

## Required Front Matter

Every cookbook recipe must begin with a front matter block.

Front matter controls navigation, routing, search, and sidebar organization.

**Required fields:**

- title
- description
- slug
- sidebar_label
- sidebar_position

**Optional fields:**

- tags

**Front Matter Rules**

- `title` in front matter replaces any H1 in the body. Do not include `# <Title>` after front matter.
- Slugs must be lowercase, hyphenated, and stable.
- Filenames, titles, and slugs must align in meaning.
- Navigation must come from front matter — not filenames or folder structure.
- Recipes without complete front matter are considered incomplete.

## Required Recipe Sections

Each recipe must include the following sections in the same order:

### Overview
What the recipe does at a high level.  
Explain the goal and what the user will have at the end.

### Setup
List tools, permissions, environment requirements, and any files the user must have before starting.

### Steps
A clear, linear set of actions to complete the recipe.  
Screenshots may be included when UI actions are required, but the text must fully explain each step.

### Deep Dive
Explain the code, logic, or technical behavior behind the steps.  
Describe why certain actions are needed and what they accomplish.

### Resources
Summarize the final outcome and provide links or next steps.  
Include related recipes or documentation for deeper learning.

## Validation Requirements

Every recipe must make it clear how the user can confirm success.

**All recipes must include:**
- Expected outcomes after key steps
- A final “what success looks like” check
- Any logs, outputs, UI states, or results the user should see

Recipes must not rely on screenshots alone to convey validation.

## Tone & Clarity Rules

- Use a neutral, instructional tone.
- Avoid conversational filler or internal commentary.
- Do not assume prior knowledge beyond what is stated in Setup.
- Do not include TODOs, unresolved questions, or draft notes.
- Every step must clearly state what changes and why it matters.

## Screenshot Guidelines

Screenshots should:

- Support understanding, not replace explanations
- Highlight only what is required for the step
- Be updated when UI changes

Screenshots must not be the only way to verify success.

## Additional Notes

- Do not rewrite AI Core platform documentation.  
  Link to existing docs on creating apps, access tokens, insights, etc.
- Do not duplicate shared workflows (e.g., app upload steps).  
  Link to the canonical guide instead.
- Avoid repeating conceptual definitions across multiple recipes.

## Contributor Checklist (Built-in)

Every submitted recipe must satisfy:

- Full front matter included  
- All required sections present  
- Slug uses `/cookbook/<name>` format  
- No duplicate H1 heading  
- Clear validation steps included  
- Tone and clarity rules followed  
- No duplicated platform workflows  
