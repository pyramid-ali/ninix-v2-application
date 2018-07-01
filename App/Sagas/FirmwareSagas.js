import { put, call, select } from 'redux-saga/effects'
import { DFUEmitter } from 'react-native-nordic-dfu'
import { eventChannel } from 'redux-saga'

import CentralManager from '../Bluetooth/CentralManager'
import FirmwareAction from '../Redux/FirmwareRedux'
import JsonToModel from '../Transform/JsonToModel'
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
        ...JsonToModel.firmware(result.firmware),
        path: firmwareFile.path()
      }))
    }
  }
  catch (e) {
    yield put(FirmwareAction.didFail(e.message || 'something went wrong while checking latest firmware version, try again'))
    console.tron.log({e})
  }

}

export function *update() {
  const { firmware } = yield select()
  yield call(CentralManager.startUpdate, firmware.path)
  yield
}

export function *setupDFUProgress (channel) {
  try {
    while (true) {
      const payload = yield take(channel)
      yield put(FirmwareAction.dfuProgress(payload))
    }
  }
  finally {}
}

export function setupDFUProgressChannel () {
  return eventChannel(emit => {
    const listener = state => {
      emit(state)
    }
    DFUEmitter.addlistener("DFUProgress", listener)
    return () => {
      DFUEmitter.removeListener("DFUProgress")
    }
  })
}

export function *setupDFUStateChange (channel) {
  try {
    while (true) {
      const {state} = yield take(channel)
      yield put(FirmwareAction.dfuStateChange(state))
    }
  }
  finally {}
}

export function setupDFUStateChangeChannel () {
  return eventChannel(emit => {
    const listener = state => {
      emit(state)
    }
    DFUEmitter.addlistener("DFUStateChanged", listener)
    return () => {
      DFUEmitter.removeListener("DFUStateChanged")
    }
  })
}
