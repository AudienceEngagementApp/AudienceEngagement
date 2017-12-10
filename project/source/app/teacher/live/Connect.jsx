// @flow

import React from 'react'
import {BigBanner} from 'app/common/BigBanner'
import {type StoreState} from 'app/state/index'
import {compose, type Dispatch} from 'redux'
import {connect, type Connector} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import _ from 'underscore'

import styles from 'styles/teacher/connect/connect.scss'

type OwnProps = {
  onSubmit: () => void,
  sessionId: string,
}
type StateProps = {
  pins: Object
}
type DispatchProps = {
}
type Props = OwnProps & StateProps & DispatchProps

class Connect extends React.Component<Props>{

  render = (): React$Element<*> => {
    const thisPin: string = _.keys(this.props.pins).find((pin: string) => (this.props.pins[pin].session == this.props.sessionId))
    return <div className="container">
      <BigBanner>
        <b>Go to {window.location.hostname + (window.location.port != 80 ? `:${window.location.port}` : '') + '/#/student'}</b> and enter Session <b>PIN: {thisPin}</b>
      </BigBanner>
      <div className="content">
        <span className="total-joined">
          Members joined: 16
        </span>
        <button className="join-session-btn btn" onClick={this.props.onSubmit}>START</button>
      </div>
      <div className="image-row">
        <img src={require('assets/iphoneHand.png')} className="outter" />
        <img src={require('assets/tabletHand.png')} className="inner" />
        <img src={require('assets/samsungHand.png')} className="outter" />
      </div>
      <div className="bottom-content curved-bottom">
        <span>Get your <b>phone</b>, <b>laptop</b>, or <b>tablet</b> out now!</span>
      </div>
    </div>
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
  })
)(Connect)

export { composedComponent as Connect }
