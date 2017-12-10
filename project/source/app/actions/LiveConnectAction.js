// @flow

import type {Dispatch} from 'redux';


export const ActionTypes = {
  set: 'SET',
}

export type ActionType = $Keys<typeof ActionTypes>

export type Action = {
  data: {
    hasSeenConnectScreen: boolean,
  },
  type: ActionType,
}

export const getSetSeenConnectCommand = (dispatch: Dispatch, ownProps: Object): (boolean => void) => {
  return (hasSeenConnectScreen: boolean) => dispatch({
    type: ActionTypes.set,
    data: {
      hasSeenConnectScreen: hasSeenConnectScreen
    }
  })
}
