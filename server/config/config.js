var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var file = require('./config.json');
  var envConfig = file[env];
  Object.keys(envConfig).forEach((keys) => {
    process.env[keys] = envConfig[keys];
  })
}