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
    const lessonElements = _.keys(this.props.lessons).filter((lessonId: string) => this.props.lessons[lessonId]).map((lessonId: string) => (<li key={lessonId}>
      {this.props.lessons[lessonId].name} <Link to={`/teacher/lesson/${lessonId}`}><button>Edit</button></Link>
    </li>))
    return (<div className={classnames('teacher-home')}>
      <div className={classnames('top-bar')}>
        <h1>
          <span className={classnames('dynamic-show')}>Start Live Session</span>
          <PlayCircle onClick={this.liveSessionPressed} />
        </h1>
      </div>
      <div className={classnames('lined-header')}><h3><span>Lessons</span></h3></div>
      <ul>{lessonElements}</ul>
      <Link to={`/teacher/newlesson`}><button>New lesson</button></Link>
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
