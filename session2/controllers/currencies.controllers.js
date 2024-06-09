const axios = require("axios");
// const currenciesData = require("./currencies.json");

const getCurrencies = async (req, res) => {
  const { min_value } = req.query;
  try {
    const { data: currenciesData } = await axios.get(
      "https://api.coinbase.com/v2/currencies"
    );
    if (min_value)
      return res.send(
        currenciesData.data.filter(({ min_size }) => min_size === min_value)
      );
    res.send(currenciesData.data);
  } catch (error) {
    console.log(error);
    res.status(505).send({ message: "Problems in fetching data, retry!" });
  }
};

const getCurrencyBySymbol = async (req, res) => {
  const { symbol } = req.params;
  try {
    const { data: currenciesData } = await axios.get(
      "https://api.coinbase.com/v2/currencies"
    );
    const reqCurrency = currenciesData.data.find(
      ({ id }) => id.toLowerCase() === symbol.toLowerCase()
    );
    if (reqCurrency === undefined)
      return res.status(404).send({ message: "Invalid currency symbol" });
    res.status(200).send(reqCurrency);
  } catch (error) {
    res.status(505).send({ message: "Problems in fetching data, retry!" });
  }
};

module.exports = { getCurrencies, getCurrencyBySymbol };
