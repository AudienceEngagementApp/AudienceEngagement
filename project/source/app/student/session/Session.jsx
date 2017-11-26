// @flow

import React from 'react'
import {Link, Route, Switch, withRouter} from 'react-router-dom'
import {Question} from 'app/student/session/question/Question'
import {Waiting} from 'app/student/session/waiting/Waiting'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'

type OwnProps = {
  name: string,
  session?: Object,
}
type StateProps = {
}
type DispatchProps = {
}
type Props = OwnProps & StateProps & DispatchProps

const SessionStates = {
  activeQuestion: 'activeQuestion',
  waitingForPlayers: 'waitingForPlayers',
  responseRecieved: 'responseRecieved',
}

type SessionState = $Keys<typeof SessionStates>

const dBStateToSessionState = (dbState: number): SessionState => {
  switch(dbState) {
    case 0:
      return SessionStates.activeQuestion
    case 1:
      return SessionStates.responseRecieved
    case 2:
      return SessionStates.waitingForPlayers
    default:
      return SessionStates.waitingForPlayers
  }
}

export class Session extends React.Component<Props>{

  render = (): React$Element<*> => {
    //console.log(this.props.session)
    const state = (this.props.session && this.props.session.state) ? this.props.session.state : -1
    switch(dBStateToSessionState(state)) {
      case SessionStates.activeQuestion:
        return <Question />
      case SessionStates.waitingForPlayers:
        return <Waiting
          title={`Welcome ${this.props.name}`}
          text={'We\'re waiting for your classmates to join'}
        />
      case SessionStates.responseRecieved:
        return <Waiting
          title={`Response Recieved`}
          text={'We\'re waiting for your classmates to respond'}
        />
      default:
        return <div>An Error Occured</div>
    }
  }
}
