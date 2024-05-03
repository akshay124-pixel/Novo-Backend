const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Use "async function" instead of arrow function to access "this"
// userSchema.pre("save", async function (next) {
//   const user = this;

//   if (!user.isModified("password")) {
//     return next(); // Return to exit early
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//     next(); // Call next to move to the next middleware
//   } catch (error) {
//     next(error); // Pass error to Express error handler
//   }
// });

// compare the password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//JSON WEB TOKEN
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      "Sign",
      {
        expiresIn: "365d",
      }
    );
  } catch (error) {}
};

// Define the model or collection name
const User = mongoose.model("User", userSchema);

module.exports = User;
