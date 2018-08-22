const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    contentBase: path.join(__dirname, 'build'),
    disableHostCheck: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
    extensions: ['.js', '.vue'],
  },
  entry: {
    app: './app/index.js',
  },
  output: {
    publicPath: './',
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'vue-style-loader',
          'css-loader',
        ],
      },
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
  target: 'web',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      filename: 'index.html',
      template: './app/index.html',
    }),
  ],
};
