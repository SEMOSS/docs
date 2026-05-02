---
title: Creating a Python MCP
description: Build an MCP tool using Python, expose its functions to SEMOSS, and validate MCP registration and execution.
sidebar_label: Python MCP
sidebar_position: 14
tags:
  - MCP
  - Python
  - Pro Code Apps
    - SEMOSS
slug: /cookbook/python-mcp
---

import AppName from "@site/src/components/CustomFields";

## Overview
In this tutorial, we will go through creating a Model Context Protocol (MCP) tool in Python to use within the SEMOSSName platform. This documentation covers an introduction to MCP tools, as well as the steps to design and deploy your own tool. 

### What is MCP?
Model Context Protocol (MCP) is a standardized framework developed by Anthropic and was introduced in November 2024. It enables AI models to seamlessly connect with external tools and data sources without requiring custom integrations for each platform.
- Key Benefit: One integration, endless reusability by various AI models
- Example Use Cases: Live stock-price checker, database queries, workflow automations to AI systems 

### When/Why Use MCP?
**When:** you want your tools/logic to be reliably called by models, UIs, or external services on SEMOSSName. 

**Why:** MCP makes your functions discoverable, parameterized, and trackable. 

**Example:** Enable users to generate a chart of real-time stock data in a presentation. 

## Prerequisites
Ensure you have access to an SEMOSSName instance, and Python installed. 

## Steps
### Step 1: Set Up Your SEMOSSName Project
Create a Pro Code App
- Log into your SEMOSSName instance.
- Go to “Apps” > “Create New” > “Pro Code App.”
- Name your project (ex. “Stock Data MCP”). 

### Step 2: Writing a MCP Driver in Python
Create a new file called `py/mcp_driver.py`, and begin adding your MCP-exposed functions.  
Here is an example: 

```python
import yfinance as yf
from smssutil import mcp_execution

@mcp_execution('auto')
def get_stock_price(symbol: str) -> float:
    """
    Retrieve the current stock price for the given ticker symbol.
    Returns the latest closing price as a float.
    """
    try:
        ticker = yf.Ticker(symbol)
        # Get today's historical data; may return empty if market is closed or symbol is invalid.
        data = ticker.history(period="1d")
        if not data.empty:
            # Use the last closing price from today's data
            price = data['Close'].iloc[-1]
            return float(price)
        else:
            # As a fallback, try using the regular market price from the ticker info
            info = ticker.info
            price = info.get("regularMarketPrice", None)
            if price is not None:
                return float(price)
            else:
                return -1.0  # Indicate failure
    except Exception:
        # Return -1.0 to indicate an error occurred when fetching the stock price
        return -1.0

@mcp_execution('ask')
def stock_resource(symbol: str) -> str:
    """
    Expose stock price data as a resource.
    Returns a formatted string with the current stock price for the given symbol.
    """
    price = get_stock_price(symbol)
    if price < 0:
        return f"Error: Could not retrieve price for symbol '{symbol}'."
    return f"The current price of '{symbol}' is ${price:.2f}."

@mcp_execution('disabled')
def get_stock_history(symbol: str, period: str = "1mo") -> str:
    """
    Retrieve historical data for a stock given a ticker symbol and a period.
    Returns the historical data as a CSV formatted string.
    
    Parameters:
        symbol: The stock ticker symbol.
        period: The period over which to retrieve historical data (e.g., '1mo', '3mo', '1y').
    """
    try:
        ticker = yf.Ticker(symbol)
        data = ticker.history(period=period)
        if data.empty:
            return f"No historical data found for symbol '{symbol}' with period '{period}'."
        # Convert the DataFrame to a CSV formatted string
        csv_data = data.to_csv()
        return csv_data
    except Exception as e:
        return f"Error fetching historical data: {str(e)}"


def compare_stocks(symbol1: str, symbol2: str) -> str:
    """
    Compare the current stock prices of two ticker symbols.
    Returns a formatted message comparing the two stock prices.
    
    Parameters:
        symbol1: The first stock ticker symbol.
        symbol2: The second stock ticker symbol.
    """
    price1 = get_stock_price(symbol1)
    price2 = get_stock_price(symbol2)
    if price1 < 0 or price2 < 0:
        return f"Error: Could not retrieve data for comparison of '{symbol1}' and '{symbol2}'."
    if price1 > price2:
        result = f"{symbol1} (${price1:.2f}) is higher than {symbol2} (${price2:.2f})."
    elif price1 < price2:
        result = f"{symbol1} (${price1:.2f}) is lower than {symbol2} (${price2:.2f})."
    else:
        result = f"Both {symbol1} and {symbol2} have the same price (${price1:.2f})."
    return result
```
Best Practice:
- Always use Python docstrings for each function.
- Only tag with `@mcp_execution` the functions you want exposed to the platform. 



### Step 3: Generate the MCP Manifest (mcp.json) 

What is `mcp.json`?

`mcp.json` is an auto-generated manifest describing your MCP tool’s interface for the SEMOSSName platform. It tells the platform (and any connected LLMs or services):
- What functions you expose
- Their parameters, types, descriptions, and usage metadata (including decorator tags like `auto`, `ask`, etc.)

How to Generate:
1.	Once your `mcp_driver.py` is ready, use:

    a.	`MakePythonMCP("<your_project_id>")`

    b.	This scans your driver, produces a `py_mcp.json` file in the MCP directory.

2.	Verify the output format. Below is an example based off the `mcp_driver.py` example earlier:

```json
{
    "_meta": {
        "last_modified_date": "2025-11-21",
        "file_last_modified_date": "2025-11-21",
        "source_file": "your_stock_module.py"
    },
    "tools": [
        {
            "name": "get_stock_price",
            "title": "Get Stock Price",
            "description": "Retrieve the current stock price for the given ticker symbol.\nReturns the latest closing price as a float.",
            "inputSchema": {
                "properties": {
                    "symbol": {
                        "title": "Symbol",
                        "description": "The stock ticker symbol",
                        "type": "string"
                    }
                },
                "required": [
                    "symbol"
                ],
                "title": "Get Stock Price Arguments",
                "type": "object"
            },
            "_meta": {
                "generated_on": "2025-11-21",
                "SMSS_MCP_EXECUTION": "auto"
            },
            "_type": "python"
        },
        {
            "name": "stock_resource",
            "title": "Stock Resource",
            "description": "Expose stock price data as a resource.\nReturns a formatted string with the current stock price for the given symbol.",
            "inputSchema": {
                "properties": {
                    "symbol": {
                        "title": "Symbol",
                        "description": "The stock ticker symbol",
                        "type": "string"
                    }
                },
                "required": [
                    "symbol"
                ],
                "title": "Stock Resource Arguments",
                "type": "object"
            },
            "_meta": {
                "generated_on": "2025-11-21",
                "SMSS_MCP_EXECUTION": "ask"
            },
            "_type": "python"
        },
        {
            "name": "get_stock_history",
            "title": "Get Stock History",
            "description": "Retrieve historical data for a stock given a ticker symbol and a period.\nReturns the historical data as a CSV formatted string.\n\nParameters:\n    symbol: The stock ticker symbol.\n    period: The period over which to retrieve historical data (e.g., '1mo', '3mo', '1y').",
            "inputSchema": {
                "properties": {
                    "symbol": {
                        "title": "Symbol",
                        "description": "The stock ticker symbol",
                        "type": "string"
                    },
                    "period": {
                        "title": "Period",
                        "description": "The period over which to retrieve historical data (e.g., '1mo', '3mo', '1y')",
                        "type": "string",
                        "default": "1mo"
                    }
                },
                "required": [
                    "symbol"
                ],
                "title": "Get Stock History Arguments",
                "type": "object"
            },
            "_meta": {
                "generated_on": "2025-11-21",
                "SMSS_MCP_EXECUTION": "disabled"
            },
            "_type": "python"
        }
    ]
}
```

What’s Included: Function names, parameters, decorator usage, and documentation.

This manifest is used for UI display, validation, and tool routing in SEMOSS.





### Step 4: Testing & Going Live
1.	Tag Your App as MCP
       In the SEMOSSName app page, add the “MCP” tag.
2.	Test in Playground
        Try calling your functions from the playground UI (or API) to ensure discovery, prompting, and results work as intended.

**Debugging Tips:**
- If a tool doesn’t appear, check that it is properly tagged and included in your manifest.
- For parameter or schema errors, the error logs often point to the required/optional field mismatches.

## Deep Dive

### Understanding the MCP Decorator Tags
The `@mcp_execution` decorator tells the platform when and how to allow AI models to access each function:

Decorator Tags 
- **auto**: Tool can be called directly by the model with no prompt
- **ask**: Model must ask user before calling the tool
- **disabled**: Tool is not available for model use

### How MCP Works with SEMOSSName
Here’s how it connects:
1.	**Discovery**: When SEMOSS or an AI service loads, it reads mcp.json to list all available functions and their usage rules.
2.	**Validation**: When a function/tool is invoked, it checks parameter requirements and types using your schema.
3.	**Execution**: The tool is called with user parameters; the result is passed back to AI/SEMOSS for display or workflow actions.

**Example User Flow:**
- User asks for a stock chart for “AAPL” in SEMOSSName.
- SEMOSS consults `mcp.json` to find the right function and prompt for parameters if needed.
- Your Python code is run, result is returned and displayed or used downstream.

Note that any function that is not tagged using the `@mcp_execution` decorator will be executed only after asking the user. 

## Summary
You now have a full lifecycle MCP—from Python coding to manifest generation to SEMOSSName integration! 