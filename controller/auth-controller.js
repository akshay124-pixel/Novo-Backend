const User = require("../models/user model"); // Corrected model file path and name
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Home
const home = async (req, res) => {
  try {
    res
      .status(200)
      .send("Welcome To MERN Page from router .. using controller");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Registration
const register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    if (!username || !email || !password || !phone) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user with provided email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate token for the newly registered user
    const token = generateToken(userCreated);

    res.status(201).json({
      msg: "Registration Successful",
      token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const isValidPassword = await bcrypt.compare(password, userExist.password);

    const isValidPassword = await userExist.comparePassword(password);

    if (isValidPassword) {
      const token = generateToken(userExist);
      res.status(200).json({
        msg: "Login Successful",
        token,
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Generate JWT token function
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "YourSecretKey",
    {
      expiresIn: "365d",
    }
  );
};

// User Logic To send User Data

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error in user controller : ${error}`);
  }
};
module.exports = { home, register, login, user };
