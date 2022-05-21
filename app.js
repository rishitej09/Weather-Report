const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const { sendfile } = require("express/lib/response");

const app = express();
app.use(bodyparser.urlencoded({extended : true})); //to get the data of the user input.

app.get( "/" , function ( req , res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , function( req , res){
    const city = req.body.cityName ;
    const API_KEY = //get it from your openweatherapp account
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ API_KEY +"&units=metric";
    https.get(url , function(response){
    //    console.log(response); 

       response.on("data" , function(data){
            const weather = JSON.parse(data); //changing the data format.
            const temp = weather.main.temp;
            const feelsLike = weather.main.feels_like;
            const description = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1>The Temperature is "+ temp +" Degree Celsius.</h1>");
            res.write("<h1>It Feels Like "+ feelsLike +".</h1>");
            res.write("<h1>The Weather is Currently "+ description +".</h1>");
            res.write("<img src="+ iconURL +">");
            res.send();
       });
    });
});

app.listen( 3000 , function ( req , res) {
    console.log("your server is running at 3000");    
});
