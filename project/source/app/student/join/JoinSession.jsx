// @flow

import React from 'react'
import {TextInput} from 'app/common/TextInput'
import uuidv4 from 'uuid/v4'
import {Link, Route, Switch, type History} from 'react-router-dom'
import {compose} from 'redux'

type State = {
  name: string,
  sessionPin: string,
  page: number
}

type OwnProps = {
  pins: Object,
  setLoginInfo: (name: string, sessionId: string) => void,
  sessionId?: string,
  onSubmit?: (sessionId: string, name: string) => void
}
type StateProps = {
  history: *,
}
type DispatchProps = {
}

type Props = OwnProps & StateProps & DispatchProps

export class JoinSession extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {name: '', sessionPin: '', page: this.props.sessionId ? 2 : 1};
  }

  render = (): React$Element<*> => (<div>
    <h1>InvolveMe</h1>
    {(this.state.page == 1) ? (<div>
      <TextInput
        type="text"
        placeholder='Session Pin'
        value={this.state.sessionPin}
        textChanged={this.sessionChanged}
        onEnter={this.onNextPressed}
      />
      <button onClick={this.onNextPressed}>join</button>
    </div>) : (<div>
      <TextInput
        type="text"
        placeholder='Enter Name'
        value={this.state.name}
        textChanged={this.nameChanged}
        onEnter={this.onSubmitPressed}
      />
      <button onClick={this.onSubmitPressed}>submit</button>
    </div>)}
  </div>)

  onSubmitPressed = () => {
    const session: Object = (this.props.sessionId) ? {session: this.props.sessionId} : this.props.pins[this.state.sessionPin]
    if (session && session.session && this.state.name) {
      const sessionId: string = session.session
      console.log(this.props)
      this.props.setLoginInfo(this.state.name, sessionId)
      if (this.props.onSubmit) {
        this.props.onSubmit(sessionId, this.state.name)
      }
    }
  }

  onNextPressed = () => {
    const session: Object = this.props.pins[this.state.sessionPin]
    if (session && session.session) {
      this.setState({page: this.state.page + 1})
    }
  }

  nameChanged = (newName: string) => {
    this.setState({name: newName})
  }

  sessionChanged = (newSession: string) => {
    this.setState({sessionPin: newSession})
  }
}
