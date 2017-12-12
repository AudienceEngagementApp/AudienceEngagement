// @flow

import React from 'react'
import _ from 'underscore'
import classnames from 'classnames'

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
      return (
        <div className={classnames('answer-box', `choice-${answerChoices.indexOf(key) % 4}`, {'answer-selected': this.state && this.state.currentSelection == key})} key={key} onClick={this.getItemSelectedFunction(key)}>
          <div className={classnames('color-wrapper')}>
            <div className={classnames('letter-choice')}>{key}</div>
            <div className={classnames('answer-choice')}>{this.props.answers[key]}</div>
          </div>
        </div>
      )
    })
    return (<div className={classnames('student-question')}>
      <div className={classnames('text-wrapper')}><h2>{this.props.question}</h2></div>
      {answerElements}
      <button onClick={this.onSubmitPressed}>SUBMIT ANSWER</button>
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
