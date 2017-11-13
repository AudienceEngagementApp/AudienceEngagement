// @flow

import {type Action, ActionTypes} from 'app/actions/LoginInfoAction'
import {type State} from 'app/state/LoginInfoState'

const initialState = {
  name: null,
  sessionId: null
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.set: {
      return Object.assign({}, state,
        action.data.name ? {name: action.data.name}: {},
        action.data.sessionId ? {sessionId: action.data.sessionId} : {}
      )
    }
    default:
      return state
  }
}
