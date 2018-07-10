import { put, call } from 'redux-saga/effects'
import NinixAction from '../Redux/NinixRedux'
import NinixConnectionAction from '../Redux/NinixConnectionRedux'


export function *getInformation(action) {
  const { payload } = action
  const information = yield call([payload.ninix, payload.ninix.getInformation])
  const data = {...information, serial: 123456789, device: payload.device}
  yield put(NinixAction.setInformation(data))
  yield put(NinixConnectionAction.didConnect(data))
}
