// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import {compose} from 'redux'
import {LiveQuestionDelegate} from 'app/teacher/question/LiveQuestionDelegate'
import _ from 'underscore'

type Props = {
  lesson?: {
    questions: Object
  },
  session: {
    question: string,
  },
  onFinish: void => null,
  pin: string,
  setState: number => void,
  setQuestion: string => void,
}

export class LiveQuestion extends React.Component<*>{

  render = (): React$Element<*> => {
    if (this.props.lesson &&
      this.props.lesson.questions[this.props.session.question] &&
      (this.props.lesson.questions[this.props.session.question].type ||
      this.props.lesson.questions[this.props.session.question].type === 0) &&
      this.props.lesson.questions[this.props.session.question].question
    ) {
      const question = this.props.lesson.questions[this.props.session.question]
      const state = this.props.session.state
      const answers = (this.props.session.answers && this.props.session.answers[this.props.session.question]) ? this.props.session.answers[this.props.session.question] : {}
      if (question.type == 0) {
        return <LiveQuestionDelegate
          question={question.question}
          answerChoices={question.answers}
          correctAnswer={question.correct}
          onFinish={this.props.onFinish}
          state={state}
          responses={_.values(answers)}
          pin={this.props.pin}
          {...this.props}
        />
      } else if (question.type == 1) {
        return <LiveQuestionDelegate
          question={question.question}
          answerChoices={{T: 'True', F: 'False'}}
          correctAnswer={question.correct == 1 ? 'True' : 'False'}
          onFinish={this.props.onFinish}
          state={state}
          responses={_.values(answers)}
          pin={this.props.pin}
          {...this.props}
        />
      } else if (question.type == 2) {
        return <LiveQuestionDelegate
          question={question.question}
          onFinish={this.props.onFinish}
          state={state}
          responses={_.values(answers)}
          pin={this.props.pin}
          {...this.props}
        />
      } else {
        return <Error message='Incorrect question type' />
      }
    } else {
      return <Error message='An Error Occured' />
    }
  }

}
