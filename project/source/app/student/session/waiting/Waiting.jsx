// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

type Props = {
  title: string,
  text: string,
  className: *
}

export class Waiting extends React.Component<*>{

  render = (): React$Element<*> => (
    <div className={this.props.className ? this.props.className : 'waiting'}>
      <h1>{this.props.title}</h1>
      <p>{this.props.text}</p>
    </div>
  )
}
