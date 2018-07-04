import { put, call } from 'redux-saga/effects'
import NinixAction from '../Redux/NinixRedux'


export function *getInformation(action) {
  const { payload } = action
  const information = yield call([payload.ninix, payload.ninix.getInformation])
  console.tron.log({information})
  yield put(NinixAction.setInformation({...information, device: payload.device}))
}
