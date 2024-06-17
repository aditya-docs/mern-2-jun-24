const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = new mongoose.Schema(
  {
    fullName: { type: String, maxlength: 25 },
    twitterHandle: { type: String },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: ({ value }) => `${value} is not a valid email`,
      },
    },
    image: {
      type: String,
      validate: {
        validator: (value) => validator.isURL(value),
        message: ({ value }) => `${value} is not a valid URL`,
      },
    },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true }, //Title is string
    authors: [authorSchema], //Authors is an array of strings
    content: String, //Content is string
    publishedAt: Date, //publishedAt is Date
  },
  { timestamps: true }
);

module.exports = blogSchema;
