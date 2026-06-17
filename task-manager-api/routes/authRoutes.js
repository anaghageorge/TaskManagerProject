const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe // 👈 1. ADD THIS TO THE IMPORTS
} = require("../controllers/authController");

// 💡 Import your protection middleware (adjust path if your middleware folder matches a different layout)
const authMiddleware = require("../middleware/authMiddleware"); 

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🚀 2. ADD THE PROTECTED PROFILE ROUTE HERE
router.get("/me", authMiddleware, getMe);

module.exports = router;