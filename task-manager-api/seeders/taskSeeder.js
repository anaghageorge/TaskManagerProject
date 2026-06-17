const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Task = require("../models/Task");

dotenv.config();

connectDB();

const tasks = [
  {
    title: "Learn Node.js",
    description: "Complete Node.js basics",
    priority: "high"
  },
  {
    title: "Learn Express",
    description: "Study Express routing",
    priority: "medium"
  },
  {
    title: "Learn MongoDB",
    description: "Practice CRUD operations",
    priority: "high"
  },
  {
    title: "Build REST API",
    description: "Create task manager API",
    priority: "medium"
  },
  {
    title: "Test with Postman",
    description: "Test all endpoints",
    priority: "low"
  }
];

const importData = async () => {
  try {
    await Task.deleteMany();
    await Task.insertMany(tasks);

    console.log("Tasks Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();