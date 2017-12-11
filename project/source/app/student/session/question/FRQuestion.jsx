// @flow

import React from 'react'
import {TextInput} from 'app/common/TextInput'

type OwnProps = {
  question: string,
  onSubmit: (response: string) => void,
  children?: React$Node // For some reason flow wants this here.
}

type State = {
  currentText: string
}

export class FRQuestion extends React.Component<OwnProps, State> {

  constructor(props: OwnProps) {
    super(props)
    this.textChanged = this.textChanged.bind(this)
  }

  render = (): React$Element<*> => <div>
    <h3>{this.props.question}</h3>
    <TextInput textChanged={this.textChanged} onEnter={this.onSubmitPressed} />
    <button onClick={this.onSubmitPressed}>Submit Answer</button>
  </div>

  textChanged = (newText: string) => {
    this.setState({currentText: newText})
  }

  onSubmitPressed = (): void => {
    if (this.state && this.state.currentText) {
      this.props.onSubmit(this.state.currentText)
    }
  }
}
