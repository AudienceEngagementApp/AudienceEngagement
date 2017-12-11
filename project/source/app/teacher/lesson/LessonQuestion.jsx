// @flow

import React from 'react'
import Folder from 'react-icons/lib/fa/folder'
import Copy from 'react-icons/lib/md/content-copy'
import Delete from 'react-icons/lib/md/delete'
import classnames from 'classnames'

type Props = {
  question: Object,
  onClick: () => void,
  onRemove: () => void,
  onCopy: () => void,
}

export class LessonQuestion extends React.Component<Props>{

  render = (): React$Element<*> => {
    const image: React$Node = getImageFromType(this.props.question.type)
    return (<div className={classnames('question')}>
        <div className={classnames('left')} onClick={this.props.onClick}>{image}<h3>{this.props.question.question}</h3></div>
        <div className={classnames('right')}><h3><Copy onClick={this.props.onCopy} /><Delete onClick={this.props.onRemove} /></h3></div>
      </div>
    )
  }
}

const getImageFromType = (type: number): React$Node => {
  if (type == 0) {
    return <img src={require('assets/multipleChoiceCircle.png')} />
  } else if (type == 1) {
    return <img src={require('assets/trueFalseCircle.png')} />
  } else if (type == 2) {
    return <img src={require('assets/shortAnswerCircle.png')} />
  } else {
    return null
  }
}
