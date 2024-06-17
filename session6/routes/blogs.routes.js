const express = require("express");
const {
  getBlogs,
  getBlogById,
  searchBlogs,
  postBlog,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blogs.controllers");
const router = express.Router();

router.get("/", getBlogs);
router.get("/search", searchBlogs);
router.get("/:id", getBlogById);

router.post("/", postBlog);
router.patch("/:id", updateBlogById);
router.delete("/:id", deleteBlogById);

module.exports = router;
