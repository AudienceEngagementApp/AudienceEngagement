// @flow

import React, {Component} from 'react'

import styles from 'styles/teacher/question/_teacher-answer.scss'

type Props = {
  letter: string,
  answer: string
}

export class AnswerBox extends Component<Props> {
  render() {
    return (
      <div className={`answer-text-box answer-${this.props.letter}`}>
        <div className={`option-label label-${this.props.letter}`}>
          <label>{this.props.letter}</label>
        </div>
        <input type="text" className="answer-form" placeholder="Type answer" defaultValue={this.props.answer}/>
      </div>
    )
  }
}
