const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Datasets to import
const datasets = [
  {
    path: './data/sample-dataset.json',
    collection: 'products',
    description: 'Product catalog with electronics'
  },
  {
    path: './data/movies-dataset.json',
    collection: 'movies',
    description: 'Movie information dataset'
  }
];

// Database name
const dbName = 'mydb';

async function importAllDatasets() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB server');
    
    const db = client.db(dbName);
    
    // Import each dataset
    for (const dataset of datasets) {
      console.log(`\n=== Importing ${dataset.description} ===`);
      await importDataset(db, dataset);
    }
    
    // Display database summary
    console.log('\n=== Database Summary ===');
    const collections = await db.listCollections().toArray();
    console.log(`Database: ${dbName}`);
    console.log(`Collections: ${collections.map(c => c.name).join(', ')}`);
    
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`- ${collection.name}: ${count} documents`);
    }
    
  } catch (error) {
    console.error('Error importing datasets:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

async function importDataset(db, dataset) {
  const collection = db.collection(dataset.collection);
  
  // Check if file exists
  if (!fs.existsSync(dataset.path)) {
    console.error(`Dataset file not found: ${dataset.path}`);
    return;
  }
  
  // Read and parse the JSON file
  console.log(`Reading dataset from ${dataset.path}`);
  const fileContent = fs.readFileSync(dataset.path, 'utf8');
  const data = JSON.parse(fileContent);
  
  // Check if data is an array
  const dataArray = Array.isArray(data) ? data : (data.data || [data]);
  
  // Drop existing collection
  console.log(`Dropping existing collection: ${dataset.collection}`);
  await collection.drop().catch(err => {
    // Ignore collection doesn't exist error
    if (err.code !== 26) {
      console.log(`Note: Collection didn't exist or couldn't be dropped: ${err.message}`);
    }
  });
  
  // Insert the data
  console.log(`Importing ${dataArray.length} documents into ${dataset.collection} collection`);
  const result = await collection.insertMany(dataArray);
  
  console.log(`Successfully imported ${result.insertedCount} documents`);
  
  // Display sample of imported data
  console.log('\nSample of imported data:');
  const samples = await collection.find().limit(1).toArray();
  console.log(JSON.stringify(samples[0], null, 2));
}

// Create data directory if it doesn't exist
const dataDir = path.dirname(datasets[0].path);
if (!fs.existsSync(dataDir)) {
  console.log(`Creating directory: ${dataDir}`);
  fs.mkdirSync(dataDir, { recursive: true });
}

// Run the import function
importAllDatasets().catch(console.dir); 