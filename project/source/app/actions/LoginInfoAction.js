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

export const setName = (name: string) => ({
  type: ActionTypes.set,
  data: {
    name: name
  }
})

export const setSessionId = (sessionId: string) => ({
  type: ActionTypes.set,
  data: {
    sessionId: sessionId
  }
})


export const setLoginInfo = (name: string, sessionId: string) => ({
  type: ActionTypes.set,
  data: {
    name: name,
    sessionId: sessionId
  }
})
