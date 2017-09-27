// @flow

import React from 'react'
import {Http} from 'app/http/Http'
import {Link, Switch, Route, IndexRoute} from 'react-router-dom'
import {SubComponent} from 'app/SubComponent'

type Props = {
  http: Http
}

export class App extends React$Component<Props>{
  props: Props

  constructor(props: Props) {
    super(props)
  }

  render = (): React$Element<*> => (
    <div>
      <SubComponent />
      <Route exact path='/' component={() =>
        <Link to='/route' > Toggle Route </Link>
      } />
      <Route path='/route' component={() => (
        <div>
          <Link to='/'> Toggle Route </Link>
          <p>You found a route</p>
        </div>
      )} />
    </div>
  )
}
