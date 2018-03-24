// @flow

import React from 'react'
import {compose} from 'redux'
import {TextInput} from 'app/common/TextInput'
import Modal from 'react-modal'
import classnames from 'classnames'

import styles from 'styles/teacher/home/_new-lesson.scss'

type StateProps = {
  newLesson: (name: string) => void
}

type State = {
  newLessonName: string
}

type Props = StateProps

const customStyles = {
  content: {
    bottom: 'unset',
  }
};

export class NewLessonModal extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props)
    this.state = {newLessonName: ''};
  }

  render = (): React$Element<*> => (<Modal
    isOpen={true}
    contentLabel="New Lesson"
    ariaHideApp={false}
    style={customStyles}
  >
    <div className={classnames('modal-header')}></div>
    <div className={classnames('modal-content')}>
      <h1>New Lesson</h1>
      <TextInput
        type="text"
        placeholder='Title of Lesson'
        value={this.state.newLessonName}
        textChanged={this.lessonNameChanged}
        onEnter={this.newLesson}
      />
      <div
        onClick={this.newLesson}
        className={classnames('new-lesson-button', {'button-active': this.state.newLessonName})}
      >
        CREATE LESSON
      </div>

    </div>
  </Modal>)

  newLesson = (): void => {
    if (this.state.newLessonName) {
      this.props.newLesson(this.state.newLessonName)
    }
  }

  lessonNameChanged = (newName: string): void => {
    this.setState({newLessonName: newName})
  }
}
