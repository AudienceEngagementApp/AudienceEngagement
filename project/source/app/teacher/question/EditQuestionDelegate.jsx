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
  noCorrectAnswer: boolean,
  setQuestion?: (question: string, answers: ?Array<string> | Object, correct: ?string | number) => string,
  onFinish: () => void
}

type State = {
  question: string,
  correctAnswer: string,
  answerChoices?: (Array<string> | Object),
}

export class EditQuestionDelegate extends React.Component<Props, State> {
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

  render = (): React$Element<*> => {
    const answerElements: Array<React$Node> = this.getAnswerElements(this.state.answerChoices)
    const answerElementsWithNewOption = (this.props.answersEditable && answerElements.length < 26) ?
      answerElements.concat(<AnswerBox
        key={'New'}
        styleClass={0}
        answer={'Add New Answer'}
        editable={false}
        textChanged={(newText) => {}}
        onClick={() => this.answerAdded()}
        letter={'+'}
      />) : answerElements
    if (answerElements) {
      return (
        <div className='question'>
          <div className='top-border'>
            <h3>Multiple Choice Question</h3>
            <button className='exit' onClick={this.props.onFinish}>X</button>
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
            {answerElementsWithNewOption}
          </div>
          <div className='bottom-border'>
            {this.props.noCorrectAnswer ?
              <span className='correct-answer'>
                <label>No Correct Answer</label>
              </span> :
              <span className='correct-answer'>
                <label>Correct Answer:</label>
                <TextInput className='correct-answer-box' placeholder='Type Letter' value={this.state.correctAnswer} textChanged={this.correctChanged}/>
              </span>
            }
            <button type='submit' className='back-btn' onClick={this.saveAndBack}><b>SUBMIT</b></button>
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
    if (this.props.questionEditable && this.props.setQuestion) {
      this.props.setQuestion(this.state.question, this.state.answerChoices, this.state.correctAnswer)
      this.props.onFinish()
    } else if (this.props.questionEditable) {
      console.log('Encountered error')
    } else {
      this.props.onFinish()
    }
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

  answerAdded = () => {
    if (this.state.answerChoices) {
      const answerChoices = this.state.answerChoices
      if (answerChoices && (answerChoices.length || answerChoices.length === 0)) {
        this.setState({answerChoices: {'A': ''}})
      } else if (answerChoices && answerChoices.length) {
        const answersNonNull: Array<string> = _.values(answerChoices)
        this.setState({answerChoices: answersNonNull.concat('')})
      } else if (answerChoices) {
        const answersNonNull: Object = _.object(_.filter(_.map(answerChoices, (value, key) => [key, value]), value => value[0] && typeof value[1] == 'string'))
        const newKey = _.range(0, 26).map((charIndex) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(charIndex)).find((char) => !(char in answersNonNull))
        answersNonNull[newKey] = ''
        this.setState({answerChoices: answersNonNull})
      }
    } else {
      this.setState({answerChoices: {'A': ''}})
    }
  }

  getAnswerElements = (answerChoices: ?(Array<string> | Object)): Array<React$Node> => {
    if (answerChoices && (answerChoices.length || answerChoices.length === 0)) {
      const answersNonNull: Array<string> = _.values(answerChoices)
      const answerElements: Array<React$Node> = answersNonNull.map((questionKey: string) => (
        <AnswerBox
          key={answersNonNull.indexOf(questionKey)}
          styleClass={answersNonNull.indexOf(questionKey) % 4 + 1}
          answer={questionKey}
          editable={true}
          textChanged={(newText) => this.answerChanged(questionKey, newText)}
          onClick={()=>{}}
        />))
      return answerElements
    } else if (answerChoices) {
      const answersNonNull: Object = _.object(_.filter(_.map(answerChoices, (value, key) => [key, value]), value => value[0] && typeof value[1] == 'string'))
      const answerElements: Array<React$Node> = _.keys(answersNonNull).map((questionKey: string) => (
        <AnswerBox
          key={_.keys(answersNonNull).indexOf(questionKey)}
          letter={questionKey}
          answer={answersNonNull[questionKey]}
          styleClass={_.keys(answersNonNull).indexOf(questionKey) % 4 + 1}
          editable={true}
          textChanged={(newText) => this.answerChanged(questionKey, newText)}
        />))
      return answerElements
    } else {
      return []
    }
  }
}
