const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");
const Ticker = require("./db/mongo");

const app = express();

const tickerLink = "https://api.wazirx.com/api/v2/tickers";

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/",async function(req,res){
    try {
        const apiResponse = await axios.get('https://api.wazirx.com/api/v2/tickers');
        await Ticker.deleteMany();
        await Ticker.insertMany(Object.values(apiResponse.data)); 
    
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
      }

    const data = await Ticker.find();
    const top10Data = data.slice(0, 10);
    res.render("index",{ top10Data: top10Data });
});

app.post("/",function(req,res){

});

app.listen("3000", function(){
  console.log("Server is running on port 3000");
});
