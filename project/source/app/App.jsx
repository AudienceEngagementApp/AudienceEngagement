// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {StudentIndex} from 'app/student/StudentIndex'
import {TeacherIndex} from 'app/teacher/TeacherIndex'
import {BigBanner} from 'app/common/BigBanner'
import {Provider} from 'react-redux'
import {Test} from 'app/Test'
import {type Store} from 'redux'

import styles from 'styles/app.scss'

type Props = {
  store: Store
}

export class App extends React.Component<Props>{
  render = (): React$Element<*> => (
    <Provider store={this.props.store}>
      <Switch>
        <Route exact path='/' component={() =>
          <div className='app-index'>
            <div className='container'>
              <BigBanner>
                InvolveMe
              </BigBanner>
              <div className='content'>
                <Link to='/teacher'>
                  <button className="root-button btn">I'm a teacher</button>
                </Link>
                <Link to='/student'>
                  <button className="root-button btn">I'm a student</button>
                </Link>
              </div>
            </div>
          </div>
        } />
        <Route path='/teacher' component={() =>
          <TeacherIndex />
        } />
        <Route path='/student' component={() =>
          <StudentIndex/>
        } />
        <Route path='/test' component={() =>
          <Test />
        } />
      </Switch>
    </Provider>
  )
}
