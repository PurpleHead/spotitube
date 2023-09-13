const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new NodePolyfillPlugin(),
    new Dotenv({
      ignoreStub: true,
      path: './process.env'
    })
  ],
  devServer: {
    static: './static',
    compress: true,
    port: 9000,
  },
};