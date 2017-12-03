// @flow

// TODO: Make this a HOC

import React from 'react'
import {connect} from 'react-redux'
import {compose, type Dispatch} from 'redux'
import {firebaseConnect, isLoaded, isEmpty, toJS, actionTypes} from 'react-redux-firebase'
import {type StoreState} from 'app/state/index'
import _ from 'underscore'
import uuidv4 from 'uuid/v4'

type OwnProps = {
  firebase: Object
}
type StateProps = {
  lessons?: Object
}
type DispatchProps = {
  addLesson: (name: string) => string
}
type Props = OwnProps & StateProps & DispatchProps

export const allLessonConnect = <A>(Component: React.Component<A & StateProps & DispatchProps>): React.Component<A & OwnProps> => {
  const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps & OwnProps => {
    if (storeState.firebase.data.lessons) {
      console.log('Lessons found')
      const rawData: Object = storeState.firebase.data.lessons
      return Object.assign({}, {lessons: rawData}, ownProps)
    } else {
      console.log('Lesson(s) not loaded')
      return Object.assign({}, ownProps)
    }
  }
  const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    addLesson: (name: string): string => {
      console.log(uuidv4())
      const lessonId = uuidv4()
      ownProps.firebase.set(`lessons/${lessonId}`, {name: name, questions: {}})
      return lessonId
    }
  })
  const composedComponent = compose(
    firebaseConnect((ownProps: OwnProps): Array<string> => {
      console.log('Connecting to /lessons')
      return ['/lessons']
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(Component)
  return composedComponent
}
