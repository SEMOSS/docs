---
sidebar_label: "Pro Code App Creation"
sidebar_position: 4
slug: "/pro-code-app"
---

import AppName from "@site/src/components/CustomFields";

Pro code apps in SEMOSSName allow developers to create apps and publish their work in SEMOSSName. Pro code apps in SEMOSSName offers the highest level of flexibility and control, allowing for complex and highly customized solutions for specific business needs.

## Create a Pro Code App

To create a Pro Code app from the homepage

1. Click on **Build**
2. Go to the **Develop in code** card and click on **Get started**
![Build](../../static/img/Pro%20Code/CreateProCode.png)
3. Enter your app details:
![Create Pro Code App](../../static/img/Pro%20Code/CreateApp.png)

    - name: The name of the app
    - description: Description of the app
    - app image: You can add a custom image for your app
    - tags: When developing a new application, incorporating tags can significantly enhance both organization and navigation. These tags enable you to efficiently filter and locate the desired app within your entire library.
4. Click on **Create**. You will be redirected to your new app. SEMOSSName creates a default app for you to customize!
![Create Pro Code App](../../static/img/Pro%20Code/CreateSave.png)

## Edit App

SEMOSSName allows users to view and edit files in real time. You can edit your app files, manage your app settings, and publish your app.

To edit a file in your app

1. Open the app in SEMOSSName
2. Click on **Edit**
3. Open the **Files** menu.

![Edit Button](../../static/img/Pro%20Code/EditApp.png)


### Create a New File

![Create New File](../../static/img/Pro%20Code/CreateNewFile.png)

This button lets you create a brand new file within your project directory.
You'll be prompted to enter a filename, and the file will be added to the **version/assets/portals** directory.

### Create New Folder

![Create New Folder](../../static/img/Pro%20Code/CreateNewFolder.png)

Use this button to organize your code and assets by creating a new folder within your project.
Enter a name for the folder, and it will be added to the **version/assets/portals** directory.

### Edit a File
To edit a file, click on the file you want to edit. 
For example let's edit the default app created. To do this click on **portals/index.html**. SEMOSSName opens the file contents and allows you to edit the HTML!
![Edit HTML File](../../static/img/Pro%20Code/EditFile.png)

Save your work! If the file has been edited there will be a **\*** at the end of the file name. Click on the save button.
![Save HTML File](../../static/img/Pro%20Code/SaveFile.png)

The code editor allows you to edit files, to see the changes for your app you must [publish](#publish-files)  your changes!

### Publish Files

![Publish Files](../../static/img/Pro%20Code/PublishFiles.png)

This button allows you to make your current files available for use in your SEMOSS application.
Use it to save and "publish" your latest changes so the app can access and run updated code or assets.

When you click this button, it copies the current files from the editor into the SEMOSS app's runtime environment, making them active and usable.

### Recompile Reactors

![Recompile Reactors](../../static/img/Pro%20Code/RecompileReactors.png)

Click this option to rebuild or recompile your reactors—components in your app that handle complex logic or data updates.

Recompiling ensures any recent code changes to reactors are reflected in your running app.

### Upload Files

![Upload Files](../../static/img/Pro%20Code/UploadFiles.png)

Use this feature to add new files to your project from your computer.

![Upload to Portals](../../static/img/Pro%20Code/PortalsUpload.png)

Clicking the Upload button will prompt you to select local files for import into your app's portals folder. If the file(s) are zipped, they will be extracted upon upload by clicking the **unzip** option.

## File Structure
Pro code apps are built on custom files in the app. This is how we structure our app:

### Portals
In the file explorer panel with a folder named `portals`.

This portals folder is actually located inside the main assets directory that holds your app’s source files.
SEMOSSName allows you to navigate through your app files and folders.
<!-- TODO need to explain file structure here -->

![File Structure](../../static/img/Pro%20Code/FileStructure.png)

The file explorer displays all contents from the assets folder, with **portals** as one of its subfolders.
The assets folder is the core directory for your application code.

### Python
To add python files to your app, create a `py` folder and add your custom py files in this folder.

### Java
To add custom java reactor to your project, create a `java` folder. 
When you click Recompile reactors in the SEMOSS UI, SEMOSS compiles these and places .class files in the classes folder.

### Local Files
If you are editing and building locally, you can find these resources on your computer:

- Navigate to your semoss workspace folder `<your-semoss-workspace>/project/[YourAppName]_[your-app-id]/app_root/version/`.
- Within the version directory, you'll see the `assets` folder. This folder contains all your files
- The assets folder you interact with in the SEMOSS UI editor is the same folder you access directly in your local project directory.

## Terminal

Located in the bottom left corner of your SEMOSS app is the **terminal** icon:

![Terminal](../../static/img/Pro%20Code/Terminal.png)

The terminal allows you to run commands directly within your app environment. You can use the terminal to interact with your custom reactors, manage files, execute scripts, and perform environment operations.

You can switch between several terminal types to suit your workflow.

### Pixel

The Pixel terminal is a direct interface to work with, test, and interact with reactors and custom automation logic in SEMOSS.

### Python

The Python terminal gives you programmatic access to all SEMOSS capabilities, allowing you to automate workflows, integrate with external systems, and build custom AI-powered applications. You can also execute direct pixel commands from the Python terminal.

### R

Utilize R for data analysis and statistical computing.

### Shell

Run shell commands for system operations and automation.

## Settings

Click on the **Settings** icon to set the accessibility of the App.

![Settings Icon](../../static/img/Pro%20Code/Settings.png)

<!-- After making all the changes, you can **Preview** the App before saving and then **Save** it. You can also share the link of the App with other members or users as needed. -->

### Member Settings

![Member Settings](../../static/img/Pro%20Code/MemberSettings.png)

You can add or remove members from your app and choose whether you want to give **Author**, **Editor** or **Read Only** permission to any given member.

<!-- We can copy existing content for this -->
#### Pending Requests
<!-- We can copy existing content for this -->
Users can request access to your app if it is toggled as a **Discoverable App.** Such requests will be visible in **Pending Requests.**

![Pending Requests](../../static/img/Pro%20Code/Pending.png)

### Data Apps

This is the section where you can deploy or publish your app. Click on **Apps** in the side navigation bar and you will find a UI similar to below.

![App Settings](../../static/img/Pro%20Code/AppSettings.png)

#### Enable Publishing

To deploy or publish your app is to generate its shareable link. To do this, make sure your toggle for **Enable Publishing** is on.

#### Publish Portal

Simply click the **Publish** button to publish your app through the link in the box below.  

![Publish Project](../../static/img/Pro%20Code/PublishProject.png)

The generated link will contain your created app/project and you can share this with anyone.

#### Reactors

![Reactors](../../static/img/Pro%20Code/Reactors.png)

##### Compile Changes on this instance

When clicked, this button compiles and deploys any changes made to **custom reactors** within the SEMOSS application instance. It ensures that the latest reactor logic is active, allowing the app to respond to events according to your updated custom rules.

![SuccessfullyRecompiled](../../static/img/Pro%20Code/SuccessfullyRecompiled.png)

- Activates the latest custom reactor logic for the current SEMOSS instance.  
- Instantly applies code updates to event-handling reactors.
- Use this to test or activate reactor changes without saving them permanently.

##### Deploy and Persist Changes

When clicked, the **Deploy and Persist Changes** button applies all recent updates—including reactor modifications—and permanently saves them to the SEMOSS instance.  

![Redeployed](../../static/img/Pro%20Code/Redeployed.png)

- Ensures all changes are deployed and persist across restarts or future sessions.
- Use this when you want your changes to remain active long-term.

### General

Select the notepad icon to access your apps' **General Settings.**

![Access Settings](../../static/img/Pro%20Code/AccessSettings.png)

Here you have control over the privacy and access rights to your app.

#### Private
<!-- We can copy existing content for this -->
Apps are defaulted to private - meaning no one outside of your group members can access the app.

![Private](../../static/img/Pro%20Code/Private.png)

#### Non Discoverable
<!-- We can copy existing content for this -->
Making an app discoverable allows all users to request access to the app.

- If the app is ***non-discoverable***, the toggle will appear **<span className="text-green">green</span>**, and other users cannot request access to the app.

![NonDiscoverable](../../static/img/Pro%20Code/NonDiscoverable.png)

- If an app is ***discoverable***, the toggle will appear **<span className="text-grey">grey</span>**, and other users can request access to the app.

![Discoverable](../../static/img/Pro%20Code/Discoverable.png)

#### Delete App
<!-- We can copy existing content for this -->
Authors can permanently delete an app.

![Delete App](../../static/img/Pro%20Code/DeleteApp.png)

## Share App
<!-- We can copy existing content for this -->
The Share App button allows you to easily distribute your app to others. You can find this in the top right corner of the app interface.

Toggle over the share icon and click to access sharing options.

![Share App](../../static/img/Pro%20Code/ShareToggle.png)

We can share an App in two ways:

### URL
<!-- We can copy existing content for this -->
The is the most direct and quickest way of sharing an app with someone is using the **URL** option, one can copy the URL by clicking on the copy options right beside the URL, and share that link with others that you wanted to share.

![Share URL](../../static/img/Pro%20Code/ShareURL.png)

### IFrame
<!-- We can copy existing content for this -->
Another way you can share the app is by sharing them the **IFrame** link of the app, to share an app using IFrame click on the IFrame tab beside URL and you can copy the IFrame link and share it with others.

![Share IFrame](../../static/img/Pro%20Code/ShareIFrame.png)

Using this way you can embed the app as an iframe. In the **HTML** code the website where you want to embed this app inside the body tag of that website paste this iframe tag contents that you copied by clicking the button in sharing menu.

```html
<iframe frameborder="0"
            width="1000"
            height="600"
            style="border: 1px solid #ccc;" 
            src="https://MonoLithURL/SemossWeb/packages/client/dist/#/s/d56c69e5-6ca0-47f9-ba41-e00eef987b45">
</iframe>
```

The attributes in the iframe tag can be changed accordingly to our use the default values such as frameborder, width, height, style etc. are defined such that the most suitable/optimized values, but feel free to change them to the required use.

## Bookmark App

Back on your app landing page, you can bookmark the app by clicking on the bookmark icon in the top right corner.

![Bookmark](../../static/img/Pro%20Code/Bookmark.png)

This will pin it to the top of your collection for quick and easy access from the **My Apps** tab.

![App Page Bookmark](../../static/img/Pro%20Code/AppPageBookmark.png)
