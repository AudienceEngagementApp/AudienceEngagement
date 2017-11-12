// @flow

import type {Dispatch} from 'redux';


export const ActionTypes = {
  set: 'SET',
}

export type ActionType = $Keys<typeof ActionTypes>

export type Action = {
  name: string,
  type: ActionType,
}

export const setName = (name: string) => ({
  type: ActionTypes.set,
  name: name,
});
