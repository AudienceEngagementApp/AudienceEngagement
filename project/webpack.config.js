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
    'webpack-hot-middleware/client?reload=false&timeout=2000&path=/hot',
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'source/app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve(__dirname), "node_modules"],
    extensions: ['.json', '.jsx', '.js'],
    alias: {
      app: path.resolve(__dirname, 'source/app'),
      styles: path.resolve(__dirname, 'source/styles'),
      assets: path.resolve(__dirname, 'source/assets')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, 'source'),
        use: 'babel-loader'
      },
      {
        test: /(\.scss|\.css)$/,
        use: ['css-hot-loader'].concat(
          ExtractTextWebpackPlugin.extract({fallback: 'style-loader', use: [
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  'postcss-import',
                  'autoprefixer': { add: false, browsers: [] },
                  'postcss-next',
                  'cssnano'
                ]
              }
            }
          ]})
        )
      },
      {
        include: /\.json$/,
        use: ["json-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=assets/[name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('app.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
