import React, {Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { createMCQuestion } from '../actions/index'
import AnswerBox from './AnswerBox.js'

class NewMcQuestion extends Component {
	static contextTypes = {
       router: PropTypes.object
    }

   onSubmit(props) {
     this.props.createMCQuestion(props)
       .then(() => {
         this.context.router.push('/')
       })
   }


render() {
     const { fields: { question, a, b, c, d, correctAnswer }, handleSubmit} = this.props

     return (
       <form className="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				 <div className="top-border">
	         <h3>Multiple Choice Question</h3>
					 <button className="exit">X</button>
				 </div>
				 <div>
					 <textarea type="text" className="question-textarea" placeholder="Ask your question here..." {...question} />
				 </div>
				 <div className="answer-choices">
	         <div className="row-answers">
	          <AnswerBox letter="A" />
						<AnswerBox letter="B" />
	         </div>

	         <div className="row-answers">
	          <AnswerBox letter="C" />
	          <AnswerBox letter="D" />
	         </div>
				 </div>
	        <div className="bottom-border">
	         <span className="correct-answer">
	           <label>Correct Answer:</label>
	           <input className="correct-answer-box" placeholder="Type Letter" {...correctAnswer} />
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

export default reduxForm({
  form: 'MCNewForm',
  fields: ['question', 'a', 'b', 'c', 'd', 'correctAnswer'],
  validate
}, null, { createMCQuestion })(NewMcQuestion)
