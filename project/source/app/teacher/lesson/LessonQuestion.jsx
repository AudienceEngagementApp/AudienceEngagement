// @flow

import React from 'react'
import Folder from 'react-icons/lib/fa/folder'
import MC from 'react-icons/lib/fa/server'
import Copy from 'react-icons/lib/md/content-copy'
import Delete from 'react-icons/lib/md/delete'
import classnames from 'classnames'

export class LessonQuestion extends React.Component<*>{

  render = (): React$Element<*> => (
    <div className={classnames('question')}>
      <h3><MC /> What year was the declaration of independence signed?</h3>
      <h3><Folder /><Copy /><Delete /></h3>
    </div>
  )
}
