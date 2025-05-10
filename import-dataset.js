const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Configuration
const config = {
  datasetPath: './data/movies-dataset.json', // Path to your JSON dataset
  dbName: 'mydb',                            // Database name
  collectionName: 'movies',                  // Collection name
  dropExisting: true                         // Whether to drop existing collection
};

async function importDataset() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB server');
    
    const db = client.db(config.dbName);
    const collection = db.collection(config.collectionName);
    
    // Check if file exists
    if (!fs.existsSync(config.datasetPath)) {
      console.error(`Dataset file not found: ${config.datasetPath}`);
      return;
    }
    
    // Read and parse the JSON file
    console.log(`Reading dataset from ${config.datasetPath}`);
    const fileContent = fs.readFileSync(config.datasetPath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Check if data is an array
    if (!Array.isArray(data)) {
      console.log('Converting object to array (if your JSON is an object with a data property)');
      dataArray = data.data || [data];
    } else {
      dataArray = data;
    }
    
    // Drop existing collection if specified
    if (config.dropExisting) {
      console.log(`Dropping existing collection: ${config.collectionName}`);
      await collection.drop().catch(err => {
        // Ignore collection doesn't exist error
        if (err.code !== 26) {
          console.log(`Note: Collection didn't exist or couldn't be dropped: ${err.message}`);
        }
      });
    }
    
    // Insert the data
    console.log(`Importing ${dataArray.length} documents into ${config.collectionName} collection`);
    const result = await collection.insertMany(dataArray);
    
    console.log(`Successfully imported ${result.insertedCount} documents`);
    
    // Display sample of imported data
    console.log('\nSample of imported data:');
    const samples = await collection.find().limit(2).toArray();
    console.log(JSON.stringify(samples, null, 2));
    
  } catch (error) {
    console.error('Error importing dataset:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Create data directory if it doesn't exist
const dataDir = path.dirname(config.datasetPath);
if (!fs.existsSync(dataDir)) {
  console.log(`Creating directory: ${dataDir}`);
  fs.mkdirSync(dataDir, { recursive: true });
}

// Run the import function
importDataset().catch(console.dir); 