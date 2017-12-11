// @flow

import React from 'react'

import styles from 'styles/common/_big-banner.scss'

type Props = {
  children?: React$Node
}

export class BigBanner extends React.Component<*>{
  render = (): React$Element<*> => (
    <div className="banner-blue">
      {this.props.children}
    </div>
  )
}
