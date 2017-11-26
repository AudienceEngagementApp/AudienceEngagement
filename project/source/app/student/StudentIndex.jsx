// @flow

import {JoinSession} from 'app/student/join/JoinSession'
import {Session} from 'app/student/session/Session'
import {Link, Route, Switch, Redirect} from 'react-router-dom'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import React from 'react'
import {type StoreState} from 'app/state/index'
import {setLoginInfo} from 'app/actions/LoginInfoAction'
import {compose, type Dispatch} from 'redux'
import {connect, type Connector} from 'react-redux'
import {SessionLoader} from 'app/common/SessionLoader'

type OwnProps = {
  match: Object
}
type StateProps = {
  name: string,
  sessionId: string,
  pins: Object,
}
type DispatchProps = {
  setLoginInfo: (name: string, sessionId: string) => void,
}
type Props = OwnProps & StateProps & DispatchProps

class StudentIndex extends React.Component<Props>{

  render = (): React$Element<*> => {
    return (<div>
      <Switch>
        <Route path='/student/session/:sessionId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' component={() =>
          this.props.name && this.props.sessionId ? (
            <SessionLoader sessionId={this.props.sessionId}><Session {...this.props}/></SessionLoader>
          ) : (
            <Redirect to='/student' />
          )} />
        <Route path='/student' component={() => (
          <JoinSession {...this.props}/>
        )} />
      </Switch>
    </div>)
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
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((ownProps: OwnProps): Array<string> => {
    console.log('Connecting to /pins')
    return ['/pins']
  })
)(StudentIndex)

export { composedComponent as StudentIndex }
