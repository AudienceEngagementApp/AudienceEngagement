// @flow

import {combineReducers} from 'redux'

import LoginInfoReducer from 'app/reducers/LoginInfoReducer'

export default combineReducers({
  loginInfo: LoginInfoReducer,
})
