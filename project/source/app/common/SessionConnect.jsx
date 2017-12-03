// @flow

import React from 'react'
import {connect} from 'react-redux'
import {compose, type Dispatch} from 'redux'
import {firebaseConnect, isLoaded, isEmpty, toJS, actionTypes} from 'react-redux-firebase'
import {type StoreState} from 'app/state/index'
import _ from 'underscore'
import {uuidv4} from 'node-uuid'
import {Loading} from 'app/common/Loading'

type OwnProps = {
  sessionId: string,
  name: string,
  firebase: Object,
}
type StateProps = {
  session?: Object,
}
type DispatchProps = {
  setState: (state: number) => void,
  answerQuestion: (questionId: string, answer: (string | number)) => void
}
type Props = OwnProps & StateProps & DispatchProps

export const sessionConnect = <A>(Component: React.Component<A & StateProps & DispatchProps>): React.Component<A & OwnProps> => {
  const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps & OwnProps => {
    if (storeState.firebase.data.sessions) {
      console.log('Session found')
      const rawData: Object = storeState.firebase.data.sessions[ownProps.sessionId]
      return Object.assign({}, {session: rawData}, ownProps)
    } else {
      console.log('Session(s) not loaded')
      return Object.assign({}, ownProps)
    }
  }
  const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    setState: (state: number): void => {
      if (state >= 0) {
        ownProps.firebase.set(`sessions/${ownProps.sessionId}/state`, state)
      }
    },
    answerQuestion: (questionId: string, answer: (string | number)): void => {
      console.log(`attempting to answer at path sessions/${ownProps.sessionId}/answers/${questionId}/${ownProps.name} with ${answer.toString()}`)
      ownProps.firebase.set(`sessions/${ownProps.sessionId}/answers/${questionId}/${ownProps.name}`, answer)
    }
  })
  const composedComponent = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect((ownProps: OwnProps): Array<string> => {
      console.log(`Connecting to /sessions/${String(ownProps.sessionId)}`)
      return [`/sessions/${String(ownProps.sessionId)}`]
    }),
  )(Component)
  return composedComponent
}
