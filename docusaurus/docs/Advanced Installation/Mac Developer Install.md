
import AppName, {WrapVariable} from "@site/src/components/CustomFields";

## AI Core Installation for Mac Silicon

> Note: This section is undergoing updates and is not in its final form.

## What you’re installing
This guide sets up the <AppName /> backend on macOS (Java + Maven projects running on Tomcat). When you are done, this URL should return JSON:
```
http://localhost:9090/Monolith/api/config
```

## Before you start
- **Terminal**: on macOS, this guide uses the **Terminal** app (you can find it with Spotlight).
- You will download and unzip several `.zip` files. To unzip on macOS: double-click the `.zip` file in Finder.
- If you run into an error at any point, check the [Troubleshooting Tips](Troubleshooting%20Tips.md) guide before continuing.

### Elevating Permissions

Some steps in this guide require admin-level permissions (installing an application, copying files into certain directories). Make sure you're logged in with an admin account. If your Mac has the Privileges app installed (green lock icon), use it to temporarily elevate to admin when prompted.

![<AppName />](/img/SemossDevInstallation/Picture%201.png)

### Set Up your AI Core Dev Directory

Open Documents, create a new folder called `SEMOSS`, or open your terminal and run `mkdir -p ~/Documents/SEMOSS`.
- This directory will house your workspace, Java, and other installation pieces
- This can be anywhere, but placing it in Documents is the best option

![<AppName />](/img/SemossDevInstallation/Picture2.png)

## Prerequisites

Download softwares and tools from below links to be able to install <AppName />.

### Recommended editor
We recommend using Visual Studio Code:
- Download: https://code.visualstudio.com/download

### Create AI Core and workspace Folders

Inside `~/Documents/SEMOSS`, create a `workspace` folder.

Inside `~/Documents/SEMOSS/workspace`, create a `tools` folder (for zipped downloads like the JDK and Maven).

### Install Homebrew
- Open the macOS Terminal app
- Follow the Homebrew install instructions at https://brew.sh/
- After install, open a new Terminal window and verify:
```bash
brew --version
```
> Note: If `brew` is not found after installing, follow the “Next steps” shown by the Homebrew installer to add Homebrew to your `PATH`, then open a new Terminal window and try again.

### Install Git
- Install Git via Homebrew:
```bash
brew install git
git --version
```

### .zshrc
- .zshrc will be the file used to maintain all environment variables
- This is located at ~/.zshrc under your user profile
- This file may not exist if nothing has used .zshrc before
- Check if it exists by opening Finder and selecting your home profile
- To view files that start with '.' use the command line in your Finder Folder `Command + Shift + .`
  - If the file does not exist, open VS code and select command + N, or go to File >> New text file
  - Save the file as .zshrc under your home directory of `/Users/<username>`

<!-- ![AI Core](/img/SemossDevInstallation/Picture7.png) -->

### Download Java
> **Note:** This guide installs Java 25, which matches the latest version of <AppName />. If you're setting up against an older, already-deployed instance, check with your team which version of <AppName /> they're on — for example, v5.x runs on Java 21 instead. Semoss version 6 is compatable with Java 21, the container is built using Java 25.

- Download a Java 25 JDK. We use Azul Zulu Builds of OpenJDK.
- Navigate to https://www.azul.com/downloads/
- Scroll down to see all options
- Choose these filters:
  - Java Version : Java 25
  - Operating System : macOS
  - Architecture : ARM 64 bit
  - Java Package : JDK FX
- Select Download and choose Zip
- Download the zip to your `~/Documents/SEMOSS/workspace/tools` folder
- Unzip the folder into `~/Documents/SEMOSS/workspace/tools`

![<AppName />](/img/SemossDevInstallation/Picture10.png)

### Set Java Home
- Edit ~/.zshrc
  - This can be done through nano/vim on command line or VS code
- At the **top of the file**  add the JAVA_HOME to be the folder you just unzipped for zulu JDK (see example below and update for username and filepath/version). You can copy the following code to do so:
```zsh
export JAVA_HOME="$HOME/Documents/SEMOSS/workspace/tools/<your-zulu-jdk-25-folder>/Contents/Home"
export PATH=$JAVA_HOME/bin:$PATH
```
> Note: After editing `~/.zshrc`, open a new Terminal window and verify:
```bash
java -version
```

### Eclipse IDE for Enterprise Java and Web Developers
Click on [Eclipse Download](https://www.eclipse.org/downloads/packages)
- Under Eclipse IDE for Enterprise Java and Web Developers, select **macOS AArch64**
- Download the dmg
- Open the downloaded dmg and either copy Eclipse into your Applications or into your SEMOSS folder
- Launch Eclipse

<!-- ![AI Core](/img/SemossDevInstallation/Picture11.png) -->

Once your Eclipse & JDK are installed, open Eclipse and specify where you want your workspace to be
   - Specify **/Users/Your Username/Documents/SEMOSS/workspace** instead of the default name that shows up
- We recommend that you pin eclipse to your taskbar and pin your workspace to your Quick access bar in finder

### Apache Tomcat 11
Click on [Apache Tomcat](https://tomcat.apache.org/download-11.cgi)
- Choose Binary Distributions, Core, zip file under the latest 11.0 section
- Download this to your `~/Documents/SEMOSS/workspace` folder
- Unzip the folder into `~/Documents/SEMOSS/workspace`
 
![SEMOSS](/img/SemossDevInstallation/Picture12.png)

### Maven

Click on [Maven](https://maven.apache.org/download.cgi)
- Click the download link beside Binary zip archive, and unzip this to your `~/Documents/SEMOSS/workspace/tools` folder
- Then, in your .zshrc, add the following lines:
```zsh
export M2_HOME="$HOME/Documents/SEMOSS/workspace/tools/apache-maven-3.9.10"
export PATH=$M2_HOME/bin:$PATH
```
- Remember to modify the above to use the correct folder and version name
> Note: After editing `~/.zshrc`, open a new Terminal window and verify:
```bash
mvn --version
```

## Installation Steps

### Git Clone SEMOSS & Monolith
- Open Terminal
  - Run: cd ~/Documents/SEMOSS/workspace
  - Run: git clone https://github.com/SEMOSS/Semoss.git
- After SEMOSS is done git cloning, clone Monolith
  - Run: git clone https://github.com/SEMOSS/Monolith.git
- Alternatively, you can run the following commands at once: 
```zsh
cd ~/Documents/SEMOSS/workspace
git clone https://github.com/SEMOSS/Semoss.git
git clone https://github.com/SEMOSS/Monolith.git
```

### Import SEMOSS & Monolith into Eclipse
- Open Eclipse
- From the menu bar, select File >> Import
- Select Maven >> Existing Maven Project >> Next
- “Browse” for your workspace under “Root Directory”
- Under projects, check only “/Monolith/pom.xml” and “/Semoss/pom.xml”
- Leave everything else unchecked
- Click “Finish”

![SEMOSS](/img/SemossDevInstallation/Picture13.png)

### Configure Build Path for Monolith
- Right click on “Monolith” under Project Explorer
- Select Build Path >> Configure Build Path
- Navigate to “Source” tab
- Under “Source folders on build path”, select “Monolith/Semosssrc”
- Click Edit
- Click Browse and select “src” directory inside “workspace/Semoss”
- Update “Folder name” to “Semosssrc”
- Click Finish
- Click "Apply and Close"

> Note: Make sure you are selecting workspace/Semoss/src and not workspace/Monolith/src

> Note: If you do not see Build Path when right clicking on "Monolith" try: 
>	- Click on Project on the Eclipse toolbar located on the upper left side of the screen
>	- Scroll down to properties 
>	- Type in Project Facets in the search bar 
>	- Make sure to select Java, JavaScript, JAX-RS (REST Web Services, Dynamic Web Module) 
>	- Select Apply and Close
> If that doesn't work, change Dynamic Web Module version from 5.0 to 3.0

- If you get the error `The folder is already a source folder`, you might need to first unlink it before you do the above.
- Under Properties for Monolith, Navigate to Resources > Linked Resources, then select the resource name you want to delete and delete it.


### Update RDF_Map.prop
- Open workspace/Semoss/RDF_Map.prop
- Update all paths to point to the Semoss directory
- For example:
  - Many defaults in `RDF_Map.prop` are Windows-style paths. Use Find and Replace to update them to your Mac paths.
  - Replace all instances of `C:\\workspace\\Semoss` with your Semoss repo path, for example: `/Users/<your-username>/Documents/SEMOSS/workspace/Semoss`
- Update all slashes from backslashes to forward slashes in the file paths of RDF_MAP.prop
  - Replace \\\\ with /

> Notes:
> 1.  User name is your actual user name
> 2.  If you have any \\\\ in the paths they need to be changed to / or you will get an error
> 3.  Make sure to not have C:/, just start path with /

- Additionally, ensure you adjust the following property as well: 
- Update the `BaseFolder` property from the Windows default to your Semoss folder:
  - Example: `BaseFolder /Users/<your-username>/Documents/SEMOSS/workspace/Semoss`

![<AppName />](/img/SemossDevInstallation/Picture14.png)

### Update server.xml for Tomcat
- Open Finder and navigate to the following path: `~/Documents/SEMOSS/workspace/apache-tomcat-11.0.xx/conf` (replace `xx` with your Tomcat patch version)
- Right click on server.xml and Open With TextEdit (or your text editor of choice)
- Find the line that says "Connector and the port number" (should be around line 63)
- Change the port to 9090
- Save and close the file
> Note: If Tomcat fails to start due to port `8005` being in use, update the shutdown port in the same `server.xml` to another unused port (for example `8006`).

![<AppName />](/img/SemossDevInstallation/Mac1.png)

![<AppName />](/img/SemossDevInstallation/Mac2.png)

### Create a Tomcat Server
- Back in Eclipse, at the bottom, select “Servers” tab
- Click "link to create a new Server"
- Select “Tomcat Server vX.X” under “Apache” (your version maybe different)
- Click Next
- “Browse” for “apache-tomcat-11.0.xx” directory inside workspace
- Click “Next”
- Select “Monolith” and click Add to move it to the “Configured” column
- Click Finish

![<AppName />](/img/SemossDevInstallation/Mac3.png)

![<AppName />](/img/SemossDevInstallation/Mac4.png)

![<AppName />](/img/SemossDevInstallation/Mac5.png)

### Update Tomcat Server Configuration
- Under “Servers” tab, double-click on “Tomcat v11.X Server on localhost”
- Popup should open	
- Under “Server Locations”, select “Use Tomcat installation” and set “Deploy path” to webapps
- Under “Publishing”, select “Never publish automatically”
- Under “Timeout”, set “Start” to 300 seconds
- Navigate to “Modules” tab
- Edit module and set “Path” /Monolith
- Save configuration

![<AppName />](/img/SemossDevInstallation/Mac6.png)

![<AppName />](/img/SemossDevInstallation/Mac7.png)

### Update web.xml
- Open Eclipse
- Type Command + Shift + R
- Search for web.xml and select the web.xml under Monolith
- Some defaults in `web.xml` may still contain Windows-style placeholder paths. Update them to your Mac paths:
  - Replace any occurrences of `C:\\workspace\\Semoss\\` or `C:/workspace/Semoss` with your Semoss path, for example: `/Users/<your-username>/Documents/SEMOSS/workspace/Semoss`
  - Replace any occurrences of `C:\\Temp` with `/tmp`

> Note: User name is your actual user name

![<AppName />](/img/SemossDevInstallation/Mac8.png)


### Create settings.xml
- Add a settings.xml into your ~/.m2 directory
  - If you do not see this folder in your finder, open finder and use command+shift+. (dot) to see hidden files/folders
- Run the following command in your terminal:
```zsh
cat > ~/.m2/settings.xml << 'EOF'
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
EOF
```

![<AppName />](/img/SemossDevInstallation/Mac9.png)

### Update Maven
- Open Eclipse
- Right click on either project under “Project Explorer”
- Select “Maven” > “Update Project” (popup opens)
- Check both checkboxes under “Available Maven Codebases”
- Check “Force Update of Snapshots/Releases”
- Click “OK"

![<AppName />](/img/SemossDevInstallation/Mac10.png)

### Start Tomcat Server
- Right click “Tomcat v11.0 Server at localhost” under the “Servers” tab
- Select “Start”

### Verify the Backend is Running

Before proceeding, confirm your backend is working. Open a browser and navigate to:

```
http://localhost:9090/Monolith/api/config
```

**You should see a JSON response.** If you do not get a JSON response, your backend is not running correctly — do not proceed to the frontend installation until this is resolved.

## Build and Run the Frontend

Once you have verified the backend is returning JSON at the URL above, follow the [Front End Installation Guide](Front%20End%20Installation.md) to build and run the <AppName /> frontend.
## Install R

### Initial Steps
Click here [RProject](https://cloud.r-project.org/bin/macosx/)

- Install the latest ARM64 version for Apple silicon (if you have M1 or newer)
- Execute the installer and follow the prompts
- Verify installation:
```bash
R --version
Rscript --version
```

### Install R Packages
- Add the following to the top of `workspace/Semoss/R/SemossConfigR/scripts/Packages.R` (open in a text editor):

r = getOption("repos")
r["CRAN"] = "https://cloud.r-project.org/"
options(repos = r)

- If you are on a restricted corporate network and package installs fail due to SSL inspection/proxying, fix your corporate cert/proxy configuration first. Only disable SSL verification if your security team explicitly approves it.

- From the terminal, run the scripts:
```bash
cd ~/Documents/SEMOSS/workspace/Semoss/R/SemossConfigR/scripts
Rscript Packages.R
Rscript Rserve.R
```


## Install Python
This  uses the pyproject.toml file to install the necessary packages for the <AppName /> Python environment. This setup is intended to be used with the [Astral UV](https://docs.astral.sh/uv/) platform.

### Install uv 

Install [uv](https://docs.astral.sh/uv/getting-started/installation/) with Homebrew:
```
brew install uv
```
#### Install Python in uv
Once you have installed UV run  
```
uv python install 3.13 --default
```

If the download fails on a corporate network, this is usually because `uv` doesn't read the certificates your organization's proxy already installed in your system keychain. Try again with:

```
UV_NATIVE_TLS=1 uv python install 3.13 --default
```
Check that python was installed by running
```
python --version
```

#### Create a virtual environment
Assume your Semoss repo lives at:
- `SEMOSS_HOME=~/Documents/SEMOSS/workspace/Semoss`

In your command line, go to `~/Documents/SEMOSS/workspace/Semoss/py/install_config` and run:
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
> Note: If either command fails on a corporate network with a certificate error, prefix it with `UV_NATIVE_TLS=1` as above.

Verify the packages are installed 
```
uv pip list
```

### Adding new packages
Create the [virtual environment](#create-a-virtual-environment) (if not already created), then run these from `~/Documents/SEMOSS/workspace/Semoss/py/install_config`:

to add a package
```
uv add <package>
``` 

to remove a package
```
uv remove <package>
``` 

to verify the packages are installed
```
uv pip list
```

### Test Python Installation
- In Terminal, run:
```bash
python
```
- In the Python REPL, run `2+2` and confirm it prints `4`.

### Update RDF_Map
- Open `workspace/Semoss/RDF_Map.prop`
- Ensure `USE_PYTHON true` is enabled
- Set `PYTHONHOME` to the full path of the virtual environment you just created, for example `/Users/<your-username>/Documents/SEMOSS/workspace/Semoss/py/install_config/.venv`

 ![<AppName />](/img/SemossDevInstallation/Mac14.png)