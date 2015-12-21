import express from 'express';
import historyApiFallback from 'connect-history-api-fallback';
import config from '../config';
import bodyParser from 'body-parser';
// import dbConfig from './db/config';
import User from './models/user';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data-coral');
// const mongoose = require('mongoose');
const app = express();
const debug = require('debug')('app:server');
const paths = config.utils_paths;

app.use(bodyParser.json({
  type: 'application/json'
}));

app.use(historyApiFallback({
  verbose: false
}));

app.post('/api/login', function(req, res) {
  mongoose.model('users').find({}, function(err, user) {
    console.log('-------USER------');
    console.log(user);
    console.log("Request");
    console.log(req.user);
    // console.log(req.socket);
    console.log(req.stack);
    const credentials = req.body;
    console.log("credentials");
    console.log(credentials);
    if (credentials.user === user.email && credentials.password === user.password) {
      res.json({
        'name': user.name,
        'company': user.company,
        'email': user.email,
        'userId': user._id
      });
    } else {
      res.status('500').send({
        'message': 'Invalid user/password'
      });
    }
  });

});

app.post('/api/logout', function(req, res) {
  res.json({
    'user': 'admin',
    'role': 'ADMIN'
  });
});

// Serve app with Webpack if HMR is enabled
if (config.compiler_enable_hmr) {
  const webpack = require('webpack');
  const webpackConfig = require('../build/webpack');
  const compiler = webpack(webpackConfig);

  app.use(require('./middleware/webpack-dev')({
    compiler,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('./middleware/webpack-hmr')({
    compiler
  }));


} else {
  console.log(
    'Application is being run outside of development mode. This starter kit ' +
    'does not provide any production-specific server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.base(config.dir_dist)));
}

export default app;
