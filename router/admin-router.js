const express = require("express");
const router = express.Router();
const authmiddleware = require("../middlewares/auth-middleware");
const {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  UpdateUserById,
  deleteContactById,
} = require("../controller/admin-controller");

router.get("/user", authmiddleware, getAllUsers);
router.delete("/user/delete/:id", authmiddleware, deleteUserById);
router.get("/user/:id", authmiddleware, getUserById);
router.route("/user/update/:id").patch(authmiddleware, UpdateUserById);
router.delete("/contact/delete/:id", authmiddleware, deleteContactById);
router.get("/contact", authmiddleware, getAllContacts);

module.exports = router;
