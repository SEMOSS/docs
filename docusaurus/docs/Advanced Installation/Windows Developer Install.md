---
sidebar_label: 'Windows Developer Install'
sidebar_position: 4
slug: "/windows-developer-install"
---

import AppName, { DynamicCodeBlock } from "@site/src/components/CustomFields";

## AI Core Installation for Windows

## What you’re installing
This guide sets up the <AppName /> backend on Windows (Java + Maven projects running on Tomcat). When you are done, this URL should return JSON:
```
http://localhost:9090/Monolith/api/config
```

## Before you start
- **Terminal**: on Windows, this guide uses either **Command Prompt** (`cmd`) or **PowerShell** (both are apps you can search for in the Start menu).
- You will be downloading and unzipping several `.zip` files. To unzip: right-click the `.zip` file and choose **Extract All…**.
- If you run into an error at any point, check the [Troubleshooting Tips](Troubleshooting%20Tips.md) guide before continuing.

## Create the workspace folder
The workspace folder is where all the code will sit.
- Create a folder in your `C:` drive called `workspace`. The path to this folder should look like this: `C:\workspace`
- Inside `C:\workspace`, create a `tools` folder (for downloads you unzip), so you have: `C:\workspace\tools`

## Recommended editor
We recommend using Visual Studio Code:
- Download: https://code.visualstudio.com/Download

## Software Dependencies
These are the prerequisites to be able to install <AppName />.

### Java JDK 25

> **Note:** This guide installs Java 25, which matches the latest version of <AppName />. If you're setting up against an older, already-deployed instance, check with your team which version of <AppName /> they're on — for example, v5.x runs on Java 21 instead. Semoss version 6 is compatable with Java 21, the container is built using Java 25.

Click on [Azul Zulu Builds of OpenJDK](https://www.azul.com/downloads/)

Choose these filters:
- Java Version: **Java 25**
- Operating System: **Windows**
- Architecture: **x86 64-bit**
- Java Package: **JDK FX**

Download the **.msi** installer and run it.

After installing, open a new terminal and verify:
```
java -version
```

### Eclipse IDE for Enterprise Java Developers
Click on [Eclipse Download](https://www.eclipse.org/downloads/packages)
- Find **Eclipse IDE for Enterprise Java and Web Developers** and select **Windows x86_64**
- Select the link under ‘Download Links’ -> ![Eclipse download link](/img/SemossDevInstallation/EclipseDownloadLink.png)
- Unzip this anywhere you like (for example: `C:\\workspace\\tools\\eclipse`)

### Apache Tomcat (v11)
Click on [Apache Tomcat](https://tomcat.apache.org/download-11.cgi)
- Choose Binary Distributions, Core, 64 bit Windows .zip file under the latest 11.0 section
- Unzip the apache-tomcat folder into your workspace (`C:\workspace`)
- The folder will most likely be named apache-tomcat-11.0.xx (with `xx` being your Tomcat patch version)
![Workspace Folder](/img/SemossDevInstallation/WorkspaceFolder.png)

### Git
Download [Git](https://git-scm.com/downloads)
After installing, open a new terminal and verify:
```
git --version
```

### Notepad++
Choose [Notepad++ Installer](https://notepad-plus-plus.org/downloads/v7.8.2/)

> Note: Please download the 64-bit x64 installer version (not the zip file)

### Maven
Click on [Maven](https://maven.apache.org/download.cgi)
- Click the download link beside Binary zip archive, and unzip this to your workspace (for example: `C:\\workspace\\tools`)
- You will verify Maven after you set `MVN_HOME` and update your `Path` below

> **Note**
> Use Google Chrome for all downloads. Then you can quickly navigate to the downloads folder, right click, and Run as Administrator.

### Visual Studio Build Tools (C++ compiler)
Some Python packages require a C++ compiler to install locally on Windows.
- Download the Visual Studio Installer from: **https://visualstudio.microsoft.com/downloads/**
  - Install the latest **Visual Studio Community** (or your organization's preferred edition), or **Build Tools for Visual Studio**
- In the installer, select the **Desktop development with C++** workload (this provides the C++ toolchain)
- Run the installer as Administrator if prompted

## Environment Variables
Set these before importing the projects into Eclipse.

### Java (`JAVA_HOME`)
- In Windows, from your start menu/search bar, navigate to your Control Panel > **System and Security** > System > Advanced system settings.
- On the Systems Properties window that appears, select **Environment Variables**
![Environment Variables](/img/SemossDevInstallation/EnvironmentVariables.png)
- Under system variables (bottom section), select **New...**
  - For variable name, type **JAVA_HOME**
  - For variable value, choose **Browse Directory**, go to Program Files, go to Java, and select the JDK folder (wherever you installed it)
    - For example, **C:\Program Files\Zulu\zulu-25**

### Maven (`MVN_HOME`)
- Under system variables (bottom section), select **New...**
  - For variable name, type **MVN_HOME**
  - For variable value, choose **Browse Directory**, go to your workspace, and select the `apache-maven-#.#.#` folder you unzipped.
    - For example, **C:\workspace\tools\apache-maven-#.#.#**

### Update `Path`
- Under system variables (bottom section), locate the **Path** variable, select it, and click Edit.
- Add these entries if they do not exist:
  - `%JAVA_HOME%\bin`
  - `%MVN_HOME%\bin`

### Verify
Open a new terminal and verify:
```
java -version
mvn --version
```

## Clone Code Repos
### Clone Semoss Code

1. Navigate to your workspace at `C:\workspace`

2. Open a terminal (cmd, powershell) at this location

3. Run the command
```
git clone https://github.com/SEMOSS/Semoss.git
```
4. Ensure you are on the `dev` branch by running
```
git status
```
within the Semoss folder

### Clone Monolith Code

1. Navigate to your workspace at `C:\workspace`

2. Open a terminal (cmd, powershell) at this location

3. Run the command
```
git clone https://github.com/SEMOSS/Monolith.git
```
4. Ensure you are on the dev branch by running
```
git status
```
within the Monolith folder

## Eclipse Setup
### Setup Eclipse Workspace Folder
Once your Eclipse & JDK are installed, open Eclipse and specify where you want your workspace to be
   - Specify `C:\workspace` instead of the default name that shows up
- We recommend that you pin eclipse to your Taskbar and pin your workspace to your Quick Access Bar
![Workspace Launcher](/img/SemossDevInstallation/WorkspaceLauncher.png)


### Import Semoss and Monolith into Eclipse

- Open Eclipse and click **File >> Import**, then find **Maven**, click on the dropdown and select **Existing Maven Projects**
- It will start searching existing project and might take some time
- For **Root Directory**: Browse for your workspace and click OK. This should reflect where you saved your workspace folder i.e. `C:\workspace`

- For **Projects**:
   1) Check "Monolith"
   2) Check "Semoss"
   3) Uncheck all others including "SemossWeb"
 
![Import Maven Projects_Projects](/img/SemossDevInstallation/ImportMavenProject_Projects.png)

- At the bottom of the import window, click **Finish** to import your projects

### Build Path
- In eclipse, click on **Windows** tab and then click on **Show view** and then click on **Other**
- Now go to **General** and then go to **Project Explorer**
- Under the **Project Explorer** tab, right click on the **Monolith** project and select **Build Path >> Configure Build Path**

![Build Path](/img/SemossDevInstallation/BuildPath.png)

- Click on the **Source tab**, Select the **Monolith/src** folder and click **Edit**.
  
![Monolith folder in java](/img/SemossDevInstallation/Monolithfolderinjava.png)

- Browse for the correct workspace location under **Linked folder location**: **C:\workspace\Semoss\src**
- Then, on the Source Folder screen update the Folder Name field to say: `Semosssrc`. Click **Finish** >> **Apply and Close**
- This may take a few minutes. Please allow the workspace to update.
  
![Edit source folder](/img/SemossDevInstallation/Editsourcefolder.png)

## Setup Tomcat

### Update `server.xml` (ports)
If your organization blocks port `8080` or you already have something running there, update Tomcat to use `9090`.

- Open `C:\workspace\apache-tomcat-11.0.xx\conf\server.xml` (replace `xx` with your Tomcat patch version)
- Find the HTTP connector (look for `<Connector port="8080" ... />`) and change it to:
  - `port="9090"`
- If you later get a startup error about port `8005` being in use, change the Tomcat shutdown port from `8005` to another unused port (for example `8006`) in the same `server.xml`.

### Create a Tomcat Server
- In the top bar of Eclipse, click **Window -> Show View -> Other**
- Expand the Server drop-down, select **Servers**, and click **OK**
- In the bottom Servers panel, click **No servers are available. Click this link to create a new server**
> **Note**
> If you cannot find or search for Servers in the Show View window, revisit which Java you downloaded at the beginning to ensure you have the IDE for Enterprise Java Developers.

![Servers](/img/SemossDevInstallation/Servers.png)

- In the New Server window that appears, expand Apache, and select the version of the **Tomcat vX.X Server** you installed and click **Next**.
> **Note**
> You may need to expand the pop-up window to view the server options.
>
> If you do not see a Tomcat v11 server option, confirm you installed **Eclipse IDE for Enterprise Java and Web Developers** (WTP/server adapters), or install the Apache Tomcat server adapter in Eclipse.

- Expand Server, select Servers and click OK.

![Expanded Servers](/img/SemossDevInstallation/ExpandedServer.png)

- In the **Tomcat installation directory** field, enter (the location of your tomcat file): **C:\workspace\apache-tomcat-11.0.xx** and click **NEXT**.

![New Server](/img/SemossDevInstallation/NewServer.png)

- From the Add/Remove window that appears, under Available, select Monolith, click **Add** to move it to the configured side, then click the **Finish** button at the bottom. This window will then close.
![Add and Remove](/img/SemossDevInstallation/AddandRemove.png)

- Back in Eclipse, in the bottom panel area, on the Servers tab, double-click your new server (Tomcat v11.0 Server at localhost).
![Servers Tab](/img/SemossDevInstallation/Servertab.png)

- In the new window that appears, under Server Locations:
  - Select “Use Tomcat installation”
  - Change Deploy path field to “webapps”. (Just delete the first “wtp” characters)
- Under Publishing, select “Never Publish automatically”
- Under Timeouts, change start time to “900 seconds”
- Under Ports, ensure the HTTP/1.1 Port Number matches the port number you defined in your server.xml (likely 9090). Leave the other ports as is. Change admin port to 8105.
- Switch from Overview to Modules tab (at the bottom of the opened window)
![Module tab](/img/SemossDevInstallation/Moduletab.png)

- Select the Monolith Web Module that appears in the table and click Edit on the right
![Web Module](/img/SemossDevInstallation/Webmodule.png)

- Make sure the Path accurately reflects what you named your Monolith Folder 
  - E.g. “/Monolith”
- Click **Save** in Eclipse

## Configure Backend Files

### Update RDF Map for Semoss
- In the **Project Explorer** panel on the left, expand Semoss and scroll down to find File.
![Project Explorer](/img/SemossDevInstallation/ProjectExplorer.png)

- Right click on **RDF_Map.prop** and Open With Notepad++ or double click and just open in Eclipse
![RFP_Map in Folder](/img/SemossDevInstallation/RDP_MapinFolder.png)

- Make sure all references to the C drive (i.e. "C:\\...") are the correct file path.
- Check that all of your paths begin with the path to your workspace. Either **C:\\workspace\\Semoss\\** or **C:\\\\workspace\\\\Semoss\\\\** will work. The last of these should occur on the line which starts with EMAIL_TEMPLATES. This will be around line 58.
![Edit Path](/img/SemossDevInstallation/EditPath.png)

- If you make any changes, save the file and close it.

### Update Catalina.properties
- Open `catalina.properties` in Eclipse or Notepad++. It is located in **`C:\workspace\apache-tomcat-11.0.xx\conf`** (replace `xx` with your Tomcat patch version), in your Tomcat folder.
- Optional: If Tomcat startup is slow, you can tune JAR scanning.
  - Find `tomcat.util.scan.StandardJarScanFilter.jarsToSkip` and update it according to your team’s standard settings (avoid deleting the existing value unless you know why).
  - Save the file and restart Tomcat.

![Cataline.properties file](/img/SemossDevInstallation/cataline.propertiesfile.png)

### Update web.xml for Semoss
- Navigate to **C:\workspace\Monolith\WebContent\WEB-INF**
- Right click on **web.xml** and select **Edit** in Notepad++ 
- Ensure line ~674 states **<param-value>C:\\workspace\\Semoss\\</param-value>** or **<param-value>C:\\\\workspace\\\\Semoss\\\\</param-value>**
- Ensure line ~684 states  **<param-value>C:\\workspace\\Semoss\\RDF_Map.prop</param-value>** or **<param-value>C:\\\\workspace\\\\Semoss\\\\RDF_Map.prop</param-value>**
  - If your line numbers are off, CTRL+F for **RDF** to find the correct lines
> **Note**
> Your exact line numbers may be off. Reference the image below and CTRL+F for **RDF** to find the correct lines.

![web.xml](/img/SemossDevInstallation/web.xml.png)

## Adding settings.xml to .m2 (maven) repository
- Navigate to **C:\Users\YOUR_USERNAME**
  - YOUR_USERNAME is your actual username
- Locate the .m2 folder (auto created after maven update in eclipse)
  - You may need to create a .m2 folder if it is not yet there
- Add the settings.xml file and insert the following content:
```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                              https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <servers>
    <server>
      <id>3rdPartyJARs</id>
      <username>semossdevuser</username>
      <password>foxhole</password>
      <configuration></configuration>
    </server>
  </servers>
</settings>
```
- Alternatively, you can run the following powershell command that inserts this automatically:
```powershell
$content = @"
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                              https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <servers>
    <server>
      <id>3rdPartyJARs</id>
      <username>semossdevuser</username>
      <password>foxhole</password>
      <configuration></configuration>
    </server>
  </servers>
</settings>
"@

Set-Content -Path "$env:USERPROFILE\.m2\settings.xml" -Value $content -Encoding UTF8
```

## Importing security certificates
- Navigate to your Symantec security install location in Program Files
- Go to **C:\Program Files\Symantec\WSS Agent**
  - **If you do not have this folder on your PC, you may skip this section.**

  ![WSS Agent](/img/SemossDevInstallation/WSSAgent.png)

  - Click the file path at the top, and copy it to your clipboard
  - Click the Windows start button and type **CMD**. Select **Run as Administrator**. Note that you will need to provide your admin credentials
 
  ![Command Prompt](/img/SemossDevInstallation/CommandPrompt.png)

  - In the command prompt, type: cd
  - Then type a space, a quotation mark: `'`**, right-click to paste the path, another quotation mark:**, and then hit Enter
**Note:** Do not hit "CRTL+V" to paste the path. Right click instead.
- Copy and paste (by right-clicking) the following line into the command prompt:
  - `keytool -importcert -noprompt -trustcacerts -keystore **%JAVA_HOME%/jre/lib/security/cacerts** -file CertEmulationCA.crt -alias CertEmulationCA -storepass changeit`
  
  ![line in command prompt](/img/SemossDevInstallation/Lineincommandprompt.png)

- Hit Enter

- Do the same for this line:
  - `keytool -importcert -noprompt -trustcacerts -keystore **%JAVA_HOME%/jre/lib/security/cacerts** -file wss-ssl-intercept-ca.crt -alias wss-ssl-intercept-ca -storepass changeit`
- Hit Enter

## Update Maven

### In Eclipse
- In Eclipse, ensure your Project Explorer panel is being displayed (typically on the left-hand side).
  - If you don’t see the “Project Explorer” window, select **Window -> Show View -> Project Explorer** to show them.
![Project Explorer](/img/SemossDevInstallation/ProjectExplorer_updatemaven.png)

- Update each project **(first do this for Semoss, then repeat for Monolith)**
  - Right-click on the project in the project explorer panel
  - Scroll down to Maven > Update Project
  - Place a checkmark in the “Force Update of Snapshots/Releases” box. Click Ok.
  - The workspace will start updating and you can see the progress in the bottom right corner in Eclipse.  This may take some time to build.**[click on the bottom right icon to see background progress]**

![Maven Progress](/img/SemossDevInstallation/MavenProgress.png)

  - If you get the following error while maven updating, just click ok and let the update proceed.

![Error](/img/SemossDevInstallation/Error.jpg)

> **Note**
> - If you run into issues of Maven not downloading the dependencies, please see the Tips & Tricks section for downloading a new .m2 folder
> - If Maven is throwing other unexpected errors, you may need to clean and refresh your projects.

### Manual Maven Install
To install Maven for Semoss/Monolith from the CLI, we need to navigate to each project within the command prompt and run a maven install command
- In Eclipse, first for **Semoss project** and then **Monolith project**, do the following:
  - Right-click the project in the project explorer. Choose **Show In > System Explorer**
    
![System Explorer](/img/SemossDevInstallation/SystemExplorer.png)

  - Double-click and open the project folder 
  - In the file explorer window, click the file path at the top, and simply type “cmd” and hit enter
    - This will open a command prompt at this location
    
![Command prompt to install maven](/img/SemossDevInstallation/CommandPrompttoinstallmaven.png)

  - Copy and right-click to paste the following line into the command prompt, and hit enter:
    - mvn clean install -U -DskipTests=true
    
![Run command](/img/SemossDevInstallation/RunCommand.png)

## Run the Backend
### Update Eclipse to Use Java 25
- **Go to Preferences > Java > Installed JREs.**
- **Add your new Java 25 JDK** if it’s not already listed.
- Set Java 25 as the default JRE
  ![java update](/img/SemossDevInstallation/java21.png)
- Click Apply and Close.
- Allow SEMOSS to rebuild with the new JDK.
- If your eclipse does not allow you to go up to java 25, then you must download the latest version of Eclipse.
- On your project build paths, verify that you see **“JRE System Library [zulu-25].”**
  - If not, click **“Add Library…”** and add JRE System Library and choose Java 25. Do this for both Monolith and SEMOSS
![java update](/img/SemossDevInstallation/java21-1.png)
### Start Tomcat (Monolith)
- Restart Eclipse (so that Eclipse loads the new Environment Variables we’ve added) 
- Select the Monolith project and make sure under **Project -> Properties -> Java Build Path**, maintain the following order under **Order and Export** tab. You will likely need to select JRE System Library and click **Top** to move it to the top.
![Java Build Path - Monolith](/img/SemossDevInstallation/JavaBuildPath-Monolith.png)

- Apache Tomcat should not be in [unbound] state.  If so, then Select Apache to add to the classpath under Libraries tab.
- Once completed, click Apply and Close
- Within Eclipse, in the bottom Servers panel tab, right-click on the **Tomcat Server** and click **Publish**
  - After republishing, double check your modules path to ensure it accurately reflects what you named your Monolith Folder and re-save
    - E.g. “/Monolith” in the screenshot below
![Server Module](/img/SemossDevInstallation/ServerModule.png)

- Next, click **Start**
  - A progress bar will appear at the bottom of Eclipse.
    
> **Note**
> If you have run into any errors that might prevent your server from starting correctly, verify your server Web Module Path is /Monolith

> If there is an error when you click on start due to port `8005`, update the shutdown port in `server.xml` (see the `server.xml` section above).

### Verify the Backend is Running

Before proceeding, confirm your backend is working. Open a browser and navigate to:

```
http://localhost:9090/Monolith/api/config
```

**You should see a JSON response.** If you do not get a JSON response, your backend is not running correctly — do not proceed to the frontend installation until this is resolved.


## Build and Run the Frontend

Once you have verified the backend is returning JSON at the URL above, follow the [Front End Installation Guide](Front%20End%20Installation.md) to build and run the <AppName /> frontend.


## Install Python

This uses the `pyproject.toml` file to install the necessary packages for the <AppName /> Python environment. This setup is intended to be used with the [Astral UV](https://docs.astral.sh/uv/) platform.

### Install uv 
Within your command prompt, install [uv](https://docs.astral.sh/uv/getting-started/installation/) with the powershell command:
```
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```
#### Install Python in uv
Once you have installed UV run  
```
uv python install 3.13 --default
```

If the download fails on a corporate network, this is usually because `uv` doesn't read the certificates your organization's proxy already installed in your system's certificate store. Try again with:

```
uv python install 3.13 --default --native-tls
```
Check that python was installed by running
```
python --version
```
Afterwards, feel free to test by running `python` to open the Python 3.13 Shell. Type in `2+2` and see if it returns the correct response of 4.

#### Create a virtual environment
In your command line, go to `C:\\workspace\\Semoss\\py\\install_config` (this is your `SEMOSS_HOME`) and run:
```
uv venv --python 3.13 .venv
``` 
Install the necessary packages depending on your system's capabilities
```
uv sync --extra cpu
``` 
OR if you have a GPU enabled system
```
uv sync --extra gpu
```
> Note: If either command fails on a corporate network with a certificate error, add `--native-tls` as above.

Verify the packages are installed 
```
uv pip list
```

### Configure Python in your RDF_Map.prop
- Using Notepad++ or any other text editor open the file **C:\workspace\Semoss\RDF_Map.prop**
- Copy paste your python path from the virtual environment including the `Scripts` folder and add it to the **RDF_Map.prop** along with the below mentioned properties. Use Ctrl + F to search for the keys. If they aren’t there then add them just after `#FORCE_PORT 9999`:
```
PYTHONHOME C:\\workspace\\Semoss\\py\\install_config\\.venv\\Scripts
TCP_WORKER prerna.tcp.SocketServer
TCP_CLIENT prerna.tcp.client.NativePySocketClient
NATIVE_PY_SERVER true
```
Make sure `python.exe` exists under the `PYTHONHOME` path above.
Additionally make sure the following are also enabled, they are just below above lines:
```
USE_PYTHON true
NETTY_R false
NETTY_PYTHON true
```

### Adding new packages
Create the [virtual environment](#create-a-virtual-environment)  (if not already created)

To add a package
```
uv add <package>
``` 

To remove a package
```
uv remove <package>
``` 

To verify the packages are installed
```
uv pip list
```

### Add Python to PATH
Add Python to your system environment variables, this environment will be used for all Python scripts that run on your machine unless you use a different virtual environment.

 - On your machine, search up "Edit your system variables", click on **Environment variables**, under System variables, click on **Path** and click **Edit**
- Add the path to your virtual environment: `C:\workspace\Semoss\py\install_config\.venv\Scripts` and move it to the top of the list. Click OK once done

![Python Path](/img/SemossDevInstallation/PythonPath.png)

## (OPTIONAL) Install R
- Navigate to this website: **https://cran.r-project.org/bin/windows/base/old/4.2.3/**
- Click the link to Download R-4.2.3-win.exe
- Execute the application when download finishes to complete the installation
  - Make sure it is getting placed in your Documents (C:\Users\"Your_Username"\Documents\R\R-4.2.3)**(The path above may not exist yet, as the folder has not yet been created)**
   - Next, create the R folder in Documents to match the variable value. 
   - Click next all the way through
  
![Setup R](/img/SemossDevInstallation/SetupR.png)

- Download will result in R being placed in your Documents Folder

### Setting up your CRAN - Optional
- Cran is where R will download the packages from. If you want to set a default CRAN you can do so just by using the RProfile.site file. Located in the ~R Installation Dir / etc/RProfile.site
- You can either uncomment the lines and put the following for CRAN or just copy paste the lines below
- #set a CRAN mirror
  local(\{r \<- getOption("repos")
  
  r["CRAN"] \<- "https://cloud.r-project.org/"
  
  options(repos=r)\})

### Edit your Environment Variables
- Search **Environment Variables** in the Windows Search
- From the window that pops up, click the **Environment Variables** button
- Under system variables, add or edit the following variables under the System variables section with your correct path:
  - Create new/edit your R_HOME variable 
  - Variable Name: R_HOME
    - Variable value: **C:\Users\YOUR_USERNAME\Documents\R\R-4.2.3**
  - Create new/edit your R_LIBS variable
    - Variable Name: R_LIBS
    - Variable Value: **C:\Users\YOUR_USERNAME\Documents\R\win-library\4.2**
      - Change out YOUR_USERNAME with your actual username **(Note that the path above may not exist yet, as the folder has not yet been created. Create this folder to match the variable value. Change the red text to your user name.)**
        
> Note: Environment variables are case-sensitive

![Environment Variables R](/img/SemossDevInstallation/REnvironmentVariables.png)

- Edit your Path variable under System variables.  Add the following:
  - %R_HOME%\bin
  - %R_HOME%\bin\x64
  - %R_LIBS%
  - %R_LIBS%\rJava\jri\x64
> **NOTE**
> To avoid bringing in hidden special characters, type these out manually instead of copying+pasting
> Environment variables are case-sensitive

### Install R Packages - 4.2.3
- Go to  and find the **C:\workspace\Semoss\R\SemossConfigR\scripts\Packages.R file**
  - If you installed Semoss in a different folder the path in red will need to be updated
- Open up a terminal and type in **R** to start the R terminal
- Copy and paste different sections of the Packages.R script (use Notepad++ to open it) into the R terminal
>**Note**
> This process will take a while to finish
> Only copy paste small sections of the script to run at a time (~30 lines chunk)

![R Terminal](/img/SemossDevInstallation/RTerminal.png)

**Testing to See if rJava is installed properly**

- Open your rconsole and copy paste the following code:

```
library(rJava)
.jinit()
s <- .jnew("java/lang/String", "Hello World")
.jcall(s, "I", "length")
```

