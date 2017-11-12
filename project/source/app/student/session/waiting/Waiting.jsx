// @flow

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

type Props = {
  title: string,
  text: string
}

export class Waiting extends React.Component<*>{

  render = (): React$Element<*> => (
    <div>
      <h1>{this.props.title}</h1>
      <p>{this.props.text}</p>
    </div>
  )
}
