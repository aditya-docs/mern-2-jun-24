const Blog = require("../models/blog.model");

class BlogService {
  getAll = () => Blog.find();

  getById = (blogId) => Blog.findById(blogId);

  queryByTitleOrAuthor = (title, author) =>
    Blog.find({
      $or: [
        { title: { $regex: new RegExp(title), $options: "i" } },
        { authors: { $elemMatch: { email: author } } },
      ],
    });

  create = (blogObj) => new Blog(blogObj).save();

  updateById = (blogId, updateObj) =>
    Blog.findByIdAndUpdate(blogId, updateObj, {
      new: true,
    });

  deleteById = (blogId) => Blog.findByIdAndDelete(blogId);
}

module.exports = BlogService;
