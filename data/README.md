<div style="font-size:2.5em; font-weight:bold; text-align:center; margin-top:20px;">MongoDB Project Data Directory</div>

This directory contains datasets for importing into MongoDB collections.

# 1. Directory Contents

## 1.1 Dataset Files
- `sample-dataset.json` - A sample product catalog dataset with 5 products including laptops, smartphones, and other electronics. This file demonstrates a nested document structure with arrays, nested objects, and various data types.
- `movies-dataset.json` - A collection of 5 popular movies with details including title, director, cast, ratings, and box office performance. This dataset is ideal for practicing queries on nested arrays and objects.

# 2. Using These Datasets

## 2.1 Import Process
These datasets can be imported into MongoDB using the `import-dataset.js` script located in the root directory of the project.

To import a dataset:
1. Ensure MongoDB is running
2. Update the configuration in `import-dataset.js` if needed (change the datasetPath to point to your chosen dataset)
3. Run `node import-dataset.js`

## 2.2 Dataset Format Requirements
- Datasets should be valid JSON
- The preferred format is a JSON array of documents
- Each document should follow the schema expected by your application

# 3. Adding New Datasets
When adding new datasets to this directory:
1. Use descriptive filenames
2. Update this README.md file to document the new dataset
3. Consider including schema information for each dataset 