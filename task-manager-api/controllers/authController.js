const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
====================================
REGISTER USER
====================================
*/
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields"
      });
    }

    // check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
====================================
LOGIN USER
====================================
*/
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields"
      });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
====================================
GET CURRENT USER (DAY 11 EXTRA)
====================================
*/
exports.getMe = async (req, res) => {
  try {
    // req.user.id was attached automatically by your authMiddleware decoding the JWT!
    const user = await User.findById(req.user.id).select("-password"); // Hide the password hash
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};