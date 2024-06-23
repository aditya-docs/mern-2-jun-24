const BlogService = require("../services/blog.service");
const BlogServiceInstance = new BlogService();

const getBlogs = async (_, res) => {
  try {
    res.send(await BlogServiceInstance.getAll());
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong" });
  }
};

const getBlogById = async (req, res) => {
  const { id: blogId } = req.params;
  try {
    const reqBlog = await BlogServiceInstance.getById(blogId);
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
  try {
    const reqBlogs = await BlogServiceInstance.queryByTitleOrAuthor(
      title,
      author
    );
    res.send(reqBlogs);
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong" });
  }
};

const postBlog = async (req, res) => {
  const { title, authors, content, publishedAt } = req.body;
  try {
    //const newBlog = await Blog.create({ title, authors, content, publishedAt });
    const newBlog = await BlogServiceInstance.create({
      title,
      authors,
      content,
      publishedAt,
    });
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
    const result = await BlogServiceInstance.updateById(blogId, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong" });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    await BlogServiceInstance.deleteById(req.params.id);
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
