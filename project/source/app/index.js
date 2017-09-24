// @flow
import {App} from 'app/App'
import {AppContainer} from 'app/AppContainer'
import {createStore} from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('app/AppContainer.jsx', () => {
    const NextAppContainer = require('app/AppContainer.jsx')
    ReactDOM.render(
      <AppContainer />,
      document.getElementById('root')
    )

  })
}
