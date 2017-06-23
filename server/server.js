var express = require('express');

var mongoose = require('./db/mongoose');

var app = express();

app.listen(3000, () => {
  console.log('server is running on 3000');
})