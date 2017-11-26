// @flow

import React from 'react'
import {TextInput} from 'app/common/TextInput'
import uuidv4 from 'node-uuid'
import {Link, Route, Switch, withRouter, type History} from 'react-router-dom'
import {compose} from 'redux'

type State = {
  name: string,
  session: string,
  page: number
}

type OwnProps = {
  pins: Object,
  setLoginInfo: (name: string, sessionId: string) => void,
}
type StateProps = {
  history: *,
}
type DispatchProps = {
}

type Props = OwnProps & StateProps & DispatchProps

class JoinSession extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {name: '', session: '', page: 1, debouncedClick: true};
  }

  render = (): React$Element<*> => {

  return (<div>
      <h1>InvolveMe</h1>
      {(this.state.page == 1) ? (<div>
        <TextInput
          type="text"
          placeholder='Session Pin'
          value={this.state.session}
          textChanged={this.sessionChanged}
        />
        <button onClick={this.onNextPressed}>join</button>
      </div>) : (<div>
        <TextInput
          type="text"
          placeholder='Enter Name'
          value={this.state.name}
          textChanged={this.nameChanged}
        />
        <button onClick={this.onSubmitPressed}>submit</button>
      </div>)}
    </div>)
  }

  onSubmitPressed = () => {
    const session: Object = this.props.pins[this.state.session]
    if (session && session.session && this.state.name) {
      const sessionId: string = session.session
      this.props.setLoginInfo(this.state.name, sessionId)
      this.props.history.push(`/student/session/${sessionId}`)
    }
  }

  onNextPressed = () => {
    const session: Object = this.props.pins[this.state.session]
    if (session && session.session) {
      this.setState({page: this.state.page + 1})
    }
  }

  nameChanged = (newName: string) => {
    this.setState({name: newName})
  }

  sessionChanged = (newSession: string) => {
    this.setState({session: newSession})
  }
}

const composedComponent = compose(
  withRouter
)(JoinSession)

export { composedComponent as JoinSession }
