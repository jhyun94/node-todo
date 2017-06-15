var mongoose = require('mongoose');

var Todo = mongoose.model('todo', {
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number
  }
})

module.exports = {Todo};