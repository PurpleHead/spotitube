const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new NodePolyfillPlugin(),
    new Dotenv({
      ignoreStub: true,
      path: './process.env'
    }),
    new HtmlWebpackPlugin({
      title: 'Spotitube',
      template: './static/index.html'
    })
  ],
  devServer: {
    static: './static',
    compress: true,
    port: 9000,
  },
};