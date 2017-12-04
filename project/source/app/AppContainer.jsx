// @flow

import React from 'react'
import {HashRouter as Router, hashHistory} from 'react-router-dom'
import {type Store} from 'redux'
import {Provider} from 'react-redux'

import styles from 'styles/base.scss'

export const AppContainer = (props: {app: *, store: *}): React$Element<*> => (
  <Router history={hashHistory}>
    <Provider store={props.store}>
      {props.app()}
    </Provider>
  </Router>
)

export default AppContainer
