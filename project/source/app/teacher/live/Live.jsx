// @flow

import React from 'react'
import {BigBanner} from 'app/common/BigBanner'
import {Connect} from 'app/teacher/live/Connect'
import {Session} from 'app/teacher/session/Session'
import {Route, Switch, Redirect} from 'react-router-dom'
import {type StoreState} from 'app/state/index'
import {compose, type Dispatch} from 'redux'
import {connect, type Connector} from 'react-redux'
import {Error} from 'app/common/Error'
import {LiveIndex} from 'app/teacher/live/LiveIndex'
import {getSetSeenConnectCommand} from 'app/actions/LiveConnectAction'

type OwnProps = {
}
type StateProps = {
  hasSeenConnectScreen: boolean
}
type DispatchProps = {
  setSeenConnect: boolean => void
}
type Props = OwnProps & StateProps & DispatchProps

type SessionMatchProps = {
  match: {
    params: {
      sessionId: string
    }
  }
}

class Live extends React.Component<Props>{
  render = (): React$Element<*> => (
    <Switch>
      <Route path='/teacher/live/:sessionId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' component={(props: SessionMatchProps) =>
        (this.props.hasSeenConnectScreen) ? (
          <Session sessionId={props.match.params.sessionId} {...this.props}/>
        ) : (
          <Connect onSubmit={this.onConnectStart} {...this.props}/>
        )
      } />
      <Route path='/teacher/live' component={() =>
        // Spawn new session
        <LiveIndex />
      } />
    </Switch>
  )
  onConnectStart = (): void => {
    this.props.setSeenConnect(true)
  }
}

const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps => {
  return Object.assign ({},
    { hasSeenConnectScreen: storeState.liveConnect.hasSeenConnectScreen,
    ...ownProps,
  })
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  setSeenConnect: getSetSeenConnectCommand(dispatch, ownProps),
})

const composedComponent = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Live)

export { composedComponent as Live }
