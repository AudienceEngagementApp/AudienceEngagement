// @flow

import {type Action, ActionTypes} from 'app/actions/LiveConnectAction'
import {type State} from 'app/state/LiveConnectState'

const initialState = {
  hasSeenConnectScreen: false
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.set: {
      return Object.assign({}, state,
        action.data.hasSeenConnectScreen ? {hasSeenConnectScreen: action.data.hasSeenConnectScreen}: {},
      )
    }
    default:
      return state
  }
}
