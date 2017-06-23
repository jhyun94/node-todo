require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const mongoose = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
})
app.listen(process.env.PORT, () => {
  console.log('server is running on port ', process.env.PORT);
})