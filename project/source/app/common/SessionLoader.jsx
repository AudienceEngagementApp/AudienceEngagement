// @flow

import React from 'react'
import {connect} from 'react-redux'
import {compose, type Dispatch} from 'redux'
import {firebaseConnect, isLoaded, isEmpty, toJS, dataToJS, actionTypes} from 'react-redux-firebase'
import {type StoreState} from 'app/state/index'
import _ from 'underscore'
import {uuidv4} from 'node-uuid'

type OwnProps = {
  sessionId?: string,
  children: React$Node
}
type StateProps = {
  session?: Object,
  sessions?: Array<string>
}
type DispatchProps = {
  //setObject: (path: string, data: Object) => void,
  addSession: (lessonId: string) => void
}
type Props = OwnProps & StateProps & DispatchProps

class SessionLoader extends React.Component<Props>{

  render = (): React$Element<*> => {
    const {children, ...rest} = this.props
    const childrenWithProps: React$Node = React.Children.map(this.props.children,
     (child: React$Element<*>) => React.cloneElement(child, rest)
    );
    return (<div>
      {childrenWithProps}
    </div>)
  }
}

const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps & OwnProps => {
  const path: string = 'sessions' + (ownProps.sessionId ? '/' + ownProps.sessionId : '')
  const rawData: Object = dataToJS(storeState.firebase, path)
  if (rawData) {
    console.log('Found session: ', rawData)
    if (ownProps.sessionId) {
      return Object.assign({}, {session: rawData}, ownProps)
    } else {
      return Object.assign({}, {sessions: _.keys(rawData)}, ownProps)
    }
  } else {
    console.log('Session not found: ', rawData)
    return Object.assign({}, ownProps)
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  /*setObject: (path: string, data: Object) => {
    dispatch({path, data, type: actionTypes.SET})
  },*/
  addSession: (lessonId: string): void => {
    const sessionId = uuidv4()
    const makeId = (): string => {
      const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
      const map = Array.prototype.map
      return map.call('***-***', (char: string): string => {
        if (char.charAt(0) == '*') {
          return possible.charAt(Math.floor(Math.random() * possible.length))
        } else {
          return char.charAt(0)
        }
      }).join('')
    }
    const pin = makeId()
    dispatch({path: `sessions/${sessionId}`, data: {lesson: lessonId, state: 3}, type: actionTypes.SET})
    dispatch({path: `pins/${pin}`, data: {session: sessionId}, type: actionTypes.SET})
    // TODO: reduce a new state containing the current sessionId or pin number to be shown.
  }
})

const composedComponent = compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((ownProps: OwnProps): Array<string> => {
    if (ownProps.sessionId) {
      console.log('connecting to sessions' + (ownProps.sessionId ? '/' + ownProps.sessionId : ''))
      return ['sessions' + (ownProps.sessionId ? '/' + ownProps.sessionId : '')]
    } else {
      return []
    }
  }),
)(SessionLoader)

export { composedComponent as SessionLoader }
