// @flow

import {App} from 'app/App'
import React from 'react'
import {HashRouter as Router, hashHistory} from 'react-router-dom'

import styles from 'styles/base.scss'

export class AppContainer extends React.Component<*>{
  render = (): React$Element<*> => (
    <div>
      <Router history={hashHistory}>
        <App/>
      </Router>
    </div>
  )
}
