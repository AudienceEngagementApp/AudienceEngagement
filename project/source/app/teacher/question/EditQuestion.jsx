// @flow

import {AnswerBox} from 'app/teacher/question/AnswerBox'
import {compose, type Dispatch} from 'redux'
import {Error} from 'app/common/Error'
import {lessonConnect} from 'app/common/connectors/LessonConnect'
import {EditQuestionDelegate} from 'app/teacher/question/EditQuestionDelegate'
import {withRouter} from 'react-router'
import React, {Component, PropTypes} from 'react'

import styles from 'styles/teacher/question/_new-mc-question.scss'

type Props = {
  lesson: Object,
  lessonId: string,
  questionId: string,
  onFinish: void => null,
  history: Object,
  setQuestion: (questionId: string, question: string, type: number, answers: ?Array<string> | Object, correct: ?string | number) => string,
}

class EditQuestion extends React.Component<Props> {

  render = (): React$Element<*> => {
    if (this.props.lesson &&
      this.props.lesson.questions &&
      this.props.questionId &&
      this.props.lesson.questions[this.props.questionId]
    ) {
      const question: Object = this.props.lesson.questions[this.props.questionId]
      if (question.type == 0) {
        return <EditQuestionDelegate
          question={question.question}
          answerChoices={question.answers}
          correctAnswer={question.correct}
          questionEditable={true}
          answersEditable={true}
          setQuestion={(question: string, answers: ?Array<string> | Object, correct: ?string | number) => this.props.setQuestion(this.props.questionId, question, 0, answers, correct)}
          onFinish={this.props.history.goBack}
          noCorrectAnswer={false}
        />
      } else if (question.type == 1) {
        return <EditQuestionDelegate
          question={question.question}
          answerChoices={{T: 'True', F: 'False'}}
          correctAnswer={question.correct == 1 ? 'True' : 'False'}
          questionEditable={true}
          answersEditable={false}
          setQuestion={(question: string, answers: ?Array<string> | Object, correct: ?string | number) => this.props.setQuestion(this.props.questionId, question, 1, answers, correct)}
          onFinish={this.props.history.goBack}
          noCorrectAnswer={false}
        />
      } else if (question.type == 2) {
        return <EditQuestionDelegate
          question={question.question}
          questionEditable={true}
          answersEditable={false}
          setQuestion={(question: string, answers: ?Array<string> | Object, correct: ?string | number) => this.props.setQuestion(this.props.questionId, question, 2, answers, correct)}
          onFinish={this.props.history.goBack}
          noCorrectAnswer={true}
        />
      } else {
        return <Error message='Incorrect question type' />
      }
    }
    return <Error message='Failed to load message' />
  }
}

const composedComponent = compose(
  withRouter,
  lessonConnect,
)(EditQuestion)

export { composedComponent as EditQuestion }
