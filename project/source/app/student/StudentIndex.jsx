// @flow

import {JoinSession} from 'app/student/join/JoinSession'
import {Session} from 'app/student/session/Session'
import {Link, Route, Switch, Redirect} from 'react-router-dom'
import React from 'react'
import {type StoreState} from 'app/state/index'
import {setName} from 'app/actions/LoginInfoAction'
import {type Dispatch} from 'redux'
import {connect, type Connector} from 'react-redux'

type OwnProps = {
}
type StateProps = {
  name: string,
}
type DispatchProps = {
  setName: (name: string) => void,
}
type Props = OwnProps & StateProps & DispatchProps

class StudentIndex extends React.Component<Props>{

  render = (): React$Element<*> => {
    return (<div>
      <Switch>
        <Route path='/student/session/:sessionId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})' component={() =>
          this.props.name ? <Session {...this.props}/> : <Redirect to='/student' /> } />
        <Route path='/student' component={() => (
          <JoinSession {...this.props}/>
        )} />
      </Switch>
    </div>)
  }
}

const mapStateToProps = (state: StoreState, ownProps: OwnProps): StateProps => {
  return {
  name: state.loginInfo.name,
  ...ownProps,
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  setName: (name: string) => {
    dispatch(setName(name));
  },
})

const connector: Connector<OwnProps, Props> = connect(mapStateToProps, mapDispatchToProps);

const componentWithState = connector(StudentIndex)

export { componentWithState as StudentIndex }
