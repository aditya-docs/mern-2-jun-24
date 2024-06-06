const express = require("express");
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("./controllers/currencies.controllers");

const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.get("/currencies", getCurrencies);

app.get("/currencies/:symbol", getCurrencyBySymbol);

app.listen(PORT, () => {
  console.log(`server running on: ${PORT}`);
});
