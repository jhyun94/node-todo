var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jon');
mongoose.Promise = global.Promise;

module.exports = {mongoose};