require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {authenticate} = require('./middleware/authenticate');


const mongoose = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

var app = express();
app.use(bodyParser.json());
//create users
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
//users dashboard
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
})
//users login
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(401).send(e);
  })
})
//logout a user
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then((user) => {
    res.send();
  }).catch((e) => {
    res.status(401).send();
  })
})
//create a todo
app.post('/todos', authenticate, (req, res) => {
  var body = _.pick(req.body, ['text']);
  var todo = new Todo({text: body.text, _creator: req.user._id});

  todo.save().then((todo) => {
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  })
})
//get all todos for that user
app.get('/todos', authenticate, (req,res) => {
  Todo.find({_creator: req.user._id}).then((todo) => {
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})
//get one todo for that user
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  Todo.findOne({_id: id, _creator: req.user._id}).then((todo) => {
    res.send({todo})
  }).catch((e) => {
    res.status(400).send();
  })
})
//update a todo for that user
app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (body.completed === true) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
    body.completed = false;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
    res.send({todo})
  }).catch((e) => {
    res.status(400).send();
  })

})
//delete a todo for that user
app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  Todo.findOneAndRemove({_id: id, _creator: req.user._id}).then((todo) => {
    res.send();
  }).catch((e) => {
    res.status(400).send();
  })
})
app.listen(process.env.PORT, () => {
  console.log('server is running on port ', process.env.PORT);
})