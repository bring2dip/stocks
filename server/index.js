const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const webpackConfig = require('../webpack/webpack.config.dev');

const lazyWebpackConfig = {
  ...webpackConfig,
}

const app = express();

app.use(['/', '/analytics'], (req, res, next) => {
  const entryPath = req.path.replace('/', '') || 'index';
  console.log('entryPath', entryPath);
  lazyWebpackConfig.entry = {
    [entryPath]: path.resolve('src', 'features', entryPath, `${entryPath}.js`),
  };
  const lazyCompiler = webpack(lazyWebpackConfig);
  return WebpackDevMiddleware(lazyCompiler)(req, res, next);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Stocks app listening on port ${port}!`));