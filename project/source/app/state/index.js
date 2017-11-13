import {State as LoginInfoState} from 'app/state/LoginInfoState'

export type StoreState = {
  loginInfo: LoginInfoState,
  firebase: Object,
}
