// @flow

import React from 'react'
import classnames from 'classnames'

import styles from 'styles/common/_dropdown.scss'

type Props = {
  active: boolean,
  anchor: React$Node,
  children?: React$Node
}

export class Dropdown extends React.Component<Props>{
  render = (): React$Element<*> => (<div className={classnames('dropdown', {'dropdown-active': this.props.active})}>
    {this.props.anchor}
    <div className={classnames('dropdown-content')}>
      {this.props.children}
    </div>
  </div>)
}
