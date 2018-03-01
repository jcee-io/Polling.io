const path = require('path');
 
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    'babel-polyfill',
    './index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['webpack.js', '.js', '.json', '.jsx'],
  },
};