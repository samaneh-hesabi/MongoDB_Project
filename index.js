const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('mydb');
    const students = db.collection('students');
    
    // Clear existing data (if any)
    await students.deleteMany({});
    
    // Insert sample data
    const sampleData = [
      {
        name: "John Smith",
        age: 20,
        grade: "A",
        major: "Computer Science",
        courses: ["Database", "Algorithms", "Web Development"],
        contact: {
          email: "john@example.com",
          phone: "555-1234"
        },
        enrollmentDate: new Date("2021-09-01"),
        isActive: true
      },
      {
        name: "Sarah Johnson",
        age: 22,
        grade: "B+",
        major: "Biology",
        courses: ["Genetics", "Chemistry", "Statistics"],
        contact: {
          email: "sarah@example.com",
          phone: "555-5678"
        },
        enrollmentDate: new Date("2020-09-01"),
        isActive: true
      },
      {
        name: "Michael Chen",
        age: 19,
        grade: "A-",
        major: "Physics",
        courses: ["Mechanics", "Calculus", "Thermodynamics"],
        contact: {
          email: "michael@example.com",
          phone: "555-9012"
        },
        enrollmentDate: new Date("2022-01-15"),
        isActive: true
      },
      {
        name: "Emily Davis",
        age: 21,
        grade: "B",
        major: "Computer Science",
        courses: ["Database", "Artificial Intelligence", "Software Engineering"],
        contact: {
          email: "emily@example.com",
          phone: "555-3456"
        },
        enrollmentDate: new Date("2021-01-10"),
        isActive: false
      },
      {
        name: "David Wilson",
        age: 23,
        grade: "C+",
        major: "Mathematics",
        courses: ["Linear Algebra", "Statistics", "Calculus"],
        contact: {
          email: "david@example.com",
          phone: "555-7890"
        },
        enrollmentDate: new Date("2020-09-01"),
        isActive: true
      }
    ];
    
    const result = await students.insertMany(sampleData);
    console.log(`${result.insertedCount} documents inserted`);
    
    // Example query 1: Find all Computer Science majors
    console.log("\nComputer Science majors:");
    const csMajors = await students.find({ major: "Computer Science" }).toArray();
    console.log(csMajors);
    
    // Example query 2: Find students younger than 21
    console.log("\nStudents younger than 21:");
    const youngStudents = await students.find({ age: { $lt: 21 } }).toArray();
    console.log(youngStudents);
    
    // Example query 3: Find active students sorted by age
    console.log("\nActive students sorted by age:");
    const activeStudents = await students.find({ isActive: true }).sort({ age: 1 }).toArray();
    console.log(activeStudents);
    
    // Example query 4: Find students who take Database course
    console.log("\nStudents taking Database course:");
    const databaseStudents = await students.find({ courses: "Database" }).toArray();
    console.log(databaseStudents);
    
    // Example query 5: Update a student's grade
    console.log("\nUpdating Emily's grade to A:");
    const updateResult = await students.updateOne(
      { name: "Emily Davis" },
      { $set: { grade: "A" } }
    );
    console.log(`${updateResult.modifiedCount} document updated`);
    
    // Example query 6: Count students by major
    console.log("\nCount of students by major:");
    const majorCounts = await students.aggregate([
      { $group: { _id: "$major", count: { $sum: 1 } } }
    ]).toArray();
    console.log(majorCounts);
    
    // Example query 7: Finding students with both specific courses
    console.log("\nStudents taking both Database and Algorithms:");
    const specificCourses = await students.find({
      courses: { $all: ["Database", "Algorithms"] }
    }).toArray();
    console.log(specificCourses);
    
  } finally {
    await client.close();
  }
}

run().catch(console.dir); 