require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());


app.listen(process.env.PORT, () => {
  console.log('server is running on port ', process.env.PORT);
})