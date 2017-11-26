// @flow

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import {type StoreState} from 'app/state/index'

type OwnProps = {
}
type StateProps = {
  tests: {
    pins: Object,
    sessions: Object,
    lessons: Object
  }
}

class Test extends Component<*> {
  handleAdd = () => {
    const {firebase} = this.props
    firebase.update('/', {flag1: 'this'})
  }

  render () {
    const {tests} = this.props
    console.log(tests)
    const testObject = (!isLoaded(tests)) ? 'Loading' : (isEmpty(tests)) ? 'object is empty' : JSON.stringify(tests)
    return (
      <div >
        <h4>object</h4>
        {testObject}
        <h4>New Todo</h4>
        <input type='text' />
        <button onClick={this.handleAdd}>
          Add
        </button>
      </div>
    )
  }
}

const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): StateProps & OwnProps => {
  return {
    tests: Object.assign({},
      {pins: storeState.firebase.data.pins},
      {sessions: storeState.firebase.data.sessions},
      {lessons: storeState.firebase.data.lessons}
    )
  }
}

const componentWithCompose = compose(
  firebaseConnect(['/pins']),
  connect(mapStateToProps)
)(Test)


export { componentWithCompose as Test }
