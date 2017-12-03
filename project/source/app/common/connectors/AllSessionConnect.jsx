// @flow

import React from 'react'
import {connect} from 'react-redux'
import {compose, type Dispatch} from 'redux'
import {firebaseConnect, isLoaded, isEmpty, toJS, actionTypes} from 'react-redux-firebase'
import {type StoreState} from 'app/state/index'
import _ from 'underscore'
import uuidv4 from 'uuid/v4'

type OwnProps = {
  children: React$Node,
  firebase: Object
}
type StateProps = {
  sessions?: Array<string>
}
type DispatchProps = {
  addSession: (lessonId: string) => void,
}
type Props = OwnProps & StateProps & DispatchProps

export const allSessionConnect = <A>(Component: React.Component<A & StateProps & DispatchProps>): React.Component<A & OwnProps> => {
  const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps & OwnProps => {
    if (storeState.firebase.data.sessions) {
      console.log('Sessions found')
      const rawData: Object = storeState.firebase.data.sessions
      return Object.assign({}, {sessions: _.keys(rawData)}, ownProps)
    } else {
      console.log('Session(s) not loaded')
      return Object.assign({}, ownProps)
    }
  }
  const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    addSession: (lessonId: string): void => {
      const sessionId = uuidv4()
      const makeId = (): string => {
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
        const map = Array.prototype.map
        return map.call('***-***', (char: string): string => {
          if (char.charAt(0) == '*') {
            return possible.charAt(Math.floor(Math.random() * possible.length))
          } else {
            return char.charAt(0)
          }
        }).join('')
      }
      const pin = makeId()
      ownProps.firebase.push(`sessions/${sessionId}`, {lesson: lessonId, state: 2})
      ownProps.firebase.push(`pins/${pin}`, {session: sessionId})
    }
  })
  const composedComponent = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect((ownProps: OwnProps): Array<string> => {
      console.log('Connecting to /sessions')
      return ['/sessions']
    }),
  )(Component)
  return composedComponent
}
