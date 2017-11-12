// @flow

import React from 'react'

type Props = {
  onEnter?: () => void,
  textChanged: (s: string) => void,
}

export class TextInput extends React.Component<*>{

  render = (): React$Element<*> => {
    const {textChanged, onEnter, ...rest} = this.props
    return (<div>
      <input type="text"
        onChange={this.textEntered}
        onKeyUp={this.props.onEnter ? this.onKeyUp : undefined}
       {...rest}
      />
      {this.props.children}
    </div>)
  }

  textEntered = (event: SyntheticEvent<*>): void => {
    const target = event.target
    if (target instanceof HTMLInputElement) {
      this.props.textChanged(target.value)
    }
  }

  onKeyUp = (event: SyntheticEvent<*>): void => {
    if (event.key == 'Enter') {
      this.props.onEnter && this.props.onEnter()
    }
  }
}
