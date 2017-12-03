// @flow

import React from 'react'

type Props = {
  message?: string
}

export class Error extends React.Component<*>{
  render = (): React$Element<*> => (<div>
    <h2>An Error Occurred</h2>
    {(this.props.message) ? (<p>{this.props.message}</p>) : null}
  </div>)
}
