// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import _ from 'underscore'

type Props = {
  answers: Object,
  question: Object
}

export class Results extends React.Component<*>{
  render = (): React$Element<*> => {
    if (this.props.question) {
      if (this.props.question.type == 0 || this.props.question.type == 1) {
        const allAnswers: Array<string> = _.values(this.props.answers)
        const groups = _.groupBy(allAnswers, (answer: string) => answer)
        const answerElements = this.props.question.type == 0 ?
          _.keys(groups).map((group: string) => <li>{group} : {groups[group].length / allAnswers.length}</li>) :
          _.keys(groups).map((group: string) => <li>{group == '1' ? 'true' : 'false'} : {groups[group].length / allAnswers.length}</li>)
        return <ul>{answerElements}</ul>
      } else if (this.props.question.type == 2) {
        const answerElements = _.keys(this.props.answers).map((user: string) => <li>{user} : {this.props.answers[user]} </li>)
        return <ul>{answerElements}</ul>
      } else {
        return <Error message='Incorrect question type' />
      }
    } else {
      return <Error message='Question not found' />
    }
  }
}
