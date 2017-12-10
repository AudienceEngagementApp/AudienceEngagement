// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import {compose} from 'redux'

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
        return <Error message='Multiple choice question component not created' />
        /*return <MCQuestion
          question={question.question}
          answers={question.answers}
        />*/
      } else if (question.type == 1) {
        return <Error message='Boolean choice question component not created' />
        /*return <BoolQuestion
          question={question.question}
        />*/
      } else if (question.type == 2) {
        return <Error message='Free response choice question component not created' />
        /*return <FRQuestion
          question={question.question}
        />*/
      } else {
        return <Error message='An Error Occured' />
      }
    } else {
      return <Error message='An Error Occured' />
    }
  }

}
