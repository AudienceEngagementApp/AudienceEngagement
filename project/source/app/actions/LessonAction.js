// @flow

import uuidv4 from 'uuid/v4'
import {type Dispatch} from 'redux'

export const getAddLessonCommand = (dispatch: Dispatch, ownProps: Object): (string => string) => {
  return (name: string): string => {
    console.log(uuidv4())
    const lessonId = uuidv4()
    ownProps.firebase.set(`lessons/${lessonId}`, {name: name, questions: {}})
    return lessonId
  }
}

export const getAddQuestionCommand = (dispatch: Dispatch, ownProps: Object): ((string, number) => void) => {
  return (question: string, type: number): void => {
    const questionId = uuidv4()
    if (type == 0) {
      ownProps.firebase.push(`lessons/${ownProps.lessonId}`, {question: question, type: type, answers: {}})
    } else {
      ownProps.firebase.push(`lessons/${ownProps.lessonId}`, {question: question, type: type})
    }
  }
}

export const getAddQuestionAnswerCommand = (dispatch: Dispatch, ownProps: Object): ((string, string, string) => void) => {
  return (questionId: string, answerLetter: string, answerChoice: string): void => {
    ownProps.firebase.push(`lessons/${ownProps.lessonId}/${answerLetter}`, answerChoice)
  }
}
