// @flow

import React from 'react'
import {withRouter} from 'react-router-dom'
import {Route, Link} from 'react-router-dom'
import {allLessonConnect} from 'app/common/connectors/AllLessonConnect'
import PlayCircle from 'react-icons/lib/md/play-circle-outline'
import {compose, type Dispatch} from 'redux'
import _ from 'underscore'
import {connect} from 'react-redux'
import {NewLessonModal} from 'app/teacher/home/NewLessonModal'
import {getAddSessionCommand} from 'app/actions/SessionAction'
import classnames from 'classnames'
import {type StoreState} from 'app/state/index'

import styles from 'styles/teacher/home/_teacher-home.scss'

type OwnProps = {
  history: *,
  lessons: Object,
  addLesson: (name: string) => string,
}

type StateProps = {
}

type DispatchProps = {
}

type Props = OwnProps & StateProps & DispatchProps

class TeacherHome extends React.Component<Props>{

  render = (): React$Element<*> => {
    const lessonElements = _.keys(this.props.lessons).filter((lessonId: string) => this.props.lessons[lessonId]).map((lessonId: string) => {
      const numQuestions =_.keys(this.props.lessons[lessonId].questions).length
      return (<li key={lessonId}>
        <Link to={`/teacher/lesson/${lessonId}`} className={classnames('selection-square')}>
          <div className={classnames('edit-lesson')}>
            <h1>{numQuestions}</h1>
            <h5>{numQuestions == 1 ? 'Question' : 'Questions'}</h5>
          </div>
          <h4>{this.props.lessons[lessonId].name}</h4>
        </Link>
      </li>)
    })
    return (<div className={classnames('teacher-home')}>
      <div className={classnames('top-bar')}>
        <h1>
          <span className={classnames('dynamic-show')}>Start Live Session</span>
          <PlayCircle onClick={this.liveSessionPressed} />
        </h1>
      </div>
      <div className={classnames('lined-header')}><h3><span>Lessons</span></h3></div>
      <ul className={'selection-collection'}>
        {lessonElements}
        <li>
          <Link to={`/teacher/newlesson`} className={classnames('selection-square')}>
            <div className={classnames('new-lesson')}>
              <div className={classnames('inner-icon')}>+</div>
            </div>
            <h4>Create New Lesson</h4>
          </Link>
        </li>
      </ul>
      <Route path='/teacher/newlesson' component={() => (<div>
        <NewLessonModal {...this.props} newLesson={this.newLesson}/>
      </div>)} />
    </div>)
  }

  newLesson = (lessonName: string): void => {
    if (lessonName) {
      this.props.history.push(`/teacher/lesson/${this.props.addLesson(lessonName)}`)
    }
  }

  liveSessionPressed = (): void => {
    this.props.history.push(`/teacher/live`)
  }
}

const composedComponent = compose(
  withRouter,
  allLessonConnect,
)(TeacherHome)

export { composedComponent as TeacherHome }
