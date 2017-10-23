// @flow

import React from 'react'
import {Http} from 'app/http/Http'
import {Link, Switch, Route, IndexRoute} from 'react-router-dom'
import {SubComponent} from 'app/SubComponent'
import {StudentHome} from 'app/student/StudentHome'

type Props = {
  http: Http
}

export class App extends React.Component<Props>{
  props: Props

  constructor(props: Props) {
    super(props)
  }

  render = (): React$Element<*> => (
    <div>
      <Route exact path='/' component={() =>
        <div>
          <SubComponent />
          <Link to='/route' > Toggle Route </Link>
        </div>
      } />
      <Route exact path='/student' component={() =>
        <StudentHome />
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
