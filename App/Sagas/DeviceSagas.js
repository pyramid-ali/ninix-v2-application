import { put, call, select } from 'redux-saga/effects'
import DeviceAction from '../Redux/DeviceRedux'
import Response from '../Services/Response';

export function *pullDeviceLogs (api, action) {

  const { auth } = yield select()

  const logs = yield call(api.getDeviceLogs, auth.accessToken)

  try {
    const data = yield call(Response.resolve, logs)
    yield put(DeviceAction.setDeviceLogs(data.logs))
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
    yield put(DeviceAction.removeDeviceLogs())
    yield put(DeviceAction.setDeviceLogs(data.logs))
  }
  catch (error) {
    console.tron.error({
      place: '*pushDeviceLogs',
      error
    })
  }

}

export function *getLatestFirmwareVersion (api, action) {
  const { auth } = yield select();
  const fvResponse = yield call(api.getLatestFirmwareVersion, auth.accessToken);

  try {
    const data = yield call(Response.resolve, fvResponse)
    yield put(DeviceAction.setState({latestFirmwareVersion: data.version}))
  }
  catch (error) {

  }
}


export function *getLocalFirmwareVersion (action) {

}

export function *didDeviceConnect (api, action) {
  const { device } = action
  const { auth }= yield select()
  const response = yield call(api.sendDeviceLog, {mac: device.id, status: 'connect'}, auth.accessToken)
  try {
    const data = yield call(Response.resolve, response)
    //yield put(DeviceAction.connect())
  }
  catch (error) {

  }
}
