---
sidebar_label: 'Windows Developer Install'
sidebar_position: 4
slug: "/windows-developer-install"
---

import AppName, { DynamicCodeBlock } from "@site/src/components/CustomFields";

Download softwares and tools from below links to be able to install Semoss.
## Create the workspace folder
The workspace folder is where all the code will sit.
- Create a folder in your C drive called workspace. The path to this folder should look like this: ```C:\workspace​```

## Software Dependencies
These are the pre-requisites to be able to install Semoss

### Java JDK 21

Click on [java21](https://www.azul.com/downloads/?version=java-21-lts&architecture=x86-64-bit&package=jdk-fx#zulu)

Scroll down to Java 21 and click on Download next to Windows x86 64-bit

Use the MSI installer

### Eclipse IDE for Enterprise Java Developers
Click on [Eclipse IDE](https://www.eclipse.org/downloads/packages/release/2025-06/r/eclipse-ide-enterprise-java-and-web-developers)
- Select the link under ‘Download Links’ -> ![Eclipse download link](/img/SemossDevInstallation/EclipseDownloadLink.png)
- Windows 64-bit
- Unzip this to Desktop or Default location

### Apache Tomcat (v9)
Click on [Apache Tomacat](https://tomcat.apache.org/download-90.cgi)
- Choose Binary Distributions, Core, 64 bit Windows .zip file under the latest 9.0 section
- Unzip the apache-tomcat folder into your workspace
- The folder will most likely be named apache-tomcat-9.0.## (with ## being the version number!)
![Workspace Folder](/img/SemossDevInstallation/WorkspaceFolder.png)

### Git
Download [Git](https://git-scm.com/downloads)

### Notepad++
Choose [Notepad++ Installer](https://notepad-plus-plus.org/downloads/v7.8.2/)

> Note: Please download the 64-bit x64 installer version (not the zip file)

### NVM and Node.js
Click on [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
- Download nvm-setup.zip from the assets table. Extract it and run the installation by clicking on the downloaded file.

- To check whether NVM has been successfully installed,
  - Go to terminal
  - Type 'nvm -v' and hit enter
  - This should return the version of the NVM installed

To install Node.js using NVM
- Run `nvm install latest` in terminal
- Run `nvm use latest` afterwards
- Verify installation with `node -v` and `npm -v`
- If 'npm -v' has an error, run Set-ExecutionPolicy RemoteSigned -Scope CurrentUser


### Maven
Click on [Maven](https://maven.apache.org/download.cgi)
- Click the download link beside Binary zip archive, and unzip this to your Documents folder

- To check whether Maven has been successfully installed,
  - Go to terminal
  - Type 'mvn --version' and hit enter
  - This should return the version of the node installed

> **Note**
> Use Google Chrome for all downloads. Then you can quickly navigate to the downloads folder, right click, and Run as Administrator.

### Visual Studio Code​
Download [from this link](https://code.visualstudio.com/Download​)

### Visual Studio Installer
- Download Microsoft Visual Studio Installer from this link: **https://visualstudio.microsoft.com/vs/older-downloads/**
  - We need to Install the 2022 latest community version
  - Visual Studio Installer is needed for a C++ compiler (many Python packages require this)
- To install, find the installation file (likely in your Downloads folder), right click and **Run as administrator**. You’ll need to enter login credentials at least a few times during installation.

## Clone Code Repos
### Clone Semoss Code

1. Navigate to your workspace​ at `C:\workspace`

2. Open a terminal (cmd, powershell) at this location​

3. Run the command
```
git clone https://github.com/SEMOSS/Semoss.git
```
4. Ensure you are on the `dev` branch​ by running
```
git status
```
within the Semoss folder

### Clone Monolith Code

1. Navigate to your workspace​ at `C:\workspace`

2. Open a terminal (cmd, powershell) at this location​

3. Run the command
```
git clone https://github.com/SEMOSS/Monolith.git
```
4. Ensure you are on the dev branch​ by running
```
git status
```
within the Monolith folder

### Clone semoss-ui code

1. Navigate to your Tomcat webapps folder​

Since we placed the tomcat folder in the workspace, the path is: `C:\workspace\apache-tomcat-9.0.##\webapps​`

2. Open terminal at this location and run the command 
```
git clone https://github.com/SEMOSS/semoss-ui.git
```

3. Ensure you are on the dev branch​ by running
```
git status
```
within the semoss-ui folder

4. Rename semoss-ui folder to `SemossWeb`​

5. In the SemossWeb folder create a new file named `.env.local`, and copy the following contents into that folder

<DynamicCodeBlock noQuotes>
```
ENDPOINT=../../..​
MODULE=/Monolith​

​

THEME_TITLE={SEMOSSName}
THEME_FAVICON=./src/assets/favicon.svg​


NODE_ENV=development
```
</DynamicCodeBlock>
Your SemossWeb folder should look like this
![env local file](/img/BELocalInstall/semoss-ui-env-local.png)

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

- Expand Server, select Servers and click OK.

![Expanded Servers](/img/SemossDevInstallation/ExpandedServer.png)

- In the **Tomcat installation directory** field, enter (the location of your tomcat file): **C:\workspace\apache-tomcat-X.X.##** and click **NEXT**.

![New Server](/img/SemossDevInstallation/NewServer.png)

- From the Add/Remove window that appears, under Available, select Monolith, click **Add** to move it to the configured side, then click the **Finish** button at the bottom. This window will then close.
![Add and Remove](/img/SemossDevInstallation/AddandRemove.png)

- Back in Eclipse, in the bottom panel area, on the Servers tab, double-click your new server (Tomcat v9.0 Server at localhost).
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

## Change Environment Variables

### Update RDF Map for Semoss
- In the **Project Explorer** panel on the left, expand Semoss and scroll down to find File.
![Project Explorer](/img/SemossDevInstallation/ProjectExplorer.png)

- Right click on **RDF_Map.prop** and Open With Notepad++ or double click and just open in Eclipse
![RFP_Map in Folder](/img/SemossDevInstallation/RDP_MapinFolder.png)

-Make sure all references to the C drive (i.e. "C:\\...") are the correct file path.
- Check that all of your paths begin with the path to your workspace. Either **C:\\workspace\\Semoss\\** or **C:\\\\workspace\\\\Semoss\\\\** will work. The last of these should occur on the line which starts with EMAIL_TEMPLATES. This will be around line 58.
![Edit Path](/img/SemossDevInstallation/EditPath.png)

- If you make any changes, save the file and close it.

### Update Catalina.properties
- Open catalina.properties in eclipse or Notepad++. It is located in **C:\workspace\apache-tomcat-9.0.56\conf**, your Servers Tomcat folder.
- Replace line 108 with the following: **tomcat.util.scan.StandardJarScanFilter.jarsToSkip=*.jar,\
- Resave the file. This will improve the startup time of your server.

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

### General
- In Windows, from your start menu/search bar, navigate to your Control Panel > **System and Security** > System > Advanced system settings.
- On the Systems Properties window that appears, select **Environment Variables**
![Environment Variables](/img/SemossDevInstallation/EnvironmentVariables.png)
- Under system variables (bottom section), select **New...**
  - For variable name, type **JAVA_HOME**
  - For variable value, choose **Browse Directory**, go to Program Files, go to Java, and select the jdk folder (wherever you downloaded/moved it to)
    - For example, **C:\Program Files\Zulu\zulu-21**
      
> Note: Environment variables are case-sensitive

- Click OK
![System Variables](/img/SemossDevInstallation/SystemVariable.png)

- Next, Under system variables (bottom section), locate the **Path** variable, select it, and click Edit
  - In the window that appears, click New
  - In the new row that appears, paste **%JAVA_HOME%\bin** without the quotation marks
  - Click OK

> Note: Environment variables are case-sensitive
   
![Path variable](/img/SemossDevInstallation/Pathvariable.png)

- Keep these windows open for the next steps
- Under system variables (bottom section), select **New...**
  - For variable name, type **MVN_HOME**
  - For variable value, choose **Browse Directory**, go to Documents, and select the apache-maven folder.
    - For example, **C:\Users\[your username]\Documents\apache-maven-#.#.#**
      
> Note: Environment variables are case-sensitive
   - Click OK
    
![System variable 2](/img/SemossDevInstallation/Systemvariable2.png)

- Next, Under system variables (bottom section), locate the **Path** variable, select it, and click Edit
  - In the window that appears, click New
  - In the new row that appears, paste **%MVN_HOME%\bin** without the quotation marks
  - Click OK

  > Note: Environment variables are case-sensitive
    
![Path variable 2](/img/SemossDevInstallation/Pathvariable2.png)

- Click Ok to close the window. Close out the remaining Systems Properties windows.

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

## Install visual studio installer
- Download Microsoft Visual Studio Installer from **[this link](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&channel=Stable&version=VS18&source=VSLandingPage&cid=2500&passive=false)**
  - To install, find the installation file (likely in your Downloads folder), right click and **Run as administrator**. You’ll need to enter login credentials at least a few times during installation.
- Under Windows, select user installer x64, and then click next through all the default options ​
- Select ASP.NET and Python development then click install

## Run the Backend
### Update Eclipse to Use Java 21​
- **Go to Preferences > Java > Installed JREs.​**
- **Add your new Java 21 JDK** if it’s not already listed.​
- Set Java 21 as the default JRE​
  ![java update](/img/SemossDevInstallation/java21.png)
- Click Apply and Close.​
- Allow SEMOSS to rebuild with the new JDK.​
- If your eclipse does not allow you to go up to java 21, then you must download the latest version of Eclipse. ​
- On your project build paths, verify that you see **“JRE System Library [zulu-21].”**
  - If not, click **“Add Library…”** and add JRE System Library and choose Java 21. Do this for both Monolith and SEMOSS
![java update](/img/SemossDevInstallation/java21-1.png)
### Start Semoss Web
- Restart Eclipse (so that Eclipse loads the new Environment Variables we’ve added) 
- Select the Monolith project and make sure under **Project -> Properties -> Java Build Path**, maintain the following order under **Order and Export** tab. You will likely need to select JRE System Library and click **Top** to move it to the top.
![Java Build Path - Monolith](/img/SemossDevInstallation/JavaBuildPath-Monolith.png)

- Apache Tomcat should not be in [unbound] state.  If so, then Select Apache to add to the classpath under Libraries tab.
- Once completed, click Apply and Close
- Within Eclipse, in the bottom Servers panel tab, right-click on the **Tomcat Server** and click **Publish**
  - After republishing, double check your modules path to ensure it accurately reflects what you named your Monolith Folder and re-save
    - E.g. “/Monolith” in the screenshot below
![Server Module](/img/SemossDevInstallation/ServerModule.png)
  - Double click on the server to open the Overview folder. Find the Port tab and next to the "Tomcat admin port", change the port number to 8105.

- Next, click **Start**
  - A progress bar will appear at the bottom of Eclipse.
    
> **Note**
> If you have run into any errors that might prevent your server from starting correctly, verify your server Web Module Path is /Monolith

> To ensure the backend is running correctly,
 - Navigate to http://localhost:9090/Monolith/api/config
 - A json file should appear here

> If there is error when you click on start due to Port 8005, please change it to 8006 or some other port
- Now open terminal in Semoss folder and enter pnpm dev to run the front end if its not already running
- Open Chrome and enter **http://localhost:9090/SemossWeb/packages/client/dist/#/login**


## Build and run the Frontend
### FE Setup

- Navigate to the following path in your command prompt/terminal:
```
C:/workspace/apache-tomcat 9.0.##/webapps/SemossWeb (this is your root directory)
```
- In the terminal type in: 
```
npm install -g pnpm
```
- In the same terminal type in: 
```
pnpm install
```

### Run in dev

Create a dev build by running 
```
pnpm run build:dev
```
or launching the dev-server by running 
```
pnpm run dev
 ```
>See package.json for additional commands.

### Build

- For these three paths: `libs/ui`, `libs/renderer`, `libs/sdk`, navigate to the paths in your command prompt/terminal and type the command 
```
pnpm build
```
- Then, navigate to `packages/client` in your command prompt/terminal and type the command 
```
pnpm build
```

### Run the Frontend

Ensure your tomcat server is running in Eclipse (reminder that http://localhost:9090/Monolith/api/config will have text if the backend is running correctly)
  
> Navigate to http://localhost:9090/SemossWeb/
 - If all everything is working properly this should redirect you to a set admin page
 - Type in the username you want to register with

> Then go back to http://localhost:9090/SemossWeb/ , and at the bottom of the page, hit register new user.
 - Fill out the required fields
 - Make sure the username you register is the same as the one typed into the admin page

> Once the new user is registered, you can sign in using the same information.
 
- Congratulations! You’re all set to start using SEMOSSName!

![Semoss Started](/img/SemossDevInstallation/SemossStarted.jpg)

> To ensure the backend is running correctly,
 - Navigate to http://localhost:9090/Monolith/api/config
 - A json file should appear here

> If there is error when you click on start due to Port 8005, please change it to 8006 or some other port
- Now open terminal in Semoss folder and enter pnpm dev to run the front end if its not already running
- Open Chrome and enter **http://localhost:9090/SemossWeb/packages/client/dist/#/login**


## Install Python
This uses the `pyproject.toml` file to install the necessary packages for the SEMOSSName Python environment. This setup is intended to be used with the [Astral UV](https://docs.astral.sh/uv/) platform.

### Install uv 
Within your command prompt, install [uv](https://docs.astral.sh/uv/getting-started/installation/) with the powershell command:
```
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```
#### Install Python in uv
Once you have installed UV run  
```
uv python install 3.12.9 --default --preview
```

If you get an error run this instead

```
uv python install 3.12.9 --default --preview --allow-insecure-host github.com
```  
Check that python was installed by running
```
python --version
```
Afterwards, feel free to test by running `python` to open the Python 3.12.9 Shell. Type in `2+2` and see if it returns the correct response of 4.

#### Create a virtual environment
In your command line, go to `<SEMOSS_HOME>/py/install_config` and run:
```
uv venv
``` 
Install the necessary packages depending on your system's capabilities
```
uv pip install .[cpu]
``` 
OR if you have a GPU enabled system
```
uv pip install .[gpu]
```
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

### (OPTIONAL) Add Python to PATH
If you would like to add Python to your system environment variables, this environment will be used for all Python scripts that run on your machine unless you use a different virtual environment.

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
    - Variable Value: **C:\Users\YOUR_USERNAME\Documents\R\win-library\4.1**
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

This should return 11 and this means that rJava is working



