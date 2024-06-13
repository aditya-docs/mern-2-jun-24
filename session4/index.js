const express = require("express");
require("dotenv").config();

const currencyRouter = require("./routes/currencies.routes");
const userRouter = require("./routes/users.routes");
// const verifyAuth = require("./middlewares/verifyAuth");

const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

// app.use(verifyAuth);
app.use("/currencies", currencyRouter);

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`server running on: ${PORT}`);
});
