// @flow

import React from 'react'
import {AnswerBox} from 'app/teacher/question/AnswerBox'
import _ from 'underscore'
import {Error} from 'app/common/Error'
import {TextArea} from 'app/common/TextArea'
import {TextInput} from 'app/common/TextInput'
import classnames from 'classnames'

import styles from 'styles/teacher/question/_live-question.scss'

type Props = {
  question: string,
  answerChoices?: (Array<string> | Object),
  correctAnswer: string,
  onFinish: void => null,
  state: number,
  responses: Array<string>,
  pin: string,
  setState: (state: number) => void,
}

export class LiveQuestionDelegate extends React.Component<Props> {
  static defaultProps = {
    answerChoices: [],
    correctAnswer: '',
    responses: 0,
    state: 0,
  }

  render = (): React$Element<*> => {
    const answerElements: Array<React$Node> = this.getAnswerElements(this.props.answerChoices)
    if (answerElements) {
      return (
        <div className='live-question'>
          <div className={classnames('top-bar')}>
            <h1>
              <span className={classnames('dynamic-show-live-question')}>
                Join at <b>{window.location.hostname + (window.location.port != 80 ? `:${window.location.port}` : '') + '/#/student'}</b> /
              </span> Session PIN: <b>{this.props.pin}</b>
            </h1>
          </div>
          {(this.props.state != 1) ? (<div className={classnames('question-asking')}>
            <div className='question-prompt'>
              {this.props.question}
            </div>
            <div className='answer-choices'>
              {answerElements}
            </div>
            <div className='response-bar'>
              <div className='responses'>{this.props.responses.length} Responses Recieved</div>
              <div className='submit' onClick={() => this.props.setState(1)}>END POLL</div>
            </div>
            <div className='bottom-border'>
              <h2>Answer on your device</h2>
            </div>
          </div>) : (<div className={classnames('question-finished')}>
            <div className={classnames('background-drop')}></div>
            <h1>The results are in!</h1>
            {this.props.correctAnswer ? <div>
              <h2>The correct Answer was {this.props.correctAnswer}</h2>
              <div className='answer-choices'>
                {answerElements}
              </div>
            </div> : <div>
              <h2>Here's some of the answers:</h2>
              <div className={classnames('free-responses')}>
                <ul>
                  {this.props.responses.map((response, key) => <li key={key}>{`\"${response}\"`}</li>)}
                </ul>
              </div>
            </div>}
            <div className='button-row'>
              <button type='submit' className='next-btn' onClick={this.props.onFinish}><b>NEXT</b></button>
            </div>
          </div>)}
        </div>
      )
    } else {
      return <Error message='Incorrect format of answers' />
    }
  }

  getAnswerElements = (answerChoices: ?(Array<string> | Object)): Array<React$Node> => {
    if (answerChoices && (answerChoices.length || answerChoices.length === 0)) {
      const answersNonNull: Array<string> = _.values(answerChoices)
      const answerElements: Array<React$Node> = answersNonNull.map((questionKey: string) => {
        const percentThatGuessedThis = `${Math.floor((this.props.responses.length ? this.props.responses.filter(
          (response) => response == questionKey || (questionKey == 'T' && parseInt(response) == 1) || (questionKey == 'F' && parseInt(response) == 0)
        ).length / this.props.responses.length : 0) * 100)}%`
        console.log(this.props.correctAnswer)
        return <AnswerBox
          key={answersNonNull.indexOf(questionKey)}
          styleClass={(this.props.state == 1 && this.props.correctAnswer != questionKey && (questionKey != 'T' || this.props.correctAnswer != 'True') && (questionKey != 'F' || this.props.correctAnswer != 'False')) ? 0 : answersNonNull.indexOf(questionKey) % 4 + 1}
          answer={questionKey}
          editable={false}
          textChanged={(newText) => {}}
          onClick={()=>{}}
          answerPercentage={this.props.state == 1 ? percentThatGuessedThis : null}
        />
      })
      return answerElements
    } else if (answerChoices) {
      const answersNonNull: Object = _.object(_.filter(_.map(answerChoices, (value, key) => [key, value]), value => value[0] && typeof value[1] == 'string'))
      const answerElements: Array<React$Node> = _.keys(answersNonNull).map((questionKey: string) => {
        const percentThatGuessedThis = `${Math.floor((this.props.responses.length ? this.props.responses.filter(
            (response) => response == questionKey || (questionKey == 'T' && parseInt(response) == 1) || (questionKey == 'F' && parseInt(response) == 0)
          ).length / this.props.responses.length : 0) * 100)}%`
        console.log(this.props.correctAnswer)
        return <AnswerBox
          key={_.keys(answersNonNull).indexOf(questionKey)}
          letter={questionKey}
          answer={answersNonNull[questionKey]}
          answerPercentage={this.props.state == 1 ? percentThatGuessedThis : null}
          styleClass={(this.props.state == 1 && this.props.correctAnswer != questionKey && (questionKey != 'T' || this.props.correctAnswer != 'True') && (questionKey != 'F' || this.props.correctAnswer != 'False')) ? 0 : _.keys(answersNonNull).indexOf(questionKey) % 4 + 1}
          editable={false}
          textChanged={(newText) => {}}
        />
      })
      return answerElements
    } else {
      return []
    }
  }
}
