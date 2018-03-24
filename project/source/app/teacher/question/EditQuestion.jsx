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
  setQuestion: (questionId: string, question: string, type: number, order: number, answers: ?Array<string> | Object, correct: ?string | number) => string,
}

class EditQuestion extends React.Component<Props> {

  render = (): React$Element<*> => {
    if (this.props.lesson &&
      this.props.lesson.questions &&
      this.props.questionId &&
      this.props.lesson.questions[this.props.questionId]
    ) {
      const question: Object = this.props.lesson.questions[this.props.questionId]
      const onFinish = (): void => {
        this.props.history.goBack()
        //window.location.href = `/#/teacher/lesson/${this.props.lessonId}`
      }
      if (question.type == 0) {
        return <EditQuestionDelegate
          question={question.question}
          answerChoices={question.answers}
          correctAnswer={question.correct}
          questionEditable={true}
          answersEditable={true}
          setQuestion={(questionPrompt: string, answers: ?Array<string> | Object, correct: ?string | number) => this.props.setQuestion(this.props.questionId, questionPrompt, 0, question.order, answers, correct)}
          onFinish={onFinish}
          noCorrectAnswer={false}
        />
      } else if (question.type == 1) {
        return <EditQuestionDelegate
          question={question.question}
          answerChoices={{T: 'True', F: 'False'}}
          correctAnswer={question.correct == 1 ? 'True' : 'False'}
          questionEditable={true}
          answersEditable={false}
          setQuestion={(questionPrompt: string, answers: ?Array<string> | Object, correct: ?string | number) => this.props.setQuestion(this.props.questionId, questionPrompt, 1, question.order, answers, correct)}
          onFinish={onFinish}
          noCorrectAnswer={false}
        />
      } else if (question.type == 2) {
        return <EditQuestionDelegate
          question={question.question}
          questionEditable={true}
          answersEditable={false}
          setQuestion={(questionPrompt: string, answers: ?Array<string> | Object, correct: ?string | number) => this.props.setQuestion(this.props.questionId, questionPrompt, 2, question.order, answers, correct)}
          onFinish={onFinish}
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
