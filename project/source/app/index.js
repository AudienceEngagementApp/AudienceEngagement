// @flow

import {App} from 'app/App'
import {AppContainer} from 'app/AppContainer'
import React from 'react'
import ReactDOM from 'react-dom'
import {configureStore} from 'app/state/ConfigureStore'

const store = configureStore()

ReactDOM.render(
  <AppContainer app={App} store={store} />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('app/App.jsx', () => {
    const NextApp = require('app/App.jsx').default
    ReactDOM.render(
      <AppContainer app={NextApp} store={store}/>,
      document.getElementById('root')
    )
  })
}
