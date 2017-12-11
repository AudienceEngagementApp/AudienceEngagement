// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import {compose} from 'redux'
import {Question} from 'app/teacher/question/Question'

type Props = {
  lesson?: {
    questions: Object
  },
  session: {
    question: string,
  },
  isActive: boolean
}

export class LiveQuestion extends React.Component<*>{

  render = (): React$Element<*> => {
    if (this.props.lesson &&
      this.props.lesson.questions[this.props.session.question] &&
      this.props.lesson.questions[this.props.session.question].type &&
      this.props.lesson.questions[this.props.session.question].question
    ) {
      const question = this.props.lesson.questions[this.props.session.question]
      if (question.type == 0) {
        return <Question
          question={question.question}
          answerChoices={question.answers}
          correctAnswer={question.correct}
          questionEditable={false}
          answersEditable={false}
        />
      } else if (question.type == 1) {
        return <Question
          question={question.question}
          answerChoices={{T: 'True', F: 'False'}}
          correctAnswer={question.correct == 1 ? 'True' : 'False'}
          questionEditable={false}
          answersEditable={false}
        />
      } else if (question.type == 2) {
        return <Question
          question={question.question}
          questionEditable={false}
          answersEditable={false}
        />
      } else {
        return <Error message='Incorrect question type' />
      }
    } else {
      return <Error message='An Error Occured' />
    }
  }

}
