// @flow

import React from 'react'
import {Error} from 'app/common/Error'
import {sessionConnect} from 'app/common/connectors/SessionConnect'
import {compose} from 'redux'
import {SessionNoLesson} from 'app/teacher/session/SessionNoLesson'
import {SessionWithLesson} from 'app/teacher/session/SessionWithLesson'

type Props = {
  session: Object,
  setState: number => void
}

class Session extends React.Component<Props>{
  render = (): React$Element<*> => {
    if (!this.props.session) {
      return (<div>
        <Error message={`Session not found`} />
      </div>)
    } else if (this.props.session.lesson) {
      return <SessionWithLesson lessonId={this.props.session.lesson} {...this.props}/>
    } else {
      return <SessionNoLesson {...this.props} />
    }
  }
}

const composedComponent = compose(
  sessionConnect
)(Session)

export { composedComponent as Session }
