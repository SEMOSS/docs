---
sidebar_label: "Pixels"
sidebar_position: 1
slug: "java/pixels"
---

import AppName from "@site/src/components/CustomFields";

# Pixel

## Overview

Pixel is a domain specific language (DSL) specific to SEMOSSName that is used as the payload for all the operations that can be performed on an insight. Every Pixel has a java class to handle the business logic on the backend, we call this java class a "Reactor".

## How to write a Pixel Call

A Pixel call has some important components:

### Pixel Command 
the name of the pixel logic to execute

### Inputs
   1. Inputs may use keys to define them
      ```
      AddColumn(newCol=["ColA"], dataType=["VARCHAR(50)"]);
      ```
   2. If PixelCommands do not use keys, then the order of the inputs is important!
      ```
       POWER(2, 3);
       POWER(3, 2);
      ```
### Pipes
Some Pixel commands use pipes (“|”). A pipe is used to indicate that you would like to chain a Pixel command with a previous one. Essentially, the output of one reactor is taken and put into the next reactor so that the Pixel commands build off of each other.

### Semi-colon
a semi-colon (“;”)! A semicolon is a terminator and will be found at the end of your chain of commands. A semicolon indicates that you want to create a sink. It is best to create a sink when you are at a logical endpoint, meaning you do not need to use the output of your command for another reactor. For example, a logical endpoint is when you want to push your data to the frontend of SEMOSSName so that it can be viewed.

### Example Pixel Call
```
Database(database = "dbID")|Query("<encode> your select query </encode>")|Collect(500);
```

To run a pixel call, you can use the [terminal](https://YOUR_DEPLOYMENT_DOMAIN/SemossWeb/#!/embed-terminal).



## Help()
There are many pixels calls/commands available that allows us to perform various kinds of tasks. To get a comprehensive list of all available Pixel commands, simply type `Help()` into a terminal in SEMOSSName.
![Help](/img/Pixel%20Calls/Help1.PNG)

## Pixel --help

To understand the pixel calls/commands and their input options, you can run the `--help` function.


Type the name of the command you're interested in, followed by two hyphens and the word **help**. - For example, to know about the input options for **CreateModelEngine** command, you'd enter `CreateModelEngine --help` in the console.
   ![Help1](/img/Pixel%20Calls/help2.png)

## Variables
Pixels allows you to create variables to help with development tasks

   ![Help1](/img/Pixel%20Calls/variables.png)