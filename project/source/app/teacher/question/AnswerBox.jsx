// @flow

import React from 'react'
import classnames from 'classnames'
import {TextInput} from 'app/common/TextInput'

import styles from 'styles/teacher/question/_teacher-answer.scss'

type Props = {
  styleClass: number,
  letter?: string,
  answer: string,
  answerPercentage?: ?string,
  editable: boolean,
  onClick?: () => void,
  textChanged: (string) => void,
}

export class AnswerBox extends React.Component<Props> {
  render = (): React$Element<*> => {
    const {styleClass, letter, answer, editable, onClick, answerPercentage, ...rest} = this.props
    return (
      <div
        className={classnames((editable || styleClass === 0) ? 'answer-text-box' : 'answer-box', `answer-${styleClass}`)}
        onClick={onClick}
      >
        <div className={'optional-overlay'} >
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
          (answerPercentage ? <label className={classnames('answer-form')}>
            <span className='left-span'>{answer}</span>
            <span className='right-span'>{answerPercentage}</span>
          </label>
        : <label className={classnames('answer-form')}>{answer}</label>) }
      </div>
    </div>
    )
  }
}
