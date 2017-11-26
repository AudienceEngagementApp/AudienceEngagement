// @flow

import {createStore, applyMiddleware, compose, type Store, type Dispatch, type Reducer} from 'redux'
import rootReducer from 'app/reducers'
import firebase from 'firebase'
import {reactReduxFirebase} from 'react-redux-firebase'

export const configureStore = (initialState: Object = {}) => {
  const firebaseConfig = {
    apiKey: "AIzaSyAvwf5OFx69GJ7e0ecUr0nhX0e6_jS44Zw",
    authDomain: "engagedaudience.firebaseapp.com",
    databaseURL: "https://engagedaudience.firebaseio.com",
    projectId: "engagedaudience",
    storageBucket: "engagedaudience.appspot.com",
    messagingSenderId: "154470817038"
  }
  const reduxFirebaseConfig = { userProfile: 'users' }
  firebase.initializeApp(firebaseConfig)

  const store: Store = createStore(
   rootReducer,
   initialState,
   compose(
     reactReduxFirebase(firebase, reduxFirebaseConfig)
   )
  )
  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextRootReducer = require('app/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
