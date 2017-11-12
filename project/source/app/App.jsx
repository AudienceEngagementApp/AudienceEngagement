// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {StudentIndex} from 'app/student/StudentIndex'
import {TeacherIndex} from 'app/teacher/TeacherIndex'
import {BigBanner} from 'app/common/BigBanner'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from 'app/reducers'
import type {Store, Dispatch} from 'redux'
import thunk from 'redux-thunk'

import styles from 'styles/app.scss'

type Props = {
}

const store: Store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export class App extends React.Component<Props>{
  props: Props

  constructor(props: Props) {
    super(props)
  }

  render = (): React$Element<*> => (
    <Provider store={store}>
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
          <StudentIndex />
        } />
      </Switch>
    </Provider>
  )
}
