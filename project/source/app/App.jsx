// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {StudentIndex} from 'app/student/StudentIndex'
import {TeacherIndex} from 'app/teacher/TeacherIndex'
import {BigBanner} from 'app/common/BigBanner'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose, type Store, type Dispatch, type Reducer} from 'redux'
import rootReducer from 'app/reducers'
import {reactReduxFirebase} from 'react-redux-firebase'
import {Test} from 'app/Test'

import styles from 'styles/app.scss'

const firebaseConfig = {
  apiKey: "AIzaSyAvwf5OFx69GJ7e0ecUr0nhX0e6_jS44Zw",
  authDomain: "engagedaudience.firebaseapp.com",
  databaseURL: "https://engagedaudience.firebaseio.com",
  projectId: "engagedaudience",
  storageBucket: "engagedaudience.appspot.com",
  messagingSenderId: "154470817038"
}

const reduxFirebaseConfig = { userProfile: 'users' }

const createStoreWithFirebase: (Reducer, Object) => Store = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig),
)(createStore)

const store: Store = createStoreWithFirebase(rootReducer, {})

export class App extends React.Component<*>{
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
          <StudentIndex/>
        } />
        <Route path='/test' component={() =>
          <Test />
        } />
      </Switch>
    </Provider>
  )
}
