require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {authenticate} = require('./middleware/authenticate');


const mongoose = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then(() => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).send(e);
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send()
})

app.listen(process.env.PORT, () => {
  console.log('server is running on port ', process.env.PORT);
})