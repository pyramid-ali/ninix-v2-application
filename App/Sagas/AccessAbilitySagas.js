import { put, call } from 'redux-saga/effects'
import { NetInfo } from 'react-native'
import AccessAbility from '../Redux/AccessAbilityRedux'


export function *checkConnectivity(action) {
  const isConnected = yield call(NetInfo.isConnected.fetch)
  yield put(AccessAbility.networkConnectivity(isConnected))
}
