// @flow

import React from 'react'

type OwnProps = {
  question: string,
  onSubmit: (response: boolean) => void,
  children?: React$Node // For some reason flow wants this here.
}
type State = {
  currentSelection: boolean
}

export class BoolQuestion extends React.Component<OwnProps, State> {

  constructor(props: OwnProps) {
    super(props)
    this.getItemSelectedFunction = this.getItemSelectedFunction.bind(this)
  }

  render = (): React$Element<*> => <div className='student-question'>
    <h2>{this.props.question}</h2>
    {(this.state && this.state.currentSelection == true) ?
      <div className='answer-box selected' onClick={this.getItemSelectedFunction(true)}>You've selected true</div> :
      <div className='answer-box' onClick={this.getItemSelectedFunction(true)}>True</div>
    }
    {(this.state && this.state.currentSelection == false) ?
      <div className='answer-box selected' onClick={this.getItemSelectedFunction(false)}>You've selected false</div> :
      <div className='answer-box' onClick={this.getItemSelectedFunction(false)}>false</div>
    }
    <button onClick={this.onSubmitPressed}>Submit Answer</button>
  </div>

  getItemSelectedFunction = (item: boolean): (() => void) => {
    return () => {
      this.setState({currentSelection: item})
    }
  }

  onSubmitPressed = (): void => {
    if (this.state) {
      this.props.onSubmit(this.state.currentSelection)
    }
  }
}
