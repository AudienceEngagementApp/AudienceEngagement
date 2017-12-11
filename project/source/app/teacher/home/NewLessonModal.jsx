// @flow

import React from 'react'
import {compose} from 'redux'
import {TextInput} from 'app/common/TextInput'
import Modal from 'react-modal'

type StateProps = {
  newLesson: (name: string) => void
}

type State = {
  newLessonName: string
}

type Props = StateProps

export class NewLessonModal extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props)
    this.state = {newLessonName: ''};
  }

  render = (): React$Element<*> => (<div><Modal
    isOpen={true}
    contentLabel="New Lesson"
    ariaHideApp={false}
  >
    <TextInput
      type="text"
      placeholder='Title of Lesson'
      value={this.state.newLessonName}
      textChanged={this.lessonNameChanged}
      onEnter={this.newLesson}
    />
    <button onClick={this.newLesson}>Submit</button>
  </Modal></div>)

  newLesson = (): void => {
    this.props.newLesson(this.state.newLessonName)
  }

  lessonNameChanged = (newName: string): void => {
    this.setState({newLessonName: newName})
  }
}
