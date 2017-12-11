// @flow

import React, {Component, PropTypes} from 'react'
import {AnswerBox} from 'app/teacher/question/AnswerBox'
import {compose, type Dispatch} from 'redux'
import {lessonConnect} from 'app/common/connectors/LessonConnect'
import {Question} from 'app/teacher/question/Question'
import {Error} from 'app/common/Error'

import styles from 'styles/teacher/question/_new-mc-question.scss'

type Props = {
  lesson: Object,
  lessonId: string,
  questionId: string,
}

class EditQuestion extends React.Component<Props> {

  render = (): React$Element<*> => {
    if (this.props.lesson && this.props.lesson.questions && this.props.questionId && this.props.lesson.questions[this.props.questionId]) {
      const question: Object = this.props.lesson.questions[this.props.questionId]
      if (question.type == 0) {
        return <Question
          question={question.question}
          answerChoices={question.answers}
          correctAnswer={question.correct}
          questionEditable={true}
          answersEditable={true}
        />
      } else if (question.type == 1) {
        return <Question
          question={question.question}
          answerChoices={{T: 'True', F: 'False'}}
          correctAnswer={question.correct == 1 ? 'True' : 'False'}
          questionEditable={true}
          answersEditable={false}
        />
      } else if (question.type == 2) {
        return <Question
          question={question.question}
          questionEditable={true}
          answersEditable={false}
        />
      } else {
        return <Error message='Incorrect question type' />
      }
    }
    return <Error message='Failed to load message' />
  }
}

const composedComponent = compose(
  lessonConnect,
)(EditQuestion)

export { composedComponent as EditQuestion }
