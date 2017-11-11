// @flow

import React from 'react'
import PlayCircle from 'react-icons/lib/md/play-circle-outline'
import FaEllipsisV from 'react-icons/lib/fa/ellipsis-v'
import PlusCircle from 'react-icons/lib/fa/plus-circle'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'
import {LessonQuestion} from 'app/teacher/lesson/LessonQuestion'
import classnames from 'classnames'

import styles from 'styles/teacher/lesson/lesson.scss'

export class Lesson extends React.Component<*>{

  render = (): React$Element<*> => (
    <div className={classnames('lesson')}>
      <div className={classnames('top-bar')}>
        <h1>Start Live Session <PlayCircle /></h1>
        <h1><FaEllipsisV /></h1>
      </div>
      <div className={classnames('nav-bar')}>
        <h2><ArrowLeft /> U.S. History Dates</h2>
        <h2>1 Question <PlusCircle /></h2>
      </div>
      <LessonQuestion />
    </div>
  )
}
