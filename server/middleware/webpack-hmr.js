import WebpackHotMiddleware from 'webpack-hot-middleware';

const debug = require('debug')('app:server:webpack-hmr');

export default function ({ compiler }) {
  console.log('Enable Webpack Hot Module Replacement (HMR).');

  return WebpackHotMiddleware(compiler);
}
