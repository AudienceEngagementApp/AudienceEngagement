// @flow

import React from 'react'
import {TextInput} from 'app/common/TextInput'
import uuidv4 from 'node-uuid'
import {Link, Route, Switch, withRouter, type History} from 'react-router-dom'

type State = {
  name: string,
  session: string,
  page: number,
  debouncedClick: boolean
}

type OwnProps = {
  history: *,
}
type StateProps = {
  name: string,
}
type DispatchProps = {
  setName: (name: string) => void,
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

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return this.state.debouncedClick
  }
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (!this.state.debouncedClick) this.setState({debouncedClick: true})
  }

  onSubmitPressed = () => {
    if (this.state.debouncedClick) {
      this.props.setName(this.state.name)
      const sessionId: string = uuidv4()
      this.props.history.push(`/student/session/${sessionId}`)
    } else {
      this.setState({debouncedClick: true})
    }
  }

  onNextPressed = () => {
    this.setState({page: this.state.page + 1, debouncedClick: false})
  }

  nameChanged = (newName: string) => {
    this.setState({name: newName})
  }

  sessionChanged = (newSession: string) => {
    this.setState({session: newSession})
  }
}

const componentWithRouter = withRouter(JoinSession)
export { componentWithRouter as JoinSession }
