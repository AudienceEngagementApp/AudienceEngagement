// @flow

// TODO: Make this a HOC

import React from 'react'
import {Link, Route, Switch, withRouter} from 'react-router-dom'
import {Question} from 'app/student/session/question/Question'
import {Waiting} from 'app/student/session/waiting/Waiting'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import {Loading} from 'app/common/Loading'
import {sessionConnect} from 'app/common/connectors/SessionConnect'
import {Error} from 'app/common/Error'

type Props = {
  name: string,
  session?: {
    lesson: string,
    state: number,
    question?: string,
    answers?: Object
  },
  answerQuestion: (questionId: string, answer: string) => void
}

const SessionStates = {
  activeQuestion: 'activeQuestion',
  waitingForPlayers: 'waitingForPlayers',
  responsesRecieved: 'responsesRecieved',
  incorrectState: 'incorrectState',
}

type SessionState = $Keys<typeof SessionStates>

const dBStateToSessionState = (dbState: number): SessionState => {
  switch(dbState) {
    case 0:
      return SessionStates.activeQuestion
    case 1:
      return SessionStates.responsesRecieved
    case 2:
      return SessionStates.waitingForPlayers
    default:
      return SessionStates.incorrectState
  }
}

class Session extends React.Component<Props>{

  render = (): React$Element<*> => {
    if (this.props.session) {
      const state: SessionState = dBStateToSessionState(this.props.session.state)
      switch(state) {
        case SessionStates.activeQuestion:
          if (this.props.session &&
            this.props.session.answers &&
            this.props.session.answers[this.props.session.question] &&
            this.props.session.answers[this.props.session.question][this.props.name]) {
            return <Waiting
              title={`Response Recieved`}
              text={'We\'re waiting for your classmates to respond'}
            />
          } else if (this.props.session && this.props.session.lesson && this.props.session.question) {
            return <Question questionId={this.props.session.question} lessonId={this.props.session.lesson} answerQuestion={this.props.answerQuestion}/>
          } else {
            return <Waiting
              title={`Welcome ${this.props.name}`}
              text={'We\'re waiting for the teacher to start a question'}
            />
          }
        case SessionStates.waitingForPlayers:
          return <Waiting
            title={`Welcome ${this.props.name}`}
            text={'We\'re waiting for your classmates to join'}
          />
        case SessionStates.responsesRecieved:
          return <Waiting
            title={`Response Recieved`}
            text={'We\'re waiting for your teacher to tally the results'}
          />
        case SessionStates.incorrectState:
          return <Error message='Incorrect state found in session' />
        default:
          return <Error message='Incorrect state found in session' />
      }
    } else {
      return <Loading />
    }
  }
}


const composedComponent = compose(
  sessionConnect
)(Session)

export { composedComponent as Session }
