import { put, call, select, all, fork } from 'redux-saga/effects'
import { NetInfo } from 'react-native'
import AccessAbility from '../Redux/AccessAbilityRedux'
import Sync from '../Services/Sync'


export function *checkConnectivity(action) {
  const isConnected = yield call(NetInfo.isConnected.fetch)
  yield put(AccessAbility.networkConnectivity(isConnected))

  if (isConnected) {
    Sync.start()
  }
}
