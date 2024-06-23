const mongoose = require("mongoose");

const landmarkSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

const citySchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    landmarks: [landmarkSchema],
  },
  { timestamps: true }
);

const cityModel = mongoose.model("City", citySchema, "cities");

module.exports = cityModel;
