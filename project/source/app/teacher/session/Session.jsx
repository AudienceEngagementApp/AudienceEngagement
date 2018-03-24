// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import {sessionConnect} from 'app/common/connectors/SessionConnect'
import {compose} from 'redux'
import {SessionNoLesson} from 'app/teacher/session/SessionNoLesson'
import {SessionWithLesson} from 'app/teacher/session/SessionWithLesson'
import {firebaseConnect} from 'react-redux-firebase'
import {type StoreState} from 'app/state/index'
import {connect, type Connector} from 'react-redux'
import _ from 'underscore'

type OwnProps = {
  session: Object,
  sessionId: string,
  setState: number => void,
}

type StateProps = {
  pins: Object
}

type Props = OwnProps & StateProps

class Session extends React.Component<Props>{
  render = (): React$Element<*> => {
    const thisPin = _.keys(this.props.pins).find((pin: string) => this.props.pins[pin].session == this.props.sessionId)
    if (!this.props.session) {
      return (<div>
        <Error message={`Session not found`} />
      </div>)
    } else if (this.props.session.lesson) {
      return <SessionWithLesson lessonId={this.props.session.lesson} pin={thisPin} {...this.props}/>
    } else {
      return <SessionNoLesson {...this.props} pin={thisPin}/>
    }
  }
}

const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps => {
  const rawData: Object = storeState.firebase.data.pins
  return Object.assign({},
    rawData ? {pins: rawData} : {pins: {}},
    ownProps,
  )
}

const composedComponent = compose(
  connect(mapStateToProps),
  firebaseConnect((ownProps: OwnProps): Array<string> => {
    console.log('Connecting to /pins')
    return ['/pins']
  }),
  sessionConnect
)(Session)

export { composedComponent as Session }
