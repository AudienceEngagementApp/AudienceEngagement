// @flow
import {App} from 'app/App'
import {AppContainer} from 'app/AppContainer'
import {createStore} from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import {configureStore} from 'app/state/ConfigureStore'

const store = configureStore()

ReactDOM.render(
  <AppContainer store={store} />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('app/AppContainer.jsx', () => {
    const NextAppContainer = require('app/AppContainer.jsx').default
    ReactDOM.render(
      <NextAppContainer store={store} />,
      document.getElementById('root')
    )
  })
}
