// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import uuidv4 from 'node-uuid'

export class TeacherHome extends React.Component<*>{

  render = (): React$Element<*> => (
    <div>
      <Link to='/teacher/live'><button>Go Live</button></Link>
      <Link to={`/teacher/lesson/${this.createNewLesson()}`}><button>New lesson</button></Link>
    </div>
  )

  createNewLesson = (): string => {
    return uuidv4()
  }
}
