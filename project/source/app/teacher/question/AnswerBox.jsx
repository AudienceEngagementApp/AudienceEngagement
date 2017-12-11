// @flow

import React from 'react'
import classnames from 'classnames'
import {TextInput} from 'app/common/TextInput'

import styles from 'styles/teacher/question/_teacher-answer.scss'

type Props = {
  styleClass: number,
  letter?: string,
  answer: string,
  editable: boolean,
  textChanged: (string) => void,
}

export class AnswerBox extends React.Component<Props> {
  render = (): React$Element<*> => {
    const {styleClass, letter, answer, editable, ...rest} = this.props
    return (
      <div className={classnames(editable ? 'answer-text-box' : 'answer-box', `answer-${styleClass}`)}>
        {letter ? <div className={classnames('option-label')}>
          <label>{letter}</label>
        </div> : null}
        {editable ?
        <TextInput
          className={classnames('answer-form')}
          placeholder='Type answer'
          value={answer}
          {...rest}
        /> :
        <label className={classnames('answer-form')}>{answer}</label>}
      </div>
    )
  }
}
