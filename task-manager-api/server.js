const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // 👈 1. IMPORT CORS HERE
const connectDB = require("./config/db");
const Task = require("./models/Task");

// Routes
const authRoutes = require("./routes/authRoutes");

// Middleware
const protect = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors()); // 👈 2. USE CORS HERE (Must be before routes!)
app.use(express.json());

/*
====================================
AUTH ROUTES
====================================
*/
app.use("/api/auth", authRoutes);

/*
====================================
HEALTH CHECK
====================================
*/
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy"
  });
});

/*
====================================
TASK ROUTES (USER-BASED + PROTECTED)
====================================
*/

// GET ALL TASKS
app.get("/api/tasks", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET TASK BY ID
app.get("/api/tasks/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE TASK
app.post("/api/tasks", protect, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE TASK
app.put("/api/tasks/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE TASK
app.delete("/api/tasks/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/*
====================================
ERROR HANDLER (MUST BE LAST)
====================================
*/
app.use(errorHandler);

/*
====================================
START SERVER
====================================
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});