// @flow

import React from 'react'
import classnames from 'classnames'

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

  render = (): React$Element<*> => <div className={classnames('student-question')}>
    <div className={classnames('text-wrapper')}><h2>{this.props.question}</h2></div>
    <div className={classnames('answer-box', 'choice-0', {'answer-selected': this.state && this.state.currentSelection == true})} onClick={this.getItemSelectedFunction(true)}>
      <div className={classnames('color-wrapper')}>
        <div className={classnames('letter-choice')}>T</div>
        <div className={classnames('answer-choice')}>True</div>
      </div>
    </div>
    <div className={classnames('answer-box', 'choice-1', {'answer-selected': this.state && this.state.currentSelection == false})} onClick={this.getItemSelectedFunction(false)}>
      <div className={classnames('color-wrapper')}>
        <div className={classnames('letter-choice')}>F</div>
        <div className={classnames('answer-choice')}>False</div>
      </div>
    </div>
    <button onClick={this.onSubmitPressed}>SUBMIT ANSWER</button>
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
