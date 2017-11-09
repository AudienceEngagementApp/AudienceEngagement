import React, {Component} from 'react'

export default class AnswerOption extends Component {
  render() {
    return (
      <div className={`answer-box answer-${this.props.letter}`}>
        <div className={`option-label ${this.props.letter}`}>
          <label>{this.props.letter}</label>
        </div>
        <label className="answer-form">{this.props.answer}</label>
      </div>
    )
  }
}
