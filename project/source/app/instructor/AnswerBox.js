import React, {Component} from 'react'

export default class AnswerBox extends Component {
  render() {
    return (
      <div className={`answer-text-box answer-${this.props.letter}`}>
        <div className={`option-label ${this.props.letter}`}>
          <label>{this.props.letter}</label>
        </div>
        <input type="text" className="answer-form" placeholder="Type answer" {...this.props.answer}/>
      </div>
    )
  }
}
