// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import {compose} from 'redux'
import {Question} from 'app/teacher/question/Question'

type Props = {
  lesson?: {
    questions: Object
  },
  questionId: string,
  isActive: boolean
}

export class LiveQuestion extends React.Component<*>{

  render = (): React$Element<*> => {
    if (this.props.lesson && this.props.lesson.questions[this.props.questionId] && this.props.lesson.questions[this.props.questionId].type && this.props.lesson.questions[this.props.questionId].question) {
      const question = this.props.lesson.questions[this.props.questionId]
      if (question.type == 0 && question.question && question.answers && Object.keys(question.answers).length > 0) {
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
        return <Error message='An Error Occured' />
      }
    } else {
      return <Error message='An Error Occured' />
    }
  }

}
