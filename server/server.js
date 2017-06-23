require('./config/config');
var express = require('express');

var mongoose = require('./db/mongoose');

var app = express();


app.listen(process.env.PORT, () => {
  console.log('server is running on port ', process.env.PORT);
})