const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  let country = req.body.country;
  const appid = "4c0547f25d5f44498ecb80d65cbc80d4";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + country + "&appid=" + appid + "&units=metric";

  https.get(url, function(response) {
    response.on('data', function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(description);
      console.log(icon);
      res.write("<h1>The temperature is " + temp + "</h1>");
      res.write("<h2>The weather is "+ description + "</h2>")
      res.write("<img src=" + imageURL + " alt='weather'>");
      res.send();
    })
  });
})


app.listen(port, function() {
  console.log("The server is up, port: " + port);
})
