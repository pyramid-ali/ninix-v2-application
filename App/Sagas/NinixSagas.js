import { put, call } from 'redux-saga/effects'
import NinixAction from '../Redux/NinixRedux'
import NinixLogAction from '../Redux/NinixLogRedux'


export function *getInformation(action) {
  const { payload } = action
  const information = yield call([payload.ninix, payload.ninix.getInformation])
  const data = {...information, serial: 123456789, device: payload.device}
  yield put(NinixAction.setInformation(data))
  yield put(NinixLogAction.didConnect(data))
  yield getErrorLog(payload.ninix, data)
}

export function *getErrorLog(ninix, data) {
  const resp = yield call([ninix, ninix.getErrorLog])
  yield put(NinixLogAction.saveError({body: resp, serial: data.serial}))
}
