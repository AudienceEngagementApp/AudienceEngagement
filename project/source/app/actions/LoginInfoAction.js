// @flow

import type {Dispatch} from 'redux';


export const ActionTypes = {
  set: 'SET',
}

export type ActionType = $Keys<typeof ActionTypes>

export type Action = {
  data: {
    name: string,
    sessionId: string
  },
  type: ActionType,
}

export const getSetNameCommand = (dispatch: Dispatch, ownProps: Object): (string => void) => {
  return (name: string) => dispatch({
    type: ActionTypes.set,
    data: {
      name: name
    }
  })
}

export const getSetSessionIdCommand = (dispatch: Dispatch, ownProps: Object): (string => void) => {
  return (sessionId: string) => dispatch({
    type: ActionTypes.set,
    data: {
      sessionId: sessionId
    }
  })
}


export const getSetLoginInfoCommand = (dispatch: Dispatch, ownProps: Object): ((string, string) => void) => {
  return (name: string, sessionId: string) => dispatch({
    type: ActionTypes.set,
    data: {
      name: name,
      sessionId: sessionId
    }
  })
}
