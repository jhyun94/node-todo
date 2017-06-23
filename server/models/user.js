var mongoose = require('mongoose');
var validator = require('validator');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    required: true,
    trim: true,
    unique: true,
    type: String,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    required: true,
    type: String
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})
var User = mongoose.model('user', UserSchema);

module.exports = {User};