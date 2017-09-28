// @flow

import {App} from 'app/App'
import React from 'react'
import {HashRouter as Router, hashHistory} from 'react-router-dom'
import {Http} from 'app/http/Http'

import styles from 'styles/base.scss'

//const store = createStore()
const http = new Http()

export class AppContainer extends React$Component<*>{
  render = (): React$Element<*> => (
    <div>
      <Router history={hashHistory}>
        <App http={http} />
      </Router>
    </div>
  )
}
