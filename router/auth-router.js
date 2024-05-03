const express = require("express");
const router = express.Router();
const { signupSchema, loginSchema } = require("../validater/auth-validater");

const validate = require("../middlewares/validate-middleware");
const authmiddleware = require("../middlewares/auth-middleware");
const {
  home,
  register,
  login,
  user,
} = require("../controller/auth-controller");
//Way One To Define Route

// router.get("/", (req, res) => {
//   res.status(200).send("Welcome To MERN Page from router ..");
// });

// way two to define Route
router.route("/").get(home);

router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/user").get(authmiddleware, user);

module.exports = router;
