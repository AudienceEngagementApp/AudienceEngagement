// @flow

import React from 'react'
import {Link, Route, Switch, Redirect} from 'react-router-dom'
import {StudentIndex} from 'app/student/StudentIndex'
import {TeacherIndex} from 'app/teacher/TeacherIndex'
import {BigBanner} from 'app/common/BigBanner'
import {Test} from 'app/Test'
import {type Store} from 'redux'
import {Loading} from 'app/common/Loading'

import styles from 'styles/app.scss'

const display_seperate_home_page = false

export const App = (): React$Element<*> => (
  <Switch>
    <Route exact path='/' component={() => display_seperate_home_page ? (
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
    ) : (
      <Redirect to='/student' />
    )
    } />
    <Route path='/teacher' component={TeacherIndex} />
    <Route path='/student' component={StudentIndex} />
    <Route path='/test' component={() =>
      <Test />
    } />
  </Switch>
)

export default App
