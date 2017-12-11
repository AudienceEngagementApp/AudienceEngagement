// @flow

import React from 'react'

type Props = {
  onEnter?: () => void,
  textChanged: (s: string) => void,
}

export class TextArea extends React.Component<*>{

  render = (): React$Element<*> => {
    const {textChanged, onEnter, ...rest} = this.props
    return (
      <textarea type="text"
        onChange={this.textEntered}
        onKeyUp={this.props.onEnter ? this.onKeyUp : undefined}
       {...rest}
      />
    )
  }

  textEntered = (event: SyntheticEvent<*>): void => {
    console.log("Flag 1")
    const target = event.target
    if (target instanceof HTMLTextAreaElement) {
      this.props.textChanged(target.value)
    }
  }

  onKeyUp = (event: SyntheticEvent<*>): void => {
    if (event.key == 'Enter') {
      this.props.onEnter && this.props.onEnter()
    }
  }
}
