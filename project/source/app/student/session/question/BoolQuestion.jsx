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

  render = (): React$Element<*> => <div>
    <h3>{this.props.question}</h3>
    {(this.state && this.state.currentSelection == true) ?
      <div onClick={this.getItemSelectedFunction(true)}>You've selected true</div> :
      <div onClick={this.getItemSelectedFunction(true)}>True</div>
    }
    {(this.state && this.state.currentSelection == false) ?
      <div onClick={this.getItemSelectedFunction(false)}>You've selected false</div> :
      <div onClick={this.getItemSelectedFunction(false)}>false</div>
    }
    <button onClick={this.onSubmitPressed}>Submit Answer</button>
  </div>

  getItemSelectedFunction = (item: boolean): (() => void) => {
    return () => {
      this.setState({currentSelection: item})
    }
  }

  onSubmitPressed = (): void => {
    if (this.state && this.state.currentSelection) {
      this.props.onSubmit(this.state.currentSelection)
    }
  }
}
