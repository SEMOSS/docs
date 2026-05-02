---
title: Frames
description: Understand what Frames are in SEMOSS, how different frame types work, and how to create, modify, and validate Frames using the UI and Pixel commands.
sidebar_label: Frames
sidebar_position: 11
tags:
  - Frames
  - Data
  - Notebook
  - Pixel
slug: /cookbook/frames
---

import AppName from "@site/src/components/CustomFields";

## Overview

Frames are structured datasets used within SEMOSSName to store, transform, and query data. When you import data through a Notebook cell, run a Pixel query, or work with databases, the output is stored temporarily in a Frame. Frames behave like tables: rows represent items, columns represent attributes, and operations such as filtering, joining, transforming, or reshaping occur directly on Frames.

Frames enable:

- Importing data from catalogs or SQL queries
- Performing data transformations
- Passing structured data into UI blocks
- Powering workflows where models, queries, and UI interactions rely on consistent data formats

A Frame is the standard unit of tabular data inside an SEMOSSName application.

This recipe explains how Frames are created, modified, inspected, and used inside the SEMOSSName Notebook environment. Both UI-based and Pixel-based flows are covered. This recipe is intended for users building data-driven applications or workflows that rely on Frames.

## Setup

To follow this recipe, ensure:

- You have an SEMOSSName app with access to the Notebook panel.
- You have role-based access to one or more databases.
- You can execute Pixel or Import Data cells in the Notebook.
- You have at least one UI page where Frame data will be displayed.
- You understand how to bind variables and queries to UI blocks.

## Steps

### Creating Frames

#### Creating Frames Using Import Data

1. Open the Notebook panel and create a new Notebook or select an existing one.
2. Add a new Import Data cell.
3. Select a database to import data from.
4. Choose the required table and fields.
5. Run the cell.
6. The tabular output under the cell represents the Frame.

<!-- TODO add a picture of this -->
Logs typically show:

```cell
Creating new frame of type = GRID with alias = FRAME_25358
Frame FRAME_25358 created
```

#### Creating Frames Using Pixel Code

1. Add a Code cell.
2. Enter a Pixel query, for example:

   ```pixel
   Select executive_orders_dev
   ```

3. Run the cell.
4. The query output becomes a Frame.

<!-- TODO add a picture of this -->


#### Creating Empty Frames

1. Add a Code cell.
2. Define a Frame with schema: (You can customize your headers here)

   ```sql
   Create Frame EMPTY_FRAME as {
     col1 : STRING,
     col2 : NUMBER
   }
   ```

3. Run the cell to register the Frame.

#### Inspecting Frames

<!-- TODO write pixels to get frame data for pixel terminal -->


##### Viewing Frame Output

The Notebook automatically displays a preview of the Frame beneath the cell that produced it. You can inspect:

- Column names and types
- Row samples
- Row counts
- Data structure before further transformations

#### Transforming Frames

##### Using UI Transformations

1. Run an Import Data cell to produce a Frame.
2. Click Transformation above the output table.
3. Select a transformation type such as uppercase, date operations, or cumulative functions.
4. A new Notebook cell appears.
5. Select the target Frame and column.
6. Run the cell to generate the updated Frame.

<!-- TODO add a picture of this -->

##### Using Pixel Transformations

Examples:

Uppercase:

```pixel
Map FRAME_12345 col_name = Upper(col_name)
```

Filtering:

```pixel
Filter FRAME_12345 where col_name = "value"
```

Joining:

```pixel
Join FRAME_1 with FRAME_2 on id
```

Ordering:

```pixel
Order FRAME_12345 by release_date desc
```

Aggregation:

```pixel
GroupBy FRAME_12345 by category agg count(id)
```

#### Using Frames in the UI

##### Binding Frames to Variables

1. Open the Variables tab.
2. Create a variable of type Query.
3. Select the Notebook query that produces the Frame.

##### Connecting Variables to UI Blocks

1. Open the UI Builder.
2. Drag a Grid or another data-bound block onto the page.
3. Bind the block's Data Source to the variable referencing the Frame.
4. Trigger the cell using Run All or UI actions.

##### Triggering Frame Queries from the UI

1. Select a UI block such as Button or Page.
2. Under OnClick or On Page Load choose New Action.
3. Specify the Notebook query ID that generates the Frame.
4. The application runs the query and updates the Frame automatically.

#### Persisting or Reusing Frames

Frames can be reused in subsequent cells without re-running the database query:

```cell
Frame("FRAME_25358") | Select ( columns=["id", "title"] )
```

### Changing Frame Types

Frame types determine how the system stores and handles data internally. Common types include:

- GRID Frame for structured tabular database imports
- NATIVE Frame for Pixel-generated or non-SQL outputs
- PY Frame used in python environment
- PLOT or other types based on Notebook operations

The type is recorded when a Frame is created.

Example:

```cell
Creating new frame of type = GRID with alias = FRAME_25358
```

### Changing Frame Type Through Notebook Logic

To modify a Frame's type:

1. Open the Notebook cell that creates the Frame.
2. Adjust the Pixel or Import Data settings to output a different type.
3. Re-run the cell.
4. The Frame is recreated with the new type.

### Detailed Pixel Example

```pixel
FileRead(
    name = ["2024_01_29_us_code_titles"],
    type = ["CSV"],
    path = ["executive_orders_dev/us_code_titles_cum_summaries.csv"]
)
|
Import(
    table = ["us_code_titles"],
    database = ["executive_orders_dev"],
    tableType = ["NATIVE"],
    isTransposed = [false],
    rows = [""],
    columns = [""]
)
```

To change the Frame type, update:

```pixel
tableType = ["NATIVE"]
```

and re-run the cell.

### Adding Frame content to Database

To add a Frame's content to a database:

1. Create Notebook cell. 
2. Define desired frame and select headers to add.
3. Define target database and table.
4. Define desire to overide or append to target table.
5. Define desire to add unique id when adding content. 

```pixel
Frame( frame=[Zip_Codes_FRAME] )
|
Select(zip_code, zip_code_latitude, zip_code_longitude, zip_code_state, zip_code_vba_region)
|
ToDatabase(targetDatabase=["test-db"], targetTable=["zip_codes_table"], override=[false], insertId=[false])
;

```

## Deep Dive

### Internal Behavior

Frames are backed by ITableDataFrame implementations. They manage:

- Storage of rows and columns
- Query execution through SelectQueryStruct
- Metadata such as schema and field types
- Caching and optimizations
- Data transformations

Frames exist inside the Insight session and are registered in the VarStore. They persist as long as the Notebook session is active or until cleared.

## Validation

### Confirming Frame Creation

- Tabular preview appears under the cell.
- Console logs indicate alias creation.
- Transformation or downstream cells accept the Frame.
- UI blocks display data when bound.

### Confirming Transformations

- A new Frame output appears.
- Column values reflect transformation.
- Dependent queries update correctly.

### Common Checks

- Notebook language matches the code.
- Database permissions are valid.
- Variable references point to correct query IDs.
- Frame alias is correct and consistent.

## Common Errors

### Frame not found

Cause: Alias not created or mis-typed.
Fix: Re-run the Notebook cell and verify alias.

### Column does not exist

Cause: Transformation references a non-existent column.
Fix: Check schema in the Frame preview.

### Empty output

Cause: Query or filter returns zero rows.
Fix: Verify query logic.

## Resources

- [No Code App documentation](../Building%20Apps/Drag%20and%20Drop/No%20Code%20App.mdx)
- [Notebook documentation](../Building%20Apps/Drag%20and%20Drop/No%20Code%20App.mdx#Notebook)
- [Pixel syntax reference](../Building%20Apps/Add%20Custom%20Reactors%20to%20Apps/Pixels.md)
- [Frame Pixels](../developer/Reactors/frame.mdx)
- [General Frame Pixels](../developer/Reactors/generalframe.mdx)

