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
  onClick?: () => void,
  textChanged: (string) => void,
}

export class AnswerBox extends React.Component<Props> {
  render = (): React$Element<*> => {
    const {styleClass, letter, answer, editable, onClick, ...rest} = this.props
    const optionLabel = (styleClass === 0) ? '+' : letter
    return (
      <div
        className={classnames((editable || styleClass === 0) ? 'answer-text-box' : 'answer-box', `answer-${styleClass}`)}
        onClick={onClick}
      >
        {optionLabel ? <div className={classnames('option-label')}>
          <label>{optionLabel}</label>
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
