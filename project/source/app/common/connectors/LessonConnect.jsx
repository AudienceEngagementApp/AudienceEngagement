// @flow

import React from 'react'
import {connect} from 'react-redux'
import {compose, type Dispatch} from 'redux'
import {firebaseConnect, isLoaded, isEmpty, toJS, actionTypes} from 'react-redux-firebase'
import {type StoreState} from 'app/state/index'
import _ from 'underscore'
import {Loading} from 'app/common/Loading'
import uuidv4 from 'uuid/v4'
import {getAddQuestionCommand, getSetManyQuestionOrderCommand, getSetQuestionOrderCommand, getAddQuestionAnswerCommand, getRemoveQuestionCommand, getRemoveLessonCommand, getSetQuestionCommand} from 'app/actions/LessonAction'

type OwnProps = {
  lessonId: string,
  firebase: Object,
}
type StateProps = {
  lesson?: Object,
}
type DispatchProps = {
  addQuestion: (question: string, type: number, order: number, answers: ?Array<string> | Object, correct: ?string | number) => string,
  addQuestionAnswer: (questionId: string, answerLetter: string, answerChoice: string) => void,
  removeQuestion: (questionId: string) => void,
  removeLesson: (lessonId: string) => void,
  setQuestion: (questionId: string, question: string, type: number, order: number, answers: ?Array<string> | Object, correct: ?string | number) => string,
  setQuestionOrder: (questionId: string, order: number) => void,
  setManyQuestionOrder: (Array<{questionId: string, order: number}>) => void,
}
type Props = OwnProps & StateProps & DispatchProps

export const lessonConnect = <A>(Component: React.Component<A & StateProps & DispatchProps>): React.Component<A & OwnProps> => {
  const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps & OwnProps => {
    if (storeState.firebase.data.lessons) {
      console.log('Lesson found')
      const rawData: Object = storeState.firebase.data.lessons[ownProps.lessonId]
      return Object.assign({}, {lesson: rawData}, ownProps)
    } else {
      console.log('Lesson(s) not loaded')
      return Object.assign({}, ownProps)
    }
  }
  const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    addQuestion: getAddQuestionCommand(dispatch, ownProps),
    addQuestionAnswer: getAddQuestionAnswerCommand(dispatch, ownProps),
    removeQuestion: getRemoveQuestionCommand(dispatch, ownProps),
    removeLesson: getRemoveLessonCommand(dispatch, ownProps),
    setQuestion: getSetQuestionCommand(dispatch, ownProps),
    setQuestionOrder: getSetQuestionOrderCommand(dispatch, ownProps),
    setManyQuestionOrder: getSetManyQuestionOrderCommand(dispatch, ownProps)
  })
  const composedComponent = compose(
    firebaseConnect((ownProps: OwnProps): Array<string> => {
      console.log(`Connecting to /lessons/${String(ownProps.lessonId)}`)
      return [`/lessons/${String(ownProps.lessonId)}`]
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(Component)
  return composedComponent
}
