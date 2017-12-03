// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {BoolQuestion} from 'app/student/session/question/BoolQuestion'
import {MCQuestion} from 'app/student/session/question/MCQuestion'
import {FRQuestion} from 'app/student/session/question/FRQuestion'
import {lessonConnect} from 'app/common/connectors/LessonConnect'
import {compose} from 'redux'

type Props = {
  lesson?: {
    questions: Object
  },
  questionId: string,
  answerQuestion: (questionId: string, answer: (string | number)) => void
}

class Question extends React.Component<*>{

  render = (): React$Element<*> => {
    if (this.props.lesson && this.props.lesson.questions[this.props.questionId] && this.props.lesson.questions[this.props.questionId].type && this.props.lesson.questions[this.props.questionId].question) {
      const question = this.props.lesson.questions[this.props.questionId]
      if (question.type == 0 && question.question && question.answers && Object.keys(question.answers).length > 0) {
        return <MCQuestion
          question={question.question}
          answers={question.answers}
          onSubmit={this.answerQuestion}
        />
      } else if (question.type == 1) {
        return <BoolQuestion
          question={question.question}
          onSubmit={this.answerQuestion}
        />
      } else if (question.type == 2) {
        return <FRQuestion
          question={question.question}
          onSubmit={this.answerQuestion}
        />
      } else {
        return <div>An Error Occured</div>
      }
    } else {
      return <div>An Error Occured</div>
    }
  }

  answerQuestion = (response: (string | boolean)): void => {
    if (typeof response === 'string') {
      this.props.answerQuestion(this.props.questionId, response)
    } else if (typeof response === 'boolean') {
      const responseData = response ? 1 : 0
      this.props.answerQuestion(this.props.questionId, responseData)
    }
  }
}

const composedComponent = compose(
  lessonConnect
)(Question)

export { composedComponent as Question }
