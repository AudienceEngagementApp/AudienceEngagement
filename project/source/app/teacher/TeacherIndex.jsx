// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {Lesson} from 'app/teacher/lesson/Lesson'
import {TeacherHome} from 'app/teacher/home/TeacherHome'
import {EditMcQuestion} from 'app/teacher/question/EditMcQuestion'
import {Connect} from 'app/teacher/connect/Connect'

export class TeacherIndex extends React.Component<*>{

  render = (): React$Element<*> => (<div>
    <Switch>
      <Route path='/teacher/lesson/:lessonId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/question/:question([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' component={() => (<div>
        <EditMcQuestion />
      </div>)} />
      <Route path='/teacher/lesson/:lessonId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' component={() => (<div>
        <Lesson />
      </div>)} />
      <Route path='/teacher/live' component={() => (
        <Connect />
      )} />
      <Route path='/teacher' component={() => (
        <TeacherHome />
      )} />
    </Switch>
  </div>)
}
