import { put, select, call } from 'redux-saga/effects'
import NinixConnection from '../Redux/NinixConnectionRedux'
import ModelToJson from '../Transform/ModelToJson'
import Response from '../Services/Response'

export function *didConnect (action) {
  yield put(NinixConnection.syncWithServer())
}

export function *didDisconnect (action) {
  yield put(NinixConnection.syncWithServer())
}

export function *syncWithServer (api, action) {
  const { ninixConnection, auth } = yield select()
  const logs = ninixConnection.logs
  const data = Object.keys(logs).map(key => logs[key]).filter(item => item.serial).map(ModelToJson.connectivityLog)
  const response = yield call(api.sendConnectionLogs, {logs: data}, auth.accessToken)
  try {
    const result = yield call(Response.resolve, response)
    // TODO: we should getting id's from response
    yield put(NinixConnection.didSyncWithServer(Object.keys(logs)))
  }
  catch (e) {
    console.tron.log({log: 'error to sending connection log', error: e.message})
  }
}
