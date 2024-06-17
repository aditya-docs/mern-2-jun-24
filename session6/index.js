const express = require("express");
require("dotenv").config();

const currencyRouter = require("./routes/currencies.routes");
const userRouter = require("./routes/users.routes");
const blogRouter = require("./routes/blogs.routes");

const connectDB = require("./db/config");
connectDB();

const app = express();
const PORT = 8082;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.use("/currencies", currencyRouter);

app.use("/users", userRouter);

app.use("/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`server running on: ${PORT}`);
});
