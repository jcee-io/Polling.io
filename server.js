const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const path = require('path');

const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));  
}

app.post('/signup', async (req, res) => {
  const { username, email } = req.body;
  const salt = await bcrypt.genSaltAsync(10);
  const password   = await bcrypt.hashAsync(req.body.password, salt);

  res.json({ username, email, password });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});