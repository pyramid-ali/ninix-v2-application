import { put, call, select, fork, take } from 'redux-saga/effects'
import { DFUEmitter } from 'react-native-nordic-dfu'
import { eventChannel, END } from 'redux-saga'

import CentralManager from '../Bluetooth/CentralManager'
import FirmwareAction from '../Redux/FirmwareRedux'
import BluetoothAction from '../Redux/BluetoothRedux'
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
    let path = null
    // if (result.firmware.version > device.firmware) {
    //   const firmwareFile = yield call(Api.download, result.firmware.path, auth.accessToken)
    //   path = firmwareFile.path()
    // }
    const firmwareFile = yield call(Api.download, result.firmware.path, auth.accessToken)
    path = firmwareFile.path()
    yield put(FirmwareAction.setLatestVersion({
      ...JsonToModel.firmware(result.firmware),
      path
    }))
  }
  catch (e) {
    yield put(FirmwareAction.didFail(e.message || 'something went wrong while checking latest firmware version, try again'))
    console.tron.log({e})
  }

}

export function *startUpdate() {
  const res = yield call(CentralManager.startUpdate.bind(CentralManager))
  console.tron.log({res})
}

export function *updateFirmware() {
  const { firmware, device } = yield select()
  yield fork(setupDFUProgress, yield call(setupDFUProgressChannel))
  yield fork(setupDFUStateChange, yield call(setupDFUStateChangeChannel))
  try {
    const res = yield call(CentralManager.updateFirmware.bind(CentralManager), firmware.path)
    yield put(FirmwareAction.didUpdateSuccess())
    yield put(BluetoothAction.connect(device.device))
  }
  catch (e) {
    yield put(FirmwareAction.didUpdateSuccess(e.message))
  }

}

export function *setupDFUProgress (channel) {
  try {
    while (true) {
      const payload = yield take(channel)
      console.tron.log({log: 'dfu pr', payload})
      yield put(FirmwareAction.dfuProgress(payload))
    }
  }
  finally {
    console.tron.log({log: 'setupDFUProgress finally'})
  }
}

export function setupDFUProgressChannel () {
  return eventChannel(emit => {
    const listener = state => {
      emit(state)
      if (state.percent === 100) {
        emit(END)
      }
    }
    DFUEmitter.addListener("DFUProgress", listener)
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
  finally {
    console.tron.log({log: 'setupDFUStateChange finally'})
  }

}

export function setupDFUStateChangeChannel () {
  return eventChannel(emit => {
    const listener = state => {
      emit(state)
      if (state.state === 'DFU_COMPLETED') {
        emit(END)
      }
    }
    console.tron.log({log: 'add dfu state listenr'})
    DFUEmitter.addListener("DFUStateChanged", listener)
    return () => {
      DFUEmitter.removeListener("DFUStateChanged")
    }
  })
}
