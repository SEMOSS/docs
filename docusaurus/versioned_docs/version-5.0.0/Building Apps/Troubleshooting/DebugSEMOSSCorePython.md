import AppName from "@site/src/components/CustomFields";

# Debugging Python Files in SEMOSSName

When working with **SEMOSSName**, developers often need to debug Python files that are executed indirectly by the platform, for example, when a model is triggered from the UI.  
Because these files are invoked through the backend, you can’t simply “Run and Debug” them directly from VS Code.  

This guide walks through how to attach a debugger to those running Python processes using the `FORCE_PORT` configuration, so you can step through code execution in real time.

## Prerequisites

- SEMOSS / SEMOSSName running locally or in a development environment  
- Access to the Python folder (`py/`) in VS Code  
- Python and the VS Code Python extension installed  
- Basic familiarity with breakpoints and the Debug Console  

## Select the Model to Debug

1. Log in to the **SEMOSSName** platform.  
2. Navigate to the **Model Catalog**.  
3. Select the model you want to debug — for example, *Gemini-flash-2.5-google-genai*.  
4. Open the **SMSS** tab.  

The SMSS tab lists all configuration parameters and runtime properties for the model.  

![Post Model Selection Settings](/img/Troubleshooting/Post_Model_Selection_Settings.png)

## Set the Debug Port

At the end of the SMSS properties, add or edit the following line:

` FORCE_PORT 9998 `

This tells SEMOSSName to connect to the Python runtime over port `9998` when this model is triggered.  
You can use any free port number, just make sure to use the same one in the Python server file in the next step.  

![SMSS Property Force Port](/img/Troubleshooting/SMSSPropertyForcePort.png)


## Match the Port in `gaas_tcp_socket_server.py`

In VS Code, open the following file:

`py/gaas_tcp_socket_server.py`

This file serves as the **main entry point for the Python TCP server**.  
When SEMOSSName triggers a model, it communicates through this socket server, which listens for incoming requests, executes the Python logic, and returns the result to SEMOSSName.  

Updating this file ensures that the Python server listens on the same port that SEMOSSName is using to send model requests.

### (a) Update the Default Port Argument

Around lines **130–132**, locate the `parse_args()` function:

```python
def parse_args():
    parser = argparse.ArgumentParser(description="Server configuration")
    parser.add_argument("--port", type=int, default=9998, help="Port number")
```

This function defines default runtime parameters when the server starts.  
Updating this default ensures that the Python process listens on the same port defined in the SMSS tab.  

### (b) Update the Server Startup Line

Further down, around lines **196–197**, locate the server start command:

```python
if __name__ == "__main__":
    Server(port=9998, start=True)
```

This line starts the TCP server and binds it to the specified port.
Changing the port here ensures that the Python server instance matches the FORCE_PORT value from your model configuration.

If the ports don’t match, SEMOSS/SEMOSSName will fail to attach to the running server, and debugging will not initialize properly.

## Add Breakpoints

Next, open the Python client or model code that you want to inspect, for example:

```py/init.py
py/google_genai_client.py
```

Set **breakpoints** where you want to pause execution or examine how data is being passed and processed.  
These files typically contain the client logic that interacts with the SEMOSSName backend, so setting breakpoints here allows you to verify if the correct payloads and responses are flowing through the model pipeline.  

Once you add your breakpoints, they will become active as soon as the Python process starts listening on the defined port and receives a request from the SEMOSSName interface.  

![Add Breakpoint in init.py](/img/Troubleshooting/addbreakpointinitpy.png)

## Start the Debug Session

Once your breakpoints are set, return to VS Code and open the following file:

`py/gaas_tcp_socket_server.py`

From the top menu, go to:

`Run → Start Debugging`

or simply press **F5**.

This starts the Python TCP server in debug mode.  
When it launches successfully, you’ll see messages in the **Debug Console** confirming that it’s listening on the configured port:

```INFO:SocketServer: waiting for request on port 9998
INFO:SocketServer: Handling requests, press <Ctrl-C> to quit
listening on port 9998
```

This indicates that your Python server is active and ready to receive connections from SEMOSSName through the same port defined in the `FORCE_PORT` setting.

If the server fails to start or you see a “port already in use” message, verify that the port number in your SMSS tab and `gaas_tcp_socket_server.py` file are identical and not in use by another process.

![gaas_tcp_server start debug](/img/Troubleshooting/gaas_tcp_serverstartdebug.png)

![gaas_tcp_server run debug](/img/Troubleshooting/gaas_tcp_serverpyrundebug.png)

## Trigger the Model from SEMOSSName

Once the Python server is running and waiting for connections, return to the **SEMOSSName web interface**.

1. Open the **Chat** tab for the same model you configured (for example, `Gemini-flash-2.5-google-genai`).  
2. In the chat input box, type a simple test prompt such as: `hi`
3. Press **Enter** to send the message.

When you trigger the model, SEMOSSName sends this request to the Python backend using the same port you specified (`9998`).  
If everything is set up correctly, the Python server receives the request, and VS Code will pause at your defined breakpoint.

At this point, you’ll be able to inspect variables, monitor data flow, and step through your model logic directly from the VS Code debugger.

![Check response in SEMOSSName model](/img/Troubleshooting/checktheresponseointhemodel.png)

## Verify the Connection

You’ll know the setup is successful when:

- VS Code halts execution at your breakpoint.  
- The **Variables** pane shows the live state of your Python objects.  
- The **SEMOSSName Chat** window displays the model’s response.  
- The **VS Code terminal** simultaneously prints the same response, confirming that the Python server processed and returned the output correctly.

This alignment between the SEMOSSName interface and the VS Code debugger verifies that your local Python runtime and the SEMOSSName backend are communicating over the defined port, and that the debugger is properly attached.

At this point, you can step through your code, inspect variable values, and confirm that the logic behaves as expected in real time.

![Successful response in VSCode](/img/Troubleshooting/successfulresponseinvscode.png)

![google_genai_builder.py response](/img/Troubleshooting/googlegemaibuilderpy.png)

The SEMOSSName backend communicates with the Python runtime through a socket connection.  
By defining a `FORCE_PORT` in the model configuration and aligning it in `gaas_tcp_socket_server.py`, you enable the Python runtime to accept debugging connections on a predefined port — allowing seamless, live inspection during execution.  
This handshake lets the VS Code debugger attach to the same network socket SEMOSSName uses, giving you line-by-line visibility into the Python logic behind each model request.

## Common Issues

Even with correct setup, debugging through `FORCE_PORT` can sometimes fail due to port conflicts, environment issues, or process timing.  
Here are the most common problems and how to resolve them.

### The Debugger Doesn’t Attach

**Symptoms:**  

- VS Code shows “listening on port 9998,” but execution never hits the breakpoint.  
- The SEMOSSName Chat tab loads normally without pausing in VS Code.

**Check:**  

- Ensure both locations in `gaas_tcp_socket_server.py` (the `parse_args()` default and the `Server(port=...)` call) use the same port as the SMSS `FORCE_PORT`.  
- Confirm no other process is using that port. You can check this by running:

```bash
  netstat -ano | find "9998"
```
