const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true }, //Title is string
    authors: [String], //Authors is an array of strings
    content: String, //Content is string
    publishedAt: Date, //publishedAt is Date
  },
  { timestamps: true }
);

module.exports = blogSchema;
