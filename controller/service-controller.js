const Service = require("../models/service-model");

const servicepage = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ msg: "No service Found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ msg: "Failed to send service. Please try again later." });
  }
};

module.exports = servicepage;
