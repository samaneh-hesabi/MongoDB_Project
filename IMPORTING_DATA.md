<div style="font-size:2.5em; font-weight:bold; text-align:center; margin-top:20px;">Importing NoSQL Datasets into MongoDB</div>

This guide explains how to import NoSQL datasets into your MongoDB database using the provided import script.

# 1. Prerequisites

## 1.1 MongoDB Server
- Ensure MongoDB server is installed and running
- Default connection is to `mongodb://localhost:27017`

## 1.2 Node.js
- Node.js must be installed
- The MongoDB Node.js driver is required (included in project dependencies)

# 2. Importing a Dataset

## 2.1 Using the Import Script
The project includes `import-dataset.js` that makes importing JSON data into MongoDB simple:

```bash
# From project root directory
node import-dataset.js
```

## 2.2 Configuration Options
You can modify the following settings in `import-dataset.js`:

```javascript
const config = {
  datasetPath: './data/sample-dataset.json', // Path to your JSON dataset
  dbName: 'mydb',                            // Database name
  collectionName: 'imported_data',           // Collection name
  dropExisting: true                         // Whether to drop existing collection
};
```

## 2.3 Custom Dataset
To import your own dataset:
1. Place your JSON file in the `data/` directory
2. Update the `datasetPath` in the config to point to your file
3. Run the import script

# 3. Dataset Formats

## 3.1 Supported Formats
The import script supports two JSON formats:

### 3.1.1 JSON Array
```json
[
  { "field1": "value1", "field2": "value2" },
  { "field1": "value3", "field2": "value4" }
]
```

### 3.1.2 JSON Object with Data Array
```json
{
  "data": [
    { "field1": "value1", "field2": "value2" },
    { "field1": "value3", "field2": "value4" }
  ]
}
```

## 3.2 Preparing External Datasets
When using datasets from external sources:

1. Ensure the JSON structure is valid
2. Convert CSV or other formats to JSON if necessary
3. Consider preprocessing large datasets to ensure they match your schema

# 4. Examples

## 4.1 Importing the Sample Dataset
A sample product catalog dataset is included at `data/sample-dataset.json`:

```bash
# Default configuration imports this dataset
node import-dataset.js
```

## 4.2 Importing External Data
To import a different dataset:

```bash
# Edit the config in import-dataset.js first, then run:
node import-dataset.js
```

# 5. Troubleshooting

## 5.1 Common Issues
- **Connection Error**: Ensure MongoDB is running on the expected host/port
- **JSON Parse Error**: Verify your JSON is valid
- **Directory Not Found**: The data directory is created automatically, but ensure write permissions are correct
- **Duplicate Key Error**: If your data contains duplicate IDs and you're not dropping the collection

## 5.2 Logging
The import script provides detailed logging to help diagnose issues during the import process. 