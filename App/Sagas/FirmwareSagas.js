import { put, call, select } from 'redux-saga/effects'
import {Platform} from 'react-native'
import FirmwareAction from '../Redux/FirmwareRedux'
import Response from '../Services/Response'
import Api from '../Services/Api'

export function *checkLatestVersion(api) {

  const { auth, device } = yield select()
  if (!device.firmware) {
    yield put(FirmwareAction.didFail(null))
    return
  }

  const response = yield call(api.checkFirmwareVersion, auth.accessToken)
  try {
    const result = yield call(Response.resolve, response)
    if (result.firmware.version > device.firmware) {
      const firmwareFile = yield call(Api.download, result.firmware.path, auth.accessToken)
      yield put(FirmwareAction.setLatestVersion({
        name: result.firmware.name,
        version: result.firmware.version,
        description: result.firmware.description,
        path: Platform.OS === 'android' ? 'file://' + firmwareFile.path() : '' + firmwareFile.path()
      }))
    }
  }
  catch (e) {
    yield put(FirmwareAction.didFail(e.message || 'something went wrong while checking latest firmware version, try again'))
    console.tron.log({e})
  }

}
