// @flow

import {JoinSession} from 'app/student/join/JoinSession'
import {Session} from 'app/student/session/Session'
import {Link, Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import React from 'react'
import {type StoreState} from 'app/state/index'
import {setLoginInfo} from 'app/actions/LoginInfoAction'
import {compose, type Dispatch} from 'redux'
import {connect, type Connector} from 'react-redux'

type OwnProps = {
  match: Object,
  history: Object
}
type StateProps = {
  name: string,
  sessionId: string,
  pins: Object
}
type DispatchProps = {
  setLoginInfo: (name: string, sessionId: string) => void,
}
type SessionMatchProps = {
  match: {
    params: {
      sessionId: string
    }
  }
}
type Props = OwnProps & StateProps & DispatchProps

class StudentIndex extends React.Component<Props>{

  render = (): React$Element<*> => {
    return (<div>
      <Switch>
        <Route path='/student/session/:sessionId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' component={(matchProps: SessionMatchProps) =>
          this.props.name ? (
            <Session {...this.props} sessionId={matchProps.match.params.sessionId}/>
          ) : (
            <JoinSession {...this.props} sessionId={matchProps.match.params.sessionId}/>
          )} />
        <Route path='/student' component={() => (
          <JoinSession {...this.props} onSubmit={this.goToSession}/>
        )} />
      </Switch>
    </div>)
  }

  goToSession = (sessionId: string, name: string): void => {
    this.props.history.push(`/student/session/${sessionId}`)
  }
}

const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps => {
  const rawData: Object = storeState.firebase.data.pins
  return Object.assign ({},
    rawData ? {pins: rawData} : {pins: {}},
    { name: storeState.loginInfo.name,
    sessionId: storeState.loginInfo.sessionId,
    ...ownProps,
  })
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  setLoginInfo: (name: string, sessionId: string) => {
    dispatch(setLoginInfo(name, sessionId));
  },
})

const composedComponent = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((ownProps: OwnProps): Array<string> => {
    console.log('Connecting to /pins')
    return ['/pins']
  })
)(StudentIndex)

export { composedComponent as StudentIndex }
