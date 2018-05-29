// Libraries
import { put, call, fork, select } from 'redux-saga/effects'
import { PermissionsAndroid } from 'react-native'

// Dependencies
import BluetoothAction from '../Redux/BluetoothRedux'
import CentralManager from '../Bluetooth/CentralManager'
import DeviceAction from '../Redux/DeviceRedux'
import Router from '../Navigation/Router'

// Listeners
import {
  setupScanListener,
  setupScanListenerChannel,
  setupNinixStreamListener,
  setupNinixStreamListenerChannel,
  setupNinixAlarmListener,
  setupNinixAlarmListenerChannel,
  setupNinixSyncListener,
  setupNinixSyncListenerChannel,
  setupBluetoothConnectionListener,
  setupBluetoothConnectionListenerChannel
} from './Channels/BluetoothChannel'
import {checkAndGetPermission} from "../Services/Permission";

export function *connect(action) {
  // TODO: we should save logs in backend server
  const { device } = action
  try {
    // connect to device

    const connectedDevice = yield call(CentralManager.connect.bind(CentralManager), device)
    yield put(DeviceAction.setDevice(connectedDevice))
    yield put(BluetoothAction.didConnect(connectedDevice))
    yield fork(setupBluetoothConnectionListener, yield call(setupBluetoothConnectionListenerChannel, connectedDevice))
    yield CentralManager.start()
    yield put(BluetoothAction.didSetup())
    yield getDeviceInformation()
    yield fork(setupNinixStreamListener, yield call(setupNinixStreamListenerChannel, CentralManager.ninix))
    yield fork(setupNinixAlarmListener, yield call(setupNinixAlarmListenerChannel, CentralManager.ninix))

    yield getErrorLog(CentralManager.ninix)

    const { nav } = yield select()
    if (nav.index === 1) {
      if (nav.routes[1].routeName === 'AddDevice') {
        yield put(Router.backFromAddDevice)
      }
    }

  }
  catch (error) {
    // yield put(BluetoothAction.disconnect())
    yield put(BluetoothAction.didFail(error.message))
    console.tron.log({log: 'connect', error, 'message': error.message, 'code': error.errorCode})
  }

}

export function *getErrorLog(ninix) {
  const log = yield ninix.getErrorLog()
  // TODO: this log should be save and send to server
}

export function *reconnect() {
  const { device } = yield select()
  yield put(BluetoothAction.connect(device.device))
}

export function *cancelConnection() {
  const device = yield call(CentralManager.cancelConnection.bind(CentralManager))
  if (device) {
    yield put(BluetoothAction.didDisconnect())
  }
}

export function *disconnect() {

  try {
    yield CentralManager.disconnect()
  }
  catch (error) {
    yield put(BluetoothAction.didFail(error.message))
    console.tron.error({log: 'disconnect', error, 'message': error.message})
  }

}

export function *startScan() {
  const granted = yield checkAndGetPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
  if (granted) {
    yield fork(setupScanListener, yield call(setupScanListenerChannel))
  } else {
    yield put(BluetoothAction.stopScan())
    yield put(BluetoothAction.didFail('For scanning new device we have to access to your location'))
  }

}

export function *stopScan() {
  CentralManager.stopScan()
}

export function *startSync() {

  let characteristic
  const { data } = yield select()
  const last = data.stream[data.stream.length - 1]
  const ninix = CentralManager.ninix

  if (last.flashStore) {
    characteristic = yield call(ninix.flashSyncCommand.bind(ninix))
  }
  else if (last.ramStore) {
    characteristic = yield call(ninix.ramSyncCommand.bind(ninix))
  }
  else {
    return
  }

  if (characteristic) {
    yield put(BluetoothAction.didSyncBegin())
  }

  yield fork(setupNinixSyncListener, yield call(setupNinixSyncListenerChannel, ninix))
}

export function *getDeviceInformation() {

  yield put(DeviceAction.setName(yield call(CentralManager.ninix.getName.bind(CentralManager.ninix))))
  yield put(DeviceAction.setSerial(yield call(CentralManager.ninix.getSerial.bind(CentralManager.ninix))))
  yield put(DeviceAction.setFirmware(yield call(CentralManager.ninix.getFirmware.bind(CentralManager.ninix))))
  yield put(DeviceAction.setRevision(yield call(CentralManager.ninix.getHardwareRevision.bind(CentralManager.ninix))))

}

export function *turnOffDevice() {
  yield CentralManager.ninix.sendTurnOffDevice()
}
