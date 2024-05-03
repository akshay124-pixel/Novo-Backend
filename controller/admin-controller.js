const User = require("../models/user model");
const Contact = require("../models/contact-model");
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Delete  a single user by its id
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
// Delete Single Contact By ID
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the contact" });
  }
};

// Edit a single user Logic
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
// User Update Logic
const UpdateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const UpdatedUserData = req.body;
    const updatedData = await User.updateOne(
      { _id: id },
      { $set: UpdatedUserData }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    console.log(error);
  }
};

//Get Contact
const getAllContacts = async (req, res) => {
  try {
    const contact = await Contact.find({}, { password: 0 });
    if (!contact || contact.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  UpdateUserById,
  deleteContactById,
};
