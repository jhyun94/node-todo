var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var text = req.body.text;
  if (text === '') {
    res.status(404).send();
  }
  var newTodo = new Todo({
    text
  });
  newTodo.save().then((todo) => {
    res.send({todo})
  }).catch((e) => {
    res.status(404);
  })
})
app.listen(8000, () => {
  console.log('server is running');
});

