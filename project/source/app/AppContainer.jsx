// @flow

import {App} from 'app/App'
import React from 'react'
import {HashRouter as Router, hashHistory} from 'react-router-dom'
import {type Store} from 'redux'

import styles from 'styles/base.scss'

type Props = {
  store: Store
}

export const AppContainer = (props: Props): React$Element<*> => {
  return (
    <div>
      <Router history={hashHistory}>
        <App store={props.store} />
      </Router>
    </div>
  )}

export default AppContainer
