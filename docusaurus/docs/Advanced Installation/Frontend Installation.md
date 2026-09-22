---
sidebar_label: 'Front End Installation'
sidebar_position: 3
slug: "/advanced-installation/front-end-installation"
---

import AppName from "@site/src/components/CustomFields";

# Front End Installation Guide

## Overview

This guide covers how to build and run the <AppName /> frontend locally. The frontend connects to your locally running backend (Tomcat) server.

## Before you start
- **Terminal**: on Windows, use **Command Prompt** (`cmd`) or **PowerShell**. On Mac, use the **Terminal** app.
- You will run copy/paste commands. If you see “command not found”, double check you reopened your terminal after installing tools.
- If you run into an error at any point, check the [Troubleshooting Tips](Troubleshooting%20Tips.md) guide before continuing.

Before proceeding, make sure you have completed the backend installation for your platform:
- [Windows Back End Installation](Windows%20Back%20End%20Installation.md)
- [Mac Back End Installation](Mac%20Back%20End%20Installation.md)

## Prerequisites

### Node.js and pnpm

The frontend requires **Node.js v24**.

Verify by running:

```
node -v
npm -v
```

If you do not have Node v24 installed yet, install it with a version manager:

**Windows (nvm-windows):**
1. Download and run the latest `nvm-setup.exe` from: https://github.com/coreybutler/nvm-windows/releases
2. Close and reopen your terminal, then verify `nvm -v`
```
nvm install 24
nvm use 24
node -v
```

**Mac (nvm):**
1. Install Homebrew if needed: https://brew.sh/
2. Install nvm: `brew install nvm`
3. Add this to your `~/.zshrc`, then restart your terminal:
```zsh
export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix nvm)/nvm.sh" ] && \. "$(brew --prefix nvm)/nvm.sh"
[ -s "$(brew --prefix nvm)/etc/bash_completion.d/nvm" ] && \. "$(brew --prefix nvm)/etc/bash_completion.d/nvm"
```
```bash
nvm install 24
nvm use 24
node -v
```

Enable pnpm via Corepack:

```
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```
> Note: Corepack ships with modern Node.js (including Node v24). If `corepack` is not found, reinstall/upgrade Node and try again.

### Code Editor
You'll need a code editor. We recommend [Visual Studio Code](https://code.visualstudio.com/).

## Step 1: Clone the Frontend Repository

Navigate to your Tomcat `webapps` folder (replace `xx` with your Tomcat patch version):

**Windows:**
```
cd C:\workspace\apache-tomcat-11.0.xx\webapps
```

**Mac:**
```
cd ~/Documents/SEMOSS/workspace/apache-tomcat-11.*/webapps/
```

Clone the repository and rename it:
```
git clone https://github.com/SEMOSS/semoss-ui.git SemossWeb
```

Verify you are on the `dev` branch:
```
cd SemossWeb
git status
```

## Step 2: Install Packages

Open a terminal in the root of your `SemossWeb` folder and run:

```
pnpm install
```

This will go through the `package.json` and download all necessary packages. The install may take some time as it resolves dependencies for all sub-packages.

## Step 3: Build the Frontend

From the root of your `SemossWeb` folder, run:

```
pnpm build
```

This builds all libraries and packages and generates the `dist` output needed to serve the frontend. It may take a while to complete.

> **Troubleshooting:** If the build fails due to timeout or memory errors, you can build each piece individually instead. Navigate into each of the following directories and run `pnpm build` from within them one at a time: `libs/ui`, `libs/renderer`, `libs/sdk`, then `packages/client`.

## Step 4: Access Your Local Server

Before proceeding, ensure your Tomcat backend server is running. You can verify by navigating to:

```
http://localhost:9090/Monolith/api/config
```

If you see a JSON response, your backend is up and running.

With your backend running, seed yourself as an admin. Open your browser and navigate to:

```
http://localhost:9090/Monolith/setAdmin/
```

Type in the username you want to use with <AppName /> and submit.

Once the build has completed, open your browser and navigate to:

```
http://localhost:9090/SemossWeb/
```

At the bottom of the page, click **Register new user**:
- Fill out the required fields
- Make sure the username you register with matches the username you typed into the admin setup page

Once registered, you can sign in using the same credentials.

Congratulations! You're all set to start using <AppName />!

## Updating the Frontend

We recommend updating your local frontend at least once a week to stay current with the latest features and fixes.

To pull the latest changes and update your local frontend:

1. Navigate to your `SemossWeb` folder and pull the latest code:

```
cd SemossWeb
git pull
```

2. Install any new or updated dependencies:

```
pnpm install
```

3. Rebuild:

```
pnpm build
```

Once the build completes, refresh your browser to see the updates.

## What's Next?
Check out one of the **App Use Case Quick Start guides** linked below to get a hands-on tutorial with your preferred frontend framework!
   - [React Quick Start Guide](../Cookbook%20Recipes/Guide%20for%20Building%20a%20JavaScript%20App%20(Node.js).md)
   - [Sample VanillaJS Use Case](../Cookbook%20Recipes/VanillaJS%20App%20Quickstart%20Guide.md)
   - [Sample Streamlit Use Case](../Cookbook%20Recipes/Streamlit%20App%20Quickstart%20Guide.md)