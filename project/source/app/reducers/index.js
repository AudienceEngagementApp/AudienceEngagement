// @flow

import {combineReducers} from 'redux'
import {firebaseStateReducer} from 'react-redux-firebase'
import LoginInfoReducer from 'app/reducers/LoginInfoReducer'

export default combineReducers({
  loginInfo: LoginInfoReducer,
  firebase: firebaseStateReducer
})
