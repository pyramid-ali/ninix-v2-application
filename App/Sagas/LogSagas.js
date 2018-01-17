import { put, call, select } from 'redux-saga/effects'
import LogAction from '../Redux/LogRedux'
import Response from '../Services/Response';

export function *pullDeviceLogs (api, action) {

  const { auth } = yield select()
  console.tron.log({
    place: '*pullDeviceLogs',
    auth
  })
  const logs = yield call(api.getDeviceLogs, auth.accessToken)

  try {
    const data = yield call(Response.resolve, logs)
    yield put(LogAction.setDeviceLogs(data.logs))
  }
  catch (error) {
    console.tron.error({
      place: '*pullDeviceLogs',
      error
    })
  }

}

export function *pushDeviceLogs (api, action) {

  const { logs, auth } = yield select()
  const localLogs = logs.device.filter((log) => {
    return !log.id
  })

  const latestLogs = yield call(api.sendDeviceLog, localLogs, auth.accessToken)

  try {
    const data = yield call(Response.resolve, latestLogs)
    yield put(LogAction.removeDeviceLogs())
    yield put(LogAction.setDeviceLogs(data.logs))
  }
  catch (error) {
    console.tron.error({
      place: '*pushDeviceLogs',
      error
    })
  }

}

export function *didDeviceConnect (api, action) {
  const { device } = action
  const { auth }= yield select()
  const response = yield call(api.sendDeviceLog, {mac: device.id, status: 'connect'}, auth.accessToken)
  try {
    const data = yield call(Response.resolve, response)
    yield put(LogAction.con)
  }
  catch (error) {

  }
}
