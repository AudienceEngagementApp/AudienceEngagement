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
  setQuestion: string => void
}

class SessionWithLesson extends React.Component<Props>{
  render = (): React$Element<*> => {
    if (this.props.session.question) {
      if (this.props.session.state == 0) {
        // display active question
        return <LiveQuestion {...this.props} questionId={this.props.session.question} isActive={true} />
      } else if (this.props.session.state == 1) {
        if (_.keys(this.props.session.answers).length > 0) {
          // display results
          return <Results />
        } else {
          // display inactive question
          return <LiveQuestion {...this.props} isActive={false} />
        }
      } else {
        return <Error message={`Session in incorrect state`} />
      }
    } else {
      return <Error message={`Session does not have question selected`} />
    }
  }

  componentWillReceiveProps = (nextProps: Props): void => {
    // Correct incorrect states in db
    if (nextProps.session.question) {
      if (nextProps.session.state != 0 && nextProps.session.state != 1) {
        nextProps.setState(1)
      }
    } else {
      if (_.keys(nextProps.lesson.questions).length > 0) {
        nextProps.setQuestion(_.keys(nextProps.lesson.questions)[0])
      }
    }
  }
}

const composedComponent = compose(
  lessonConnect
)(SessionWithLesson)

export { composedComponent as SessionWithLesson }
