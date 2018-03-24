// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import {allLessonConnect} from 'app/common/connectors/AllLessonConnect'
import {compose} from 'redux'
import _ from 'underscore'
import classnames from 'classnames'
import {LinedHeader} from 'app/common/LinedHeader'

import styles from 'styles/teacher/livehome/_session-no-lesson.scss'

type Props = {
  session: Object,
  pin: string,
  lessons: Object,
  children?: React$Node,
  setLesson: (lessonId: string, questionId: ?string) => void
}

class SessionNoLesson extends React.Component<Props>{
  render = (): React$Element<*> => {
    const lessonElements = _.keys(this.props.lessons).filter((lessonId: string) => this.props.lessons[lessonId]).map((lessonId: string) => {
      const numQuestions =_.keys(this.props.lessons[lessonId].questions).length
      return (<li key={lessonId}>
        <div
          className={classnames('selection-square')}
          onClick={() => _.keys(this.props.lessons[lessonId].questions).length ?
            this.props.setLesson(lessonId, _.keys(this.props.lessons[lessonId].questions)[0]) :
            this.props.setLesson(lessonId)
          }
        >
        <div className={classnames('use-lesson')}>
          <h1>{numQuestions}</h1>
          <h5>{numQuestions == 1 ? 'Question' : 'Questions'}</h5>
        </div>
        <h4>{this.props.lessons[lessonId].name}</h4>
      </div>
      </li>)
    })
    return (<div className={classnames('session-no-lesson')}>
      <div className={classnames('top-bar')}>
        <h1>
          <span className={classnames('dynamic-show-session-no-lesson ')}>
            Join at <b>{window.location.hostname + (window.location.port != 80 ? `:${window.location.port}` : '') + '/#/student'}</b> /
          </span> Session PIN: <b>{this.props.pin}</b>
        </h1>
      </div>
      <LinedHeader>Lessons</LinedHeader>
      <ul className={'selection-collection'}>
        {lessonElements}
      </ul>
    </div>)
  }
}

const composedComponent = compose(
  allLessonConnect
)(SessionNoLesson)

export { composedComponent as SessionNoLesson }
