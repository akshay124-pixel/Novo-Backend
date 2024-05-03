const jwt = require("jsonwebtoken");
const User = require("../models/user model");

const authmiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token not provided." });
  }
  const jwtToken = token.replace("Bearer ", ""); // Remove unnecessary replace
  console.log("Token from auth Middleware:", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, "YourSecretKey"); // Use correct secret key
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }
    req.user = userData;
    req.token = jwtToken; // Use jwtToken here instead of token
    req.userID = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authmiddleware;
