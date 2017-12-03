// @flow

// TODO: Make this a HOC

import React from 'react'
import {connect} from 'react-redux'
import {compose, type Dispatch} from 'redux'
import {firebaseConnect, isLoaded, isEmpty, toJS, actionTypes} from 'react-redux-firebase'
import {type StoreState} from 'app/state/index'
import _ from 'underscore'
import {uuidv4} from 'node-uuid'

type OwnProps = {
  firebase: Object
}
type StateProps = {
  lessons?: Array<string>
}
type DispatchProps = {
  addLesson: () => void
}
type Props = OwnProps & StateProps & DispatchProps

export const allLessonConnect = <A>(Component: React.Component<A & StateProps & DispatchProps>): React.Component<A & OwnProps> => {
  const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps & OwnProps => {
    if (storeState.firebase.data.lessons) {
      console.log('Lessons found')
      const rawData: Object = storeState.firebase.data.lessons
      return Object.assign({}, {lessons: _.keys(rawData)}, ownProps)
    } else {
      console.log('Lesson(s) not loaded')
      return Object.assign({}, ownProps)
    }
  }
  const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    addLesson: (): void => {
      const lessonId = uuidv4()
      ownProps.firebase.push(`lessons/${lessonId}`, {question: {}})
    }
  })
  const composedComponent = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect((ownProps: OwnProps): Array<string> => {
      console.log('Connecting to /lessons')
      return ['/lessons']
    }),
  )(Component)
  return composedComponent
}
