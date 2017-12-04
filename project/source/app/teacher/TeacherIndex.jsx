// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {Lesson} from 'app/teacher/lesson/Lesson'
import {TeacherHome} from 'app/teacher/home/TeacherHome'
import {EditMcQuestion} from 'app/teacher/question/EditMcQuestion'
import {Live} from 'app/teacher/live/Live'
import {compose, type Dispatch} from 'redux'

export class TeacherIndex extends React.Component<*>{

  render = (): React$Element<*> => (<div>
    <Switch>
      <Route path='/teacher/lesson/:lessonId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/question/:question([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' component={
        EditQuestionFromURL
      } />
      <Route path='/teacher/lesson/:lessonId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' component={
        LessonFromURL
      } />
      <Route path='/teacher/live' component={() => (
        <Live {...this.props}/>
      )} />
      <Route path='/teacher' component={() => (
        <TeacherHome  {...this.props}/>
      )} />
    </Switch>
  </div>)
}

type QuestionMatchProps = {
  match: {
    params: {
      lessonId: string,
      questionId: string
    }
  }
}
type LessonMatchProps = {
  match: {
    params: {
      lessonId: string
    }
  }
}
const EditQuestionFromURL = (props: QuestionMatchProps) => <EditMcQuestion lessonId={props.match.params.lessonId} questionId={props.match.params.questionId} {...props}/>
const LessonFromURL = (props: LessonMatchProps) => <Lesson lessonId={props.match.params.lessonId} {...props}/>
