var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb')

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());

//create a todo
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
// read all todos
app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }).catch((e) => {
    res.status(400).send();
  })
})

//read an individual todo
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(404).send()
  })
})

//update an individual todo
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (body.completed === true) {
    body.completedAt = new Date().getTime();
  }
  else {
    body.completedAt = null;
    body.completed = false
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {new: true}).then((todo) => {
    if (!todo){
      res.status(400).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(404).send();
  })

})

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(404).send();
  })
})



app.listen(port || 8000, () => {
  console.log('server is running');
});

