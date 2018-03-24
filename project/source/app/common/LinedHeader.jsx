// @flow

import React from 'react'
import classnames from 'classnames'

import styles from 'styles/common/_lined-header.scss'

type Props = {
  children?: React$Node
}

export class LinedHeader extends React.Component<*>{
  render = (): React$Element<*> => (
    <div className={classnames('lined-header')}><h3><span>{this.props.children}</span></h3></div>
  )
}
