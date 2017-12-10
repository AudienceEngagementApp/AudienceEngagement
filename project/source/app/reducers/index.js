// @flow

import {combineReducers} from 'redux'
import {firebaseStateReducer} from 'react-redux-firebase'
import LoginInfoReducer from 'app/reducers/LoginInfoReducer'
import LiveConnectReducer from 'app/reducers/LiveConnectReducer'

export default combineReducers({
  loginInfo: LoginInfoReducer,
  liveConnect: LiveConnectReducer,
  firebase: firebaseStateReducer
})
