// @flow

import React, {Component} from 'react'

import styles from 'styles/teacher/question/_teacher-answer.scss'

type Props = {
  letter: string,
  answer: string
}

export class AnswerOption extends Component<Props> {
  render() {
    return (
      <div className={`answer-box answer-${this.props.letter}`}>
        <div className={`option-label label-${this.props.letter}`}>
          <label>{this.props.letter}</label>
        </div>
        <label className="answer-form">{this.props.answer}</label>
      </div>
    )
  }
}
