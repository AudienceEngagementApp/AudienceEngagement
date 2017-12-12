// @flow

import React from 'react'
import PlayCircle from 'react-icons/lib/md/play-circle-outline'
import FaEllipsisV from 'react-icons/lib/fa/ellipsis-v'
import PlusCircle from 'react-icons/lib/fa/plus-circle'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'
import {LessonQuestion} from 'app/teacher/lesson/LessonQuestion'
import classnames from 'classnames'
import {lessonConnect} from 'app/common/connectors/LessonConnect'
import {compose, type Dispatch} from 'redux'
import {Dropdown} from 'app/common/Dropdown'
import {withRouter} from 'react-router'
import _ from 'underscore'
import {Error} from 'app/common/Error'
import {getAddSessionCommand} from 'app/actions/SessionAction'
import {type StoreState} from 'app/state/index'
import {connect} from 'react-redux'

import styles from 'styles/teacher/lesson/_lesson.scss'

type OwnProps = {
  lesson: Object,
  lessonId: string,
  addQuestion: (question: string, type: number, answers: ?Array<string> | Object) => string,
  removeQuestion: (questionId: string) => void,
  removeLesson: (lessonId: string) => void,
  history: Object
}

type StateProps = {
}

type DispatchProps = {
  addSession: (lessonId: ?string) => string
}

type Props = OwnProps & StateProps & DispatchProps

type State = {
  lessonMenuClicked: boolean,
  addQuestionClicked: boolean,
}

const QuestionTypes = {
  multipleChoice: 'multipleChoice',
  trueFalse: 'trueFalse',
  freeResponse: 'freeResponse',
}

type QuestionType = $Keys<typeof QuestionTypes>

const questionTypeToNumber = (type: QuestionType): number => {
  switch(type) {
    case QuestionTypes.multipleChoice:
      return 0
    case QuestionTypes.trueFalse:
      return 1
    case QuestionTypes.freeResponse:
      return 2
    default:
      return -1
  }
}

class Lesson extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props)
    this.state = {
      lessonMenuClicked: false,
      addQuestionClicked: false,
    }
    this.lessonMenuClicked = this.lessonMenuClicked.bind(this);
    this.addQuestionClicked = this.addQuestionClicked.bind(this);
  }

  render = (): React$Element<*> => {
    if (this.props.lesson) {
      const questionElements: Array<React$Node> = _.keys(this.props.lesson.questions).map((questionId: string) =>
        <LessonQuestion
          key={questionId}
          onClick={() => this.editQuestion(questionId)}
          onRemove={() => this.removeQuestion(questionId)}
          onCopy={() => this.copyQuestion(questionId)}
          question={this.props.lesson.questions[questionId]}
      />)
      return (
        <div className={classnames('lesson')} onClick={this.clearDropdowns}>
          <span className={classnames('dynamic-justify')} >
            <div className={classnames('top-bar')}>
              <h1>
                <span className={classnames('dynamic-show')}>Start Live Session</span>
                <PlayCircle onClick={this.liveSessionPressed}/>
              </h1>
              <Dropdown anchor={
                <h1 onClick={this.lessonMenuClicked} >
                  <FaEllipsisV />
                </h1>
              } active={this.state.lessonMenuClicked} >
                <h2 onClick={this.lessonDeleted}>Delete</h2>
              </Dropdown>
            </div>
          </span>
          <span className={classnames('dynamic-justify')} >
            <div className={classnames('nav-bar')}>
              <h2>
                <ArrowLeft onClick={this.backPressed}/>
                <span className={classnames('dynamic-show')}>{this.props.lesson.name}</span>
              </h2>
              <Dropdown anchor={
                <h2>
                  <span className={classnames('dynamic-show')}>
                    {questionElements.length} {'Question' + (questionElements.length > 1 ? 's' : '')}
                  </span>
                  <PlusCircle onClick={this.addQuestionClicked} />
                </h2>
              } active={this.state.addQuestionClicked} >
                <h2 onClick={() => this.addQuestion(QuestionTypes.multipleChoice)} >Multiple Choice</h2>
                <h2 onClick={() => this.addQuestion(QuestionTypes.trueFalse)} >True / False</h2>
                <h2 onClick={() => this.addQuestion(QuestionTypes.freeResponse)} >Free Response</h2>
              </Dropdown>
            </div>
          </span>
          {questionElements}
        </div>
      )
    } else {
      return <Error message='Could not find lesson' />
    }
  }

  addQuestion = (type: QuestionType): void => {
    const numType: number = questionTypeToNumber(type)
    if (numType != -1) {
      this.props.addQuestion('New question', numType)
    }
  }

  removeQuestion = (questionId: string): void => {
    this.props.removeQuestion(questionId)
  }

  copyQuestion = (questionId: string): void => {
    const question: Object = this.props.lesson.questions[questionId]
    this.props.addQuestion(question.question, question.type, _.values(question.answers))
  }

  backPressed = (): void => {
    this.props.history.goBack()
  }

  lessonDeleted = (): void => {
    this.props.removeLesson(this.props.lessonId)
    this.props.history.goBack()
  }

  liveSessionPressed = (): void => {
    this.props.history.push(`/teacher/live/${this.props.addSession(this.props.lessonId)}`)
  }

  editQuestion = (questionId: string): void => {
    this.props.history.push(`/teacher/lesson/${this.props.lessonId}/question/${questionId}`)
  }

  clearDropdowns = (): void => {
    if (this.state.lessonMenuClicked || this.state.addQuestionClicked) {
      this.setState({
        lessonMenuClicked: false,
        addQuestionClicked: false
      })
    }
  }

  lessonMenuClicked = (): void => {
    this.setState({
      lessonMenuClicked: !this.state.lessonMenuClicked,
      addQuestionClicked: false
    })
  }

  addQuestionClicked = (): void => {
    this.setState({
      lessonMenuClicked: false,
      addQuestionClicked: !this.state.addQuestionClicked
    })
  }
}

const mapStateToProps = (storeState: StoreState, ownProps: OwnProps): OwnProps & StateProps => ownProps
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  addSession: getAddSessionCommand(dispatch, ownProps)
})

const composedComponent = compose(
  withRouter,
  lessonConnect,
  connect(mapStateToProps, mapDispatchToProps),
)(Lesson)

export { composedComponent as Lesson }
