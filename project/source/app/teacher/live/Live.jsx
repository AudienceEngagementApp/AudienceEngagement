// @flow

import React from 'react'
import {BigBanner} from 'app/common/BigBanner'
import {Connect} from 'app/teacher/live/Connect'
import {Session} from 'app/teacher/session/Session'
import {Route, Switch, Redirect} from 'react-router-dom'
import {type StoreState} from 'app/state/index'
import {allSessionConnect} from 'app/common/connectors/AllSessionConnect'
import {compose, type Dispatch} from 'redux'
import {connect, type Connector} from 'react-redux'

type State = {
  hasSeenConnectScreen: boolean
}
type OwnProps = {
}
type StateProps = {
}
type DispatchProps = {
  addSession: () => string,
}
type Props = OwnProps & StateProps & DispatchProps

type SessionMatchProps = {
  match: {
    params: {
      sessionId: string
    }
  }
}

class Live extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {hasSeenConnectScreen: false}
  }

  render = (): React$Element<*> => (
    <Switch>
      <Route path='/teacher/live/:sessionId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' component={(props: SessionMatchProps) =>
        (this.state.hasSeenConnectScreen) ? (
          <Session sessionId={props.match.params.sessionId} {...this.props}/>
        ) : (
          <Connect onSubmit={this.onConnectStart} {...this.props}/>
        )
      } />
      <Route path='/teacher/live' component={() =>
        // Spawn new session
        <Redirect to={`/teacher/live/${this.props.addSession()}`} />
      } />
    </Switch>
  )

  onConnectStart = (): void => {
    this.setState({hasSeenConnectScreen: true})
  }
}

const composedComponent = compose(
  allSessionConnect
)(Live)

export {composedComponent as Live}
