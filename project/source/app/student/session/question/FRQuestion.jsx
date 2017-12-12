// @flow

import React from 'react'
import {TextInput} from 'app/common/TextInput'
import classnames from 'classnames'

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

  render = (): React$Element<*> => <div className={classnames('student-question')}>
    <div className={classnames('text-wrapper')}><h2>{this.props.question}</h2></div>
    <div className='input'><TextInput textChanged={this.textChanged} onEnter={this.onSubmitPressed} /></div>
    <button onClick={this.onSubmitPressed}>SUBMIT ANSWER</button>
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
