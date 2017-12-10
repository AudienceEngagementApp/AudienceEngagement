import {State as LoginInfoState} from 'app/state/LoginInfoState'
import {State as LiveConnectState} from 'app/state/LiveConnectState'

export type StoreState = {
  loginInfo: LoginInfoState,
  liveConnect: LiveConnectState,
  firebase: Object,
}
