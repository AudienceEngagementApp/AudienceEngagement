// @flow

import React from 'react'
import {AnswerBox} from 'app/teacher/question/AnswerBox'
import _ from 'underscore'
import {Error} from 'app/common/Error'
import {TextArea} from 'app/common/TextArea'
import {TextInput} from 'app/common/TextInput'

import styles from 'styles/teacher/question/_new-mc-question.scss'

type Props = {
  question: string,
  answerChoices?: (Array<string> | Object),
  correctAnswer: string,
  questionEditable: boolean,
  answersEditable: boolean,
}

type State = {
  question: string,
  correctAnswer: string,
  answerChoices?: (Array<string> | Object),
}

export class Question extends React.Component<Props, State> {
  static defaultProps = {
    answerChoices: [],
    correctAnswer: ''
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      question: props.question,
      correctAnswer: props.correctAnswer,
      answerChoices: props.answerChoices
    }
  }

  onSubmit = (props: Object): void => {
  }

  render = (): React$Element<*> => {
    const answerElements = this.getAnswerElements(this.state.answerChoices)
    if (answerElements) {
      return (
        <div className='question'>
          <div className='top-border'>
            <h3>Multiple Choice Question</h3>
            <button className='exit'>X</button>
          </div>
          <div className='question-textarea'>
            <TextArea
              type='text'
              placeholder='Ask your question here...'
              value={this.state.question}
              textChanged={this.questionChanged}
            />
          </div>
          <div className='answer-choices'>
            {answerElements}
          </div>
          <div className='bottom-border'>
            <span className='correct-answer'>
              <label>Correct Answer:</label>
              <TextInput className='correct-answer-box' placeholder='Type Letter' value={this.state.correctAnswer} textChanged={this.correctChanged}/>
            </span>
            <button type='submit' className='back-btn' onClick={this.saveAndBack}><b>SAVE TO LESSON</b></button>
          </div>
        </div>
      )
    } else {
      return <Error message='Incorrect format of answers' />
    }
  }

  questionChanged = (newText: string) => {
    this.setState({question: newText})
  }

  correctChanged = (newText: string) => {
    this.setState({correctAnswer: newText})
  }

  saveAndBack = (): void => {
  }

  answerChanged = (answerKey: string | number, newText: string) => {
    if (this.state.answerChoices) {
      const answerChoices = this.state.answerChoices
      if (answerChoices && (answerChoices.length || answerChoices.length === 0) && typeof answerKey == 'number') {
        const answersNonNull: Array<string> = _.values(answerChoices)
        answersNonNull[answerKey] = newText
        this.setState({answerChoices: answersNonNull})
      } else if (answerChoices && typeof answerKey == 'string') {
        const answersNonNull: Object = _.object(_.filter(_.map(answerChoices, (value, key) => [key, value]), value => value[0] && typeof value[1] == 'string'))
        answersNonNull[answerKey] = newText
        this.setState({answerChoices: answersNonNull})
      }
    }
  }

  getAnswerElements = (answerChoices: ?(Array<string> | Object)): ?Array<React$Node> => {
    if (answerChoices && (answerChoices.length || answerChoices.length === 0)) {
      const answersNonNull: Array<string> = _.values(answerChoices)
      const answerElements: Array<React$Node> = answersNonNull.map((questionKey: string) => (
        <AnswerBox
          key={answersNonNull.indexOf(questionKey)}
          styleClass={answersNonNull.indexOf(questionKey) % 4}
          answer={questionKey}
          editable={true}
          textChanged={(newText) => this.answerChanged(questionKey, newText)}
        />))
      return answerElements
    } else if (answerChoices) {
      const answersNonNull: Object = _.object(_.filter(_.map(answerChoices, (value, key) => [key, value]), value => value[0] && typeof value[1] == 'string'))
      const answerElements: Array<React$Node> = _.keys(answersNonNull).map((questionKey: string) => (
        <AnswerBox
          key={_.keys(answersNonNull).indexOf(questionKey)}
          letter={questionKey}
          answer={answersNonNull[questionKey]}
          styleClass={_.keys(answersNonNull).indexOf(questionKey) % 4}
          editable={true}
          textChanged={(newText) => this.answerChanged(questionKey, newText)}
        />))
      return answerElements
    } else {
      return null
    }
  }
}
