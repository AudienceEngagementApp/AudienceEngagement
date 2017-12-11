// @flow

import uuidv4 from 'uuid/v4'
import {type Dispatch} from 'redux'
import _ from 'underscore'

export const getAddLessonCommand = (dispatch: Dispatch, ownProps: Object): (string => string) => {
  return (name: string): string => {
    const lessonId = uuidv4()
    ownProps.firebase.set(`lessons/${lessonId}`, {name: name, questions: {}})
    return lessonId
  }
}

export const getRemoveLessonCommand = (dispatch: Dispatch, ownProps: Object): (string => void) => {
  return (lessonId: string): void => {
    ownProps.firebase.remove(`lessons/${lessonId}`)
  }
}

export const getAddQuestionCommand = (dispatch: Dispatch, ownProps: Object): ((string, number, ?Array<string> | Object) => string) => {
  return (question: string, type: number, answers: ?Array<string> | Object): string => {
    const questionId = uuidv4()
    if (type == 0) {
      if (answers) {
        const answersNonNull: Array<string> | Object = answers
        if(answersNonNull.length) {
          const alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          const answerElements: Object = _.object(_.range(answersNonNull.length).map((answerIter: number) => [alphabet.charAt(answerIter), answersNonNull[answerIter]]))
          ownProps.firebase.set(`lessons/${ownProps.lessonId}/questions/${questionId}`, {question: question, type: type, answers: answerElements})
        } else if (answersNonNull.length !== 0) {
          const answerObject: Object = _.object(_.map(answersNonNull, (value, key) => [key, value]))
          if (_.every(_.keys(answerObject), (key: string): boolean => (key.length == 1 && key.charAt(0) == key.charAt(0).toLowerCase() && typeof answerObject[key] == 'string'))) {
            ownProps.firebase.set(`lessons/${ownProps.lessonId}/questions/${questionId}`, {question: question, type: type, answers: answerObject})
          } else {
            console.log("Incorrect parameters passed to add-question command")
          }
        }
      } else {
        ownProps.firebase.set(`lessons/${ownProps.lessonId}/questions/${questionId}`, {question: question, type: type, answers: {}})
      }
    } else {
      ownProps.firebase.set(`lessons/${ownProps.lessonId}/questions/${questionId}`, {question: question, type: type})
    }
    return questionId
  }
}

export const getAddQuestionAnswerCommand = (dispatch: Dispatch, ownProps: Object): ((string, string, string) => void) => {
  return (questionId: string, answerLetter: string, answerChoice: string): void => {
    ownProps.firebase.set(`lessons/${ownProps.lessonId}/${questionId}/${answerLetter}`, answerChoice)
  }
}

export const getRemoveQuestionCommand = (dispatch: Dispatch, ownProps: Object): ((string) => void) => {
  return (questionId: string): void => {
    ownProps.firebase.remove(`lessons/${ownProps.lessonId}/questions/${questionId}`)
  }
}
