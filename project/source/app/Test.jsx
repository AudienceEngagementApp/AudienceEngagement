// @flow

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded, isEmpty, toJS, dataToJS} from 'react-redux-firebase'

class Test extends Component<*> {
  handleAdd = () => {
    const {firebase} = this.props
    firebase.update('/', {flag1: 'this'})
  }

  render () {
    const {tests} = this.props
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

const componentWithCompose = compose(
  firebaseConnect(['/']),
  connect(
    ({ firebase }) => ({
      tests: Object.assign({},
        {pins: dataToJS(firebase, 'pins')},
        {sessions: dataToJS(firebase, 'sessions')},
        {lessons: dataToJS(firebase, 'lessons')}
      )
    })
  )
)(Test)


export { componentWithCompose as Test }
