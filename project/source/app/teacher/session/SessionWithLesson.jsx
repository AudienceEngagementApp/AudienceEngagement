// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import {lessonConnect} from 'app/common/connectors/LessonConnect'
import _ from 'underscore'
import {compose} from 'redux'
import {LiveQuestion} from 'app/teacher/question/LiveQuestion'
import {Results} from 'app/teacher/results/Results'

type Props = {
  lesson: Object,
  session: Object,
  setState: number => void,
  setActiveQuestion: string => void,
  resetSession: () => void,
}

class SessionWithLesson extends React.Component<Props>{
  render = (): React$Element<*> => {
    if (this.props.session.question) {
      if (this.props.session.state == 0 || this.props.session.state == 1) {
        // display active question
        return <LiveQuestion {...this.props}
          questionId={this.props.session.question}
          onFinish={this.nextQuestion}
        />
      }  else {
        return <Error message={`Session in incorrect state`} />
      }
    } else {
      return <Error message={`Session does not have question selected`} />
    }
  }

  nextQuestion = () => {
    const questions = this.props.lesson.questions
    const sortedKeys = _.sortBy(_.keys(questions), (questionId) => questions[questionId].order)
    const nextIndex = sortedKeys.indexOf(this.props.session.question) + 1
    if (nextIndex >= sortedKeys.length) {
      this.props.resetSession()
    } else {
      this.props.setActiveQuestion(sortedKeys[nextIndex])
    }

  }

  componentWillReceiveProps = (nextProps: Props): void => {
    console.log('Checking for valid session state')
    // Correct incorrect states in db
    if (nextProps.session.question) {
      if (nextProps.session.state != 0 && nextProps.session.state != 1) {
        nextProps.setState(1)
      }
    } else {
      console.log('Question feild blank. Setting')
      if (_.keys(nextProps.lesson.questions).length > 0) {
        console.log('Found valid question')
        const questions = nextProps.lesson.questions
        const sortedKeys = _.sortBy(_.keys(questions), (questionId) => questions[questionId].order)
        nextProps.setActiveQuestion(sortedKeys[0])
      }
    }
  }
}

const composedComponent = compose(
  lessonConnect
)(SessionWithLesson)

export { composedComponent as SessionWithLesson }
