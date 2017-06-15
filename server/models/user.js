var mongoose = require('mongoose');

var User = mongoose.model('user', {
  email: {
    type: String,
    required: true
  }
})

module.exports = {User};