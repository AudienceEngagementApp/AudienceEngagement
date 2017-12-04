// @flow

import React from 'react'
import {connect} from 'react-redux'
import {compose, type Dispatch} from 'redux'
import {firebaseConnect, isLoaded, isEmpty, toJS, actionTypes} from 'react-redux-firebase'
import {type StoreState} from 'app/state/index'
import _ from 'underscore'
import {Loading} from 'app/common/Loading'
import uuidv4 from 'uuid/v4'

type OwnProps = {
  lessonId: string,
  firebase: Object,
}
type StateProps = {
  lesson?: Object,
}
type DispatchProps = {
  addQuestion: (question: string, type: number) => void,
  addQuestionAnswer: (questionId: string, answerLetter: string, answerChoice: string) => void
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
    addQuestion: (question: string, type: number): void => {
      const questionId = uuidv4()
      if (type == 0) {
        ownProps.firebase.push(`lessons/${ownProps.lessonId}`, {question: question, type: type, answers: {}})
      } else {
        ownProps.firebase.push(`lessons/${ownProps.lessonId}`, {question: question, type: type})
      }
    },
    addQuestionAnswer: (questionId: string, answerLetter: string, answerChoice: string): void => {
      ownProps.firebase.push(`lessons/${ownProps.lessonId}/${answerLetter}`, answerChoice)
    }
  })
  const composedComponent = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect((ownProps: OwnProps): Array<string> => {
      console.log(`Connecting to /lessons/${String(ownProps.lessonId)}`)
      return [`/lessons/${String(ownProps.lessonId)}`]
    }),
  )(Component)
  return composedComponent
}
