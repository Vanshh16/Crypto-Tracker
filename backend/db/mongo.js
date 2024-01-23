const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const tickerSchema = new mongoose.Schema({
    name: String,
    last: String,
    buy: String, 
    sell: String,
    volume: String,
    base_unit: String
  });

  module.exports = mongoose.model("Ticker", tickerSchema);
 