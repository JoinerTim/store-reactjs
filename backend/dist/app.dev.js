"use strict";

//import library
var express = require('express');

var cors = require('cors');

var path = require("path");

var fileUpload = require('express-fileupload');

var bodyParser = require('body-parser');

var cookiParser = require('cookie-parser');

var errorMiddleware = require('./middleware/error'); //create app server using express


var app = express(); //create config to file .env

var dotenv = require('dotenv');

dotenv.config({
  path: __dirname + '/.env'
}); // import route for api

var product = require('./routes/productRoute');

var user = require('./routes/userRoute');

var order = require('./routes/orderRoute');

var cart = require('./routes/cartRoute'); // increase limit file upload request


app.use(express.json({
  limit: '50mb'
}));
app.use(cookiParser());
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
})); // middleware

app.use(fileUpload());
app.use(cors()); //api

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", cart); // all of code for route defalut

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(express["static"](path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
}); //Middleware error hander 

app.use(errorMiddleware);
module.exports = app;