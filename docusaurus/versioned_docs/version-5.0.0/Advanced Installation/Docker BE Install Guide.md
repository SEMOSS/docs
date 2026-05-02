---
sidebar_label: 'Docker Backend Installation'
sidebar_position: 1
slug: "/advanced-installation/docker-backend-installation"
---

import {WrapVariable} from "@site/src/components/CustomFields";

#  Docker Installation

SEMOSSName supports two ways of running locally: 
1. [Fully local installation](Local%20BE%20Install%20Guide.md)
2. [Docker container](#docker-installation-guide)

This guide will show the steps for installing **Docker** and running SEMOSSName in a Docker container. 
For instructions on how to perform a fully local installation of SEMOSSName instead, click **[here](Local%20BE%20Install%20Guide.md)** for the **backend** installation instructions and **[here](Frontend%20Installation.md)** for the **frontend** instructions.

> **Note**
> If you don't need admin privileges and would prefer a **lightweight, low management** way to connect to SEMOSSName, then use the [live web server](https://YOUR_DEPLOYMENT_DOMAIN/SemossWeb/packages/client/dist/) instead of following this guide. Instructions to set up a connection to the web version can be found in the [Connecting to SEMOSSName](../How%20To/Establish%20Connection%20to%20CFG%20Portal/ConnectingToAI.md) guide.
     
## Docker Installation Guide

> **Note**
> **Quick Link**: If you already created a Docker container for SEMOSSName by following this guide, then you can jump directly to the shortcuts below to start your server:
>  * **For Windows:** [Running an Existing Docker Container on Windows](#running-an-existing-docker-container-on-windows)
>  * **For Mac OSX:** [Running an Existing Docker Container on Mac](#running-an-existing-docker-container-on-mac)

### Download Docker
If you already have Docker installed, you can skip to the next step ([Accessing the SEMOSSName Docker Repository](#accessing-the-ai-core-docker-repository).

If this is your first time installing Docker, please follow the installation guides for your operating system linked below:
* [Windows Docker Installation Guide​](https://docs.docker.com/desktop/install/windows-install/)
* [OSX/Mac Docker Installation Guide​](https://docs.docker.com/desktop/install/mac-install/)
* [Windows/Max install without Docker Desktop](https://docs.docker.com/engine/install/)


### Accessing the Docker Repository

SEMOSS docker builds and deployes images to Quay.io
[Quay Docker](https://quay.io/repository/semoss/semoss-dev?tab=tags&tag=latest)

  
### Creating a New Docker Container from the Image
* Enter the following command to list your images: `docker images`
* Find the row in the output that says `DOCKER_REPOSITORY_URL/genai/genai-server` under the **REPOSITORY** heading. This corresponds to the image that was just pulled.
* Copy the value under **IMAGE ID** for that row.
* Tag your image with a nickname called `genai-image` by executing the following command: `docker tag YOUR_IMAGE_ID genai-image:latest`
  - Replace `YOUR_IMAGE_ID` in the above command with the actual **IMAGE ID** that you copied from the previous step.
  - `latest` identifies that this is the **most recent** image.
      ![Docker Tag Output](/img/DockerBEInstall/DockerTag.png)
* Enter the following command to run a container from the image: `docker run -d -p 8080:8080 --name genAI genai-image`
  -  **-d tag:** The `-d` tag runs the Docker container in **detached mode**, which allows the container to keep running even after you close the command line/terminal window.
    If you want the Docker container to automatically shut down when you close the command line/terminal, you can **omit the `-d` tag**.
  - **`-p` tag:** The `-p` tag, followed by the `8080:8080` argument, specifies the mapping of the container port (8080) to your local machine's port (8080).
      - If you already have a different process running on port 8080 locally, you can replace the **first** `8080` with any other open port (ex. `9090:8080`).
  - **`--name` tag:** This allows you to specify a nickname/alias for your container. We set it to `genAI`, but you can replace it.
  - **`genai-image`**: This is the nickname for the image that we tagged in the previous step.
* After you enter the command, you will see an alphanumeric string output in the command prompt/terminal.
  ![Docker Run Output](/img/DockerBEInstall/DockerRun.png)
* You can verify that the container is running by entering the following command: `docker ps`
  - This will list all of the containers you have running. You should see a row with the name `genAI` (or whatever alias you set in your `docker run` command).
* In your browser, navigate to http://localhost:8080/SemossWeb/packages/client/dist/
  - **Hint**: If you used a different port than 8080 in your `docker run` command, make sure to replace it in the above link.
  ![Initial Login](/img/DockerBEInstall/InitialLogin.png)
* Accept the cookies if prompted, and you will see the SEMOSSName login landing page.
  - Note that this login page will not have an option to enter username/password yet as we still need to enable native user account registration.

### Creating an Admin and Registering for a Native Account
* Return to your command line/terminal window, and run the following command to connect to a bash shell inside of the container: `docker exec -it genAI /bin/bash`
     ![Docker Exec Output](/img/DockerBEInstall/DockerExec.png)
    - If you named your container something different than `genAI`, then replace `genAI` with the alias you set.
    - If you enter the shell successfully, you should see that the terminal prompter looks like: `root@XXXXXXXX/opt/semoss-artifacts/artifacts/scripts`
* In the shell, run the following commands:
  - `cd /opt/semosshome/`
  - `sed -i 's|<NATIVE_ENABLE>|true|' social.properties`
  - `sed -i 's|<NATIVE_REGISTRATION_ENABLE>|true|' social.properties`
  - `sed -i 's|<REDIRECT>|http://localhost:8080/SemossWeb/packages/client/dist|' social.properties`
  - `head social.properties`
    ![Bash Commands](/img/DockerBEInstall/BashCommands.png)
* Verify that the first 4 lines of output from the last command match what is below:
  ```
   redirect http://localhost:8080/SemossWeb/packages/client/dist

    #Logins Enabled/Disabled
    native_login true
    native_registration true
  ``` 
* Next, run the following commands:
  - `$TOMCAT_HOME/bin/stop.sh`
  - `$TOMCAT_HOME/bin/start.sh`
    ![Tomcat Restart](/img/DockerBEInstall/TomcatRestart.png)
* You will see some logs and output begin to appear in the terminal. Return to a browser window and navigate to http://localhost:8080/SemossWeb/packages/client/dist/
    ![Native Login](/img/DockerBEInstall/NativeLogin.png)
* Verify that an option to enter a username and password has now appeared on the login page. Do not login or register yet.
* Now, you will designate an admin user. Navigate to this link: http://localhost:8080/Monolith/setAdmin/
    ![Admin Username](/img/DockerBEInstall/AdminUsername.png)
    - You will see a table appear with an input field to enter your admin credentials
    - Since we are creating a native account, you can enter in any username you want.  Please remember the username you entered.
    - Click "Submit" after typing in your username. Do not worry if the page does not respond/redirect: this is normal. As long as you clicked the submit button, your admin username has been stored.
* Return to http://localhost:8080/SemossWeb/packages/client/dist/ and click on the **Register Now** link
    ![Native Registration Button](/img/DockerBEInstall/NativeRegistrationButton.png)
    - Fill out the fields for Name, Last Name, Username, Email Address, Password, and Confirm Password.
      ![Register User](/img/DockerBEInstall/RegisterUser.png)
    - **Important**: Make sure your the username you enter matches the username that you created earlier when setting up your admin account.
* The page will return to the login after successfully creating your account. Enter the username and password you just created, then click **"Login with Native"**.
  ![Native Login Entry](/img/DockerBEInstall/NativeLoginEntry.png)
* The page will redirect to the SEMOSSName App Library Landing page.
  ![App Library Landing](/img/DockerBEInstall/AppLibraryLanding.png)

### Stopping the Container
To stop the container, open up a **new command prompt/terminal** and enter the following command: `docker stop genAI`
* If you named your container something different than `genAI`, then replace `genAI` with the alias you set.
![Docker Stop Output](/img/DockerBEInstall/DockerStop.png)

> **Warning**
>  Do not delete your `genAI` docker container. If you accidentally delete it using `docker rm`, `docker system prune`, or `docker container prune`, then you must redo the steps starting from the [Creating a New Docker Container from the Image](#creating-a-new-docker-container-from-the-image) section of this guide.

### Running an Existing Docker Container on Mac
Now that you have created a Docker container to run SEMOSSName, you can run it directly by entering `docker start genAI` in a command line/terminal. Then, navigate to http://localhost:8080/SemossWeb/packages/client/dist/ in your browser to log in. 
![Docker Start Output](/img/DockerBEInstall/DockerStart.png)


## What's Next?
Want to start developing apps with SEMOSSName? Learn how to use the SEMOSSName Software Development Kit (SEMOSS SDK) in the [SEMOSS SDK Guide](../How%20To/Establish%20Connection%20to%20CFG%20Portal/Using%20the%20SDK.md). 

If you've already finished that, try out one of the **App Use Case Quick Start guides** linked below to get a hands-on tutorial with your preferred frontend framework!
   - [React Quick Start Guide](../How%20To/App%20Creation%20Guides/React%20App%20Quickstart%20Guide.md)
   - [Using React Locally](../How%20To/App%20Creation%20Guides/React%20App%20In-Depth%20Guide.md)
   - [Sample VanillaJS Use Case](../How%20To/App%20Creation%20Guides/VanillaJS%20App%20Quickstart%20Guide.md)
   - [Sample Streamlit Use Case](../How%20To/App%20Creation%20Guides/Streamlit%20App%20Quickstart%20Guide.md)
