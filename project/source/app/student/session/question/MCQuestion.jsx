// @flow

import React from 'react'
import _ from 'underscore'

type OwnProps = {
  question: string,
  answers: Object, // example: {a: 'answer a', b: 'answer b'}
  onSubmit: (response: string) => void,
  children?: React$Node // For some reason flow wants this here.
}

type State = {
  currentSelection: string
}

export class MCQuestion extends React.Component<*, *>{

  constructor(props: OwnProps) {
    super(props)
    this.getItemSelectedFunction = this.getItemSelectedFunction.bind(this)
  }

  render = (): React$Element<*> => {
    const answerChoices: Array<string> = _.keys(this.props.answers)
    const answerElements: Array<React$Element<*>> = answerChoices.map((key: string) => {
      if (this.state && this.state.currentSelection == key) {
        return <div onClick={this.getItemSelectedFunction(key)} key={key}>You've selected {key}</div>
      } else {
        return <div onClick={this.getItemSelectedFunction(key)} key={key}>{key + ': ' + this.props.answers[key]}</div>
      }
    })
    return (<div>
      <h3>{this.props.question}</h3>
      {answerElements}
      <button onClick={this.onSubmitPressed}>Submit Answer</button>
    </div>)
  }

  getItemSelectedFunction = (item: string): (() => void) => {
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
