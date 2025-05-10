# -mongodb-practice
 mongodb-practice

<div style="font-size:2.5em; font-weight:bold; text-align:center; margin-top:20px;">MongoDB Practice Project</div>

A Node.js application demonstrating MongoDB operations and queries with various datasets. This project serves as a practical guide to learning MongoDB fundamentals through code examples and real-world data manipulation.

# 1. Project Overview

## 1.1 Purpose
This project demonstrates common MongoDB operations including:
- Connecting to MongoDB databases
- Creating and managing collections
- Performing CRUD operations (Create, Read, Update, Delete)
- Executing complex queries and aggregations
- Importing datasets from JSON files

## 1.2 Project Structure
```
mongodb-practice/
├── data/                      # JSON datasets directory
│   ├── README.md              # Dataset documentation
│   ├── movies-dataset.json    # Sample movie data
│   └── sample-dataset.json    # Sample product data
├── IMPORTING_DATA.md          # Guide for importing data 
├── LICENSE                    # MIT License
├── README.md                  # This file
├── import-all-datasets.js     # Script to import all datasets
├── import-dataset.js          # Script to import a single dataset
├── index.js                   # Main application with student data operations
└── package.json               # Project dependencies and metadata
```

# 2. Getting Started

## 2.1 Prerequisites
- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)

## 2.2 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mongodb-practice.git
   cd mongodb-practice
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB (choose one option):
   - Using the MongoDB service:
     ```bash
     # On Windows
     net start MongoDB
     
     # On macOS/Linux
     sudo systemctl start mongod
     ```
   
   - Using Docker:
     ```bash
     docker run -d -p 27017:27017 --name mongodb mongo:latest
     ```

## 2.3 Running the Application

1. Import sample datasets:
   ```bash
   node import-all-datasets.js
   ```

2. Run the main application:
   ```bash
   npm start
   # or
   node index.js
   ```

# 3. MongoDB Collections

## 3.1 Students Collection
The main application (index.js) demonstrates operations on a `students` collection with the following schema:

```javascript
{
  name: String,            // Student's full name
  age: Number,             // Age in years
  grade: String,           // Letter grade (A, B, C, etc.)
  major: String,           // Field of study
  courses: [String],       // Array of course names
  contact: {               // Nested contact information
    email: String,
    phone: String
  },
  enrollmentDate: Date,    // When the student enrolled
  isActive: Boolean        // Whether the student is currently active
}
```

## 3.2 Products Collection
The `products` collection contains electronics items imported from `sample-dataset.json`.

## 3.3 Movies Collection
The `movies` collection contains film data imported from `movies-dataset.json`.

# 4. Features and Examples

## 4.1 Basic Queries
The application demonstrates fundamental MongoDB operations:

```javascript
// Finding documents by field value
const csMajors = await students.find({ major: "Computer Science" }).toArray();

// Using comparison operators
const youngStudents = await students.find({ age: { $lt: 21 } }).toArray();

// Sorting results
const activeStudents = await students.find({ isActive: true }).sort({ age: 1 }).toArray();
```

## 4.2 Array Operations
```javascript
// Finding documents with a specific array element
const databaseStudents = await students.find({ courses: "Database" }).toArray();

// Finding documents with multiple array elements
const specificCourses = await students.find({
  courses: { $all: ["Database", "Algorithms"] }
}).toArray();
```

## 4.3 Update Operations
```javascript
// Update a single document
const updateResult = await students.updateOne(
  { name: "Emily Davis" },
  { $set: { grade: "A" } }
);
```

## 4.4 Aggregation Operations
```javascript
// Group by a field and count documents
const majorCounts = await students.aggregate([
  { $group: { _id: "$major", count: { $sum: 1 } } }
]).toArray();
```

# 5. Data Import Utilities

## 5.1 Single Dataset Import
The `import-dataset.js` script allows importing a single JSON file into MongoDB.

Configuration options:
```javascript
const config = {
  datasetPath: './data/movies-dataset.json', // Path to your JSON dataset
  dbName: 'mydb',                           // Database name
  collectionName: 'movies',                 // Collection name
  dropExisting: true                        // Whether to drop existing collection
};
```

## 5.2 Multiple Dataset Import
The `import-all-datasets.js` script imports all configured datasets in a single operation.

# 6. Resources

## 6.1 MongoDB Documentation
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [MongoDB Query Operators](https://docs.mongodb.com/manual/reference/operator/query/)

## 6.2 Additional Resources
- [MongoDB University](https://university.mongodb.com/) - Free MongoDB courses
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - MongoDB cloud database service

# 7. License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# 8. Author
Samaneh Hesabi
