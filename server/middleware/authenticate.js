var {User} = require('./../models/user');
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  var decoded;

  User.findByToken(token).then((user) => {
    if (!user) {
      return new Promise.reject();
    }
    req.token = token;
    req.user = user;
    next();
  }).catch((e) => {
    res.status(400).send(e);
  })
}

module.exports = {
  authenticate
}


