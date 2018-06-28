import { select, call, put } from 'redux-saga/effects'
import ModelToJson from '../Transform/ModelToJson'
import Response from '../Services/Response'
import DeviceLogAction from '../Redux/DeviceLogRedux'

export function *didConnect(api, action) {

  const { deviceLogs, app, auth } = yield select()
  if (app.isConnected) {
    const connect = deviceLogs.connect
    const unSyncedRecords = Object.keys(connect).map(key => connect[key]).filter(item => !item.sync).map(ModelToJson.connectivityLog)
    const response = yield call(api.sendConnectLog, {logs: unSyncedRecords}, auth.accessToken)
    try {
      const result = yield call(Response.resolve, response)
      yield put(DeviceLogAction.syncConnectLog(Object.keys(connect)))
    }
    catch (e) {
      console.tron.log({e})
    }
  }
}

export function *didDisconnect(api, action) {
  const { deviceLogs, app, auth } = yield select()
  if (app.isConnected) {
    const disconnect = deviceLogs.disconnect
    const unSyncedRecords = Object.keys(disconnect).map(key => disconnect[key]).filter(item => !item.sync).map(ModelToJson.connectivityLog)
    const response = yield call(api.sendDisconnectLog, {logs: unSyncedRecords}, auth.accessToken)
    try {
      const result = yield call(Response.resolve, response)
      yield put(DeviceLogAction.syncDisconnectLog(Object.keys(disconnect)))
    }
    catch (e) {
      console.tron.log({e})
    }
  }
}
