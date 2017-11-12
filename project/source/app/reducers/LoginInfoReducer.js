// @flow

import {type Action, ActionTypes} from 'app/actions/LoginInfoAction'
import {type State} from 'app/state/LoginInfoState'

const initialState = {
  name: null,
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.set: {
      return Object.assign({}, state, {name: action.name})
    }
    default:
      return state
  }
}
