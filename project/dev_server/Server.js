// @flow
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.config.js'
import path from 'path'

export const serverPort: number = 9000

export const run = () => {
  const app = express()
  const webpackConfigCompiler = webpack(config)

  app.use(webpackMiddleware(webpackConfigCompiler, {
    noInfo: true,
    hot: true,
    publicPath: config.output.publicPath
  }))

  app.use(webpackHotMiddleware(webpackConfigCompiler, {
    noInfo: true,
    hot: true,
    inline: true,
    path: '/hot',
  }))

  app.listen(serverPort, (err) => {
    if (err) return console.log('Server failed to start.', err)
    else return console.log(`Server started. Listening on port ${serverPort}`)
  })
}
