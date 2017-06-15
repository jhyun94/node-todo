var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jon');

module.exports = {mongoose};