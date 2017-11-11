// @flow

import React, {Component, PropTypes} from 'react'
//import {reduxForm} from 'redux-form'
//import {createMCQuestion} from 'app/actions/index'
import {AnswerBox} from 'app/teacher/question/AnswerBox'

import styles from 'styles/new_mc_question.scss'

type Props = {
  question: string,
  answerA: string,
  answerB: string,
  answerC: string,
  answerD: string,
  correctAnswer: string,
}

export class NewMcQuestion extends Component<Props> {

  onSubmit(props: Object) {
    /*this.props.createMCQuestion(props).then(() => {
      this.context.router.push('/')
    })*/
  }

  render() {
    const {question, answerA, answerB, answerC, answerD, correctAnswer/*, handleSubmit*/} = this.props
    return (
      <form className="form" onSubmit={this.onSubmit.bind(this)}>
        <div className="top-border">
          <h3>Multiple Choice Question</h3>
          <button className="exit">X</button>
        </div>
        <div>
          <textarea type="text" className="question-textarea" placeholder="Ask your question here..." defaultValue={this.props.question}/>
        </div>
        <div className="answer-choices">
          <div className="row-answers">
            <AnswerBox
              letter="A"
              answer="First Answer"
            />
            <AnswerBox
              letter="B"
              answer="Second Answer"
            />
          </div>

          <div className="row-answers">
            <AnswerBox
              letter="C"
              answer="Third Answer"
            />
            <AnswerBox
              letter="D"
              answer="Fourth Answer"
            />
          </div>
        </div>
        <div className="bottom-border">
          <span className="correct-answer">
            <label>Correct Answer:</label>
            <input className="correct-answer-box" placeholder="Type Letter" defaultValue={this.props.correctAnswer}/>
          </span>

          <button type="submit" className="save-btn"><b>SAVE TO LESSON</b></button>
        </div>
      </form>
    )
   }
}

function validate(values) {
  const errors = {}

  if (!values.question) {
    errors.question = 'Enter a question'
  }

  if (!values.a) {
      errors.a = 'Enter A'
  }
	if (!values.b) {
			errors.b = 'Enter B'
	}
	if (!values.c) {
			errors.c = 'Enter C'
	}
	if (!values.d) {
			errors.d = 'Enter D'
	}

  if (!values.correctAnswer) {
      errors.correctAnswer = 'Enter Correct Answer'
  }

  return errors
}
/*
export default reduxForm({
  form: 'MCNewForm',
  fields: ['question', 'a', 'b', 'c', 'd', 'correctAnswer'],
  validate
}, null, { createMCQuestion })(NewMcQuestion)
*/
