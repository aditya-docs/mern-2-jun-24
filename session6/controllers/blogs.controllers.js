const Blog = require("../models/blog.model");

const getBlogs = async (req, res) => {
  try {
    res.send(await Blog.find());
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong" });
  }
};

const getBlogById = async (req, res) => {
  const { id: blogId } = req.params;
  try {
    const reqBlog = await Blog.findById(blogId);
    if (reqBlog) return res.send(reqBlog);
    res
      .status(404)
      .send({ message: `Blog with this id: ${blogId} could not be found` });
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed"))
      return res.status(400).send({ message: `Invalid Blog Id: ${blogId}` });
    res.status(500).send({ message: "Oops! Something went wrong" });
  }
};

const searchBlogs = async (req, res) => {
  const { title, author } = req.query;
  // let numbers = [1, 2, 3, 4];
  // let obj = { numbers };
  // onj -> { numbers: [1, 2, 3, 4] }
  console.log(author);
  try {
    const reqBlogs = await Blog.find({
      $or: [
        {
          title: { $regex: new RegExp(title), $options: "i" },
        },
        // {
        //   authors: { $elemMatch: { email: { $eq: author } } },
        // },
        {
          authors: { $elemMatch: { email: author } },
        },
      ],
    });
    res.send(reqBlogs);
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong" });
  }
};

const postBlog = async (req, res) => {
  const { title, authors, content, publishedAt } = req.body;
  try {
    //const newBlog = await Blog.create({ title, authors, content, publishedAt });
    const newBlog = await new Blog({
      title,
      authors,
      content,
      publishedAt,
    }).save();
    res.status(201).send(newBlog);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({
        message:
          "Blog post with the same title already exists. Please try a unique title",
      });
    }
    if (error.message.includes("validation failed"))
      return res.send({
        message: Object.values(error.errors).map(
          (item) => item.properties.message
        ),
      });
    res.status(500).send({ message: "Oops! Something went wrong" });
  }
};

const updateBlogById = async (req, res) => {
  const { id: blogId } = req.params;
  try {
    const result = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong" });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong" });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  searchBlogs,
  postBlog,
  updateBlogById,
  deleteBlogById,
};
