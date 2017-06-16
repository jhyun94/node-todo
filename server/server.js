var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var text = req.body.text;

  var newTodo = new Todo({
    text
  });

  newTodo.save().then((todo) => {
    res.send({todo})
  }).catch((e) => {
    res.status(400).send();
  })
})

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }).catch((e) => {
    res.status(400).send();
  })
})


app.listen(8000, () => {
  console.log('server is running');
});

