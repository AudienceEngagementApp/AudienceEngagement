// @flow

import React from 'react'
import {Redirect} from 'react-router-dom'
import {compose} from 'redux'
import {connect, type Connector} from 'react-redux'
import {allSessionConnect} from 'app/common/connectors/AllSessionConnect'

type OwnProps = {
}
type StateProps = {
}
type DispatchProps = {
  addSession: () => string,
}
type Props = OwnProps & StateProps & DispatchProps

class LiveIndex extends React.Component<Props>{

  render = (): React$Element<*> => (
    <Redirect to={`/teacher/live/${this.props.addSession()}`} />
  )
}

const composedComponent = compose(
  allSessionConnect
)(LiveIndex)

export {composedComponent as LiveIndex}
