const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    contentBase: path.join(__dirname, 'build'),
    disableHostCheck: true,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
  entry: {
    app: './app/index.js',
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true,
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory',
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      chunks: 'app',
      filename: 'index.html',
      template: './app/index.html',
    }),
  ],
};
