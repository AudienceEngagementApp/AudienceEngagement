// @flow

import React from 'react'
import {withRouter} from 'react-router-dom'
import {Route, Link} from 'react-router-dom'
import {allLessonConnect} from 'app/common/connectors/AllLessonConnect'
import {compose} from 'redux'
import _ from 'underscore'
import {NewLessonModal} from 'app/teacher/home/NewLessonModal'

type OwnProps = {
  history: *,
  lessons: Object,
  addLesson: (name: string) => string
}

type Props = OwnProps

class TeacherHome extends React.Component<Props>{

  render = (): React$Element<*> => {
    const lessonElements = _.keys(this.props.lessons).filter((lessonId: string) => this.props.lessons[lessonId]).map((lessonId: string) => (<li key={lessonId}>
      {this.props.lessons[lessonId].name} <Link to={`/teacher/lesson/${lessonId}`}><button>Edit</button></Link>
    </li>))
    return (<div>
      <Link to='/teacher/live'><button>Go Live</button></Link>
      <h3>Current Lessons</h3>
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
}

const composedComponent = compose(
  withRouter,
  allLessonConnect
)(TeacherHome)

export { composedComponent as TeacherHome }
