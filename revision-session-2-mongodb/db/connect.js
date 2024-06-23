const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (process.env.ENV === "prod") {
      await mongoose.connect(process.env.MONGODB_PROD_URI);
    } else {
      await mongoose.connect(process.env.MONGODB_DEV_URI);
    }
    console.log(`${process.env.ENV} database connected!`);
  } catch (error) {
    console.error(`error in connecting to the ${process.env.ENV} DB`);
  }
};

module.exports = connectDB;
