var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;


UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true
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

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt , (err, res) => {
        user.password = res;
        next();
      })
    })
  } else {
    next();
  }
  
})

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
}