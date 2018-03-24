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

export const getSetQuestionCommand = (dispatch: Dispatch, ownProps: Object): ((string, string, number, ?Array<string> | Object, ?string | number) => string) => {
  return (questionId: string, question: string, type: number, answers: ?Array<string> | Object, correct: ?string | number): string => {
    if (type == 0) {
      if (answers) {
        const answersNonNull: Array<string> | Object = answers
        if (answersNonNull.length) {
          const alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          const answerElements: Object = _.object(_.range(answersNonNull.length).map((answerIter: number) => [alphabet.charAt(answerIter), answersNonNull[answerIter]]))
          ownProps.firebase.set(`lessons/${ownProps.lessonId}/questions/${questionId}`, {question: question, type: type, answers: answerElements, correct: correct})
        } else if (answersNonNull.length !== 0) {
          const answerObject: Object = _.object(_.map(answersNonNull, (value, key) => [key, value]))
          if (_.every(_.keys(answerObject), (key: string): boolean => (key.length == 1 && key.charAt(0) != key.charAt(0).toLowerCase() && typeof answerObject[key] == 'string'))) {
            ownProps.firebase.set(`lessons/${ownProps.lessonId}/questions/${questionId}`, {question: question, type: type, answers: answerObject, correct: correct})
          } else {
            console.log('Incorrect parameters passed to add-question command')
          }
        } else {
          console.log(`Answers formatted incorrectly: ${answersNonNull.toString()}`)
        }
      } else {
        ownProps.firebase.set(`lessons/${ownProps.lessonId}/questions/${questionId}`, {question: question, type: type})
      }
    } else if (type == 1) {
      // I am so sorry
      const correctAnswer = (typeof correct == 'number') ? correct : ((typeof correct == 'string') ? ((correct == 'False') ? 0 : 1) : 1)
      ownProps.firebase.set(`lessons/${ownProps.lessonId}/questions/${questionId}`, {question: question, type: type, correct: correctAnswer})
    } else {
      ownProps.firebase.set(`lessons/${ownProps.lessonId}/questions/${questionId}`, {question: question, type: type})
    }
    return questionId
  }
}

export const getAddQuestionCommand = (dispatch: Dispatch, ownProps: Object): ((string, number, ?Array<string> | Object, ?string | number) => string) => {
  return (question: string, type: number, answers: ?Array<string> | Object, correct: ?string | number): string => {
    const questionId = uuidv4()
    return getSetQuestionCommand(dispatch, ownProps)(questionId, question, type, answers, correct)
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
