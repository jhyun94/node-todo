var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Todo} = require('./models/user');

var app = express();

app.listen(8000, () => {
  console.log('server is running');
});

