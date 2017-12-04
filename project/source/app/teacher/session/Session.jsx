// @flow

import React from 'react'
import {Error} from 'app/common/Error'

type Props = {
}

export class Session extends React.Component<*>{
  render = (): React$Element<*> => (<div>
    <Error message={`Session under construction`} />
  </div>)
}
