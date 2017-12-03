// @flow

import React from 'react'
import {Route, Link} from 'react-router-dom'
import {allLessonConnect} from 'app/common/connectors/AllLessonConnect'
import {compose} from 'redux'
import _ from 'underscore'
import {NewLessonModal} from 'app/teacher/home/NewLessonModal'

type OwnProps = {
  lessons: Object,
  addLesson: (name: string) => string
}

type Props = OwnProps

class TeacherHome extends React.Component<Props>{

  render = (): React$Element<*> => {
    const lessonElements = _.keys(this.props.lessons).map((lessonId: string) => (<li key={lessonId}>
      {this.props.lessons[lessonId].name} <Link to={`/teacher/lesson/${lessonId}`}><button>Edit</button></Link>
    </li>))
    return (<div>
      <Link to='/teacher/live'><button>Go Live</button></Link>
      <h3>Current Lessons</h3>
      <ul>{lessonElements}</ul>
      <Link to={`/teacher/newlesson`}><button>New lesson</button></Link>
      <Route path='/teacher/newlesson' component={() => (<div>
        <NewLessonModal {...this.props}/>
      </div>)} />
    </div>)
  }
}

const composedComponent = compose(
  allLessonConnect
)(TeacherHome)

export { composedComponent as TeacherHome }
