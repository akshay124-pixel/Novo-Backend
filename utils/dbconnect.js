const mongoose = require("mongoose");

const URI =
  "mongodb+srv://mrakshaythakur124:Akshay0001@cluster0.mls7h5e.mongodb.net/mernapp_data";

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Successfully Connected Database");
  } catch (error) {
    console.error("Nhi Hua Connect Database");
    process.exit(0);
  }
};

module.exports = connectDb;
