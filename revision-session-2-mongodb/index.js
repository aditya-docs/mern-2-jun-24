const express = require("express");
const dotenv = require("dotenv");
const cityRouter = require("./routes/cities.routes.js");

dotenv.config();

const app = express();
const PORT = 8088;

app.use(express.json());

app.use("/cities", cityRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
