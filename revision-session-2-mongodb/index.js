const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connect");
const cityRouter = require("./routes/cities.routes");

dotenv.config();
connectDB();

const app = express();
const PORT = 8088;

app.use(express.json());

app.use("/cities", cityRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
