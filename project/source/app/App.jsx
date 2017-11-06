// @flow

import React from 'react'
import {Http} from 'app/http/Http'
import {Link, Switch, Route, IndexRoute} from 'react-router-dom'
import {StudentHome} from 'app/student/StudentHome'
import {Lesson} from 'app/teacher/lesson/Lesson'
import {Connect} from 'app/student/Connect'

type Props = {
  http: Http
}

export class App extends React.Component<Props>{
  props: Props

  constructor(props: Props) {
    super(props)
  }

  // I put teacher/lesson in there without a teacher index for demo.
  render = (): React$Element<*> => (
    <div>
      <Route exact path='/' component={() =>
        <div>
          <Link to='/route' > Toggle Route </Link>
        </div>
      } />
      <Route exact path='/student' component={() =>
        <StudentHome />
      } />
      <Route exact path='/teacher/lesson' component={() =>
        <Lesson />
      <Route exact path='/connect' component={() =>
        <Connect />
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
