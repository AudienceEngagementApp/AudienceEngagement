// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {Question} from 'app/student/session/question/Question'
import {Waiting} from 'app/student/session/waiting/Waiting'

type Props = {
  name: string
}

const SessionStates = {
  activeQuestion: 'activeQuestion',
  recentlyJoined: 'recentlyJoined',
  responseRecieved: 'responseRecieved',
}
type SessionState = $Keys<typeof SessionStates>

type State = {
  sessionState: SessionState
}

export class Session extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props)
    this.state = {sessionState: SessionStates.recentlyJoined}
  }

  render = (): React$Element<*> => {
    const activeQuestion: boolean = false
    const responseRecieved: boolean = false
    switch(this.state.sessionState) {
      case SessionStates.activeQuestion:
        return <Question />
      case SessionStates.recentlyJoined:
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
