// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import {allLessonConnect} from 'app/common/connectors/AllLessonConnect'
import {compose} from 'redux'
import _ from 'underscore'

type Props = {
  session: Object,
  lessons: Object,
  children?: React$Node,
  setLesson: (lessonId: string, questionId: ?string) => void
}

class SessionNoLesson extends React.Component<Props>{
  render = (): React$Element<*> => {
    const lessonElements = _.keys(this.props.lessons).map((lessonId: string) => (
      <li
        key={lessonId}
        onClick={() => _.keys(this.props.lessons[lessonId].questions).length ?
          this.props.setLesson(lessonId, _.keys(this.props.lessons[lessonId].questions)[0]) :
          this.props.setLesson(lessonId)
        }
      >
      {this.props.lessons[lessonId].name} <button>Use</button>
    </li>))
    return (<div>
      <h2>Quick Question (Under construction)</h2>
      <ul>
        <li>Multiple Choice</li>
        <li>True / False</li>
        <li>Short Answer</li>
      </ul>
      <h2>Lessons</h2>
      <ul>{lessonElements}</ul>
    </div>)
  }
}

const composedComponent = compose(
  allLessonConnect
)(SessionNoLesson)

export { composedComponent as SessionNoLesson }
