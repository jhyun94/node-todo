const mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    default: false,
    type: Boolean,
  },
  completedAt: {
    type: Number
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
  Todo
};