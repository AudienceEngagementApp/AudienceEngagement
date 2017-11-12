// @flow

import React from 'react'
import {Link, Route, Switch, withRouter} from 'react-router-dom'
import {Question} from 'app/student/session/question/Question'
import {Waiting} from 'app/student/session/waiting/Waiting'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded, isEmpty, toJS, dataToJS} from 'react-redux-firebase'

type OwnProps = {
  name: string,
  match: {
    params: {
      sessionId: number
    }
  }
}
type StateProps = {
  sessions: Object
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

class Session extends React.Component<Props>{

  render = (): React$Element<*> => {
    console.log(this.props)
    const state = this.props && this.props.sessions && this.props.match && this.props.match.params ? dBStateToSessionState(this.props.sessions[this.props.match.params['sessionId']].state) : -1
    switch(state) {
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

const componentWithCompose = compose(
  withRouter,
  firebaseConnect((props: OwnProps) => {
    console.log(`connecting to sessions/${props.match.params['sessionId']}`)
    return [`sessions/${props.match.params['sessionId']}`,]
  }),
  connect(({firebase}) => {
    return {
      sessions: dataToJS(firebase, 'sessions')
    }
  })
)(Session)

export { componentWithCompose as Session }
