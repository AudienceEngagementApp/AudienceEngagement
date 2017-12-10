// @flow

import uuidv4 from 'uuid/v4'
import {type Dispatch} from 'redux'

export const getAddSessionCommand = (dispatch: Dispatch, ownProps: Object): (?string => string) => {
  return (lessonId: ?string): string => {
    const sessionId = uuidv4()
    const makeId = (): string => {
      const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
      const map = Array.prototype.map
      return map.call('***-***', (char: string): string => {
        if (char.charAt(0) == '*') {
          return possible.charAt(Math.floor(Math.random() * possible.length))
        } else {
          return char.charAt(0)
        }
      }).join('')
    }
    const pin = makeId()
    ownProps.firebase.push(`sessions/${sessionId}`, Object.assign({}, lessonId? {lesson: lessonId} : {}, {state: 2}))
    ownProps.firebase.push(`pins/${pin}`, {session: sessionId})
    return sessionId
  }
}

export const getSetStateCommand = (dispatch: Dispatch, ownProps: Object): (number => void) => {
  return (state: number): void => {
    if (state >= 0) {
      ownProps.firebase.set(`sessions/${ownProps.sessionId}/state`, state)
    }
  }
}

export const getAnswerQuestionCommand = (dispatch: Dispatch, ownProps: Object): ((string, (string | number)) => void) => {
  return (questionId: string, answer: (string | number)): void => {
    console.log(`attempting to answer at path sessions/${ownProps.sessionId}/answers/${questionId}/${ownProps.name} with ${answer.toString()}`)
    ownProps.firebase.set(`sessions/${ownProps.sessionId}/answers/${questionId}/${ownProps.name}`, answer)
  }
}

export const getSetLessonCommand = (dispatch: Dispatch, ownProps: Object): ((string) => void) => {
  return (lessonId: string): void => {
    ownProps.firebase.set(`sessions/${ownProps.sessionId}/lesson`, lessonId)
  }
}

export const getSetQuestionCommand = (dispatch: Dispatch, ownProps: Object): ((string) => void) => {
  return (questionId: string): void => {
    ownProps.firebase.set(`sessions/${ownProps.sessionId}/question`, questionId)
  }
}
