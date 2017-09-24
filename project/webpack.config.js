// Using current version of javascript so 'webpack' macros work.

const atImport = require('postcss-import')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true&timeout=2000&path=/hot',
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'node_modules/react-grid-layout/css/styles.css'),
    path.resolve(__dirname, 'source/app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/',
  },
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.json', '.jsx', '.js'],
    alias: {
      app: path.resolve(__dirname, 'source/app'),
      styles: path.resolve(__dirname, 'source/styles')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel'
      },
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, 'source'),
        loader: 'babel'
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextWebpackPlugin.extract(
          "style",
          "css!sass!postcss"
        )
      },
      {
        include: /\.json$/,
        loaders: ["json-loader"]
      },
    ],
    postcss: [
      atImport({
        path: ['node_modules', './source',]
      })
    ]
  },
  plugins: [
    // For production be sure to include uglify here.
    new ExtractTextWebpackPlugin('app.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // Works better with flow and hot swapping.
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'true'
    }),
    new FlowStatusWebpackPlugin({
      restartFlow: true
    })
  ]
}
