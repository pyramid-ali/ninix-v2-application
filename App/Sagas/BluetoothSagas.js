// Libraries
import { put, call, fork, select } from 'redux-saga/effects'

// Dependencies
import BluetoothAction from '../Redux/BluetoothRedux'
import CentralManager from '../Bluetooth/CentralManager'
import DeviceAction from '../Redux/DeviceRedux'

// Listeners
import {
  setupScanListener,
  setupScanListenerChannel,
  setupNinixStreamListener,
  setupNinixStreamListenerChannel,
  setupNinixSyncListener,
  setupNinixSyncListenerChannel,
  setupBluetoothConnectionListener,
  setupBluetoothConnectionListenerChannel
} from './Channels/BluetoothChannel'

export function *connect(action) {
  // TODO: we should save logs in backend server
  const { device } = action
  try {
    // connect to device
    const connectedDevice = yield call(CentralManager.connect.bind(CentralManager), device)

    yield put(DeviceAction.setDevice(connectedDevice))
    yield put(BluetoothAction.didConnect(connectedDevice))

    // setup connection listener
    yield fork(setupBluetoothConnectionListener, yield call(setupBluetoothConnectionListenerChannel, device))

    yield call(CentralManager.start.bind(CentralManager))
    yield call(BluetoothAction.didSetup())

    yield getDeviceInformation()

    yield fork(setupNinixStreamListener, yield call(setupNinixStreamListenerChannel, CentralManager.ninix))

  }
  catch (error) {
    // yield CentralManager.disconnect()
    yield put(BluetoothAction.didFail(error.message))
    console.tron.error({log: 'connect', error, 'message': error.message, 'code': error.errorCode})
  }

}

export function *cancelConnection() {
  yield CentralManager.disconnect()
  yield put(BluetoothAction.didDisconnect())
  // TODO: Cancel Bluetooth Connection
}

export function *disconnect() {
  // TODO: we should save logs in backend server
  try {
    yield CentralManager.disconnect()
    yield put(BluetoothAction.didDisconnect())
  }
  catch (error) {
    yield put(BluetoothAction.didFail(error.message))
    console.tron.error({log: 'disconnect', error, 'message': error.message})
  }

}

export function *startScan() {
  yield fork(setupScanListener, yield call(setupScanListenerChannel))
}

export function *stopScan() {
  CentralManager.stopScan()
}

export function *startSync() {
  console.tron.log({log: 'start sync'})
  let characteristic
  const { data } = yield select()
  const last = data.stream[data.stream.length - 1]
  const ninix = CentralManager.ninix

  if (last.flashStore) {
    characteristic = yield call(ninix.flashSyncCommand.bind(ninix))
    console.tron.log({log: 'flashStore sync', characteristic})
  }
  else if (last.ramStore) {
    characteristic = yield call(ninix.ramSyncCommand.bind(ninix))
    console.tron.log({log: 'ramStore sync', characteristic})
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
  yield put(DeviceAction.setFirmware(yield call(CentralManager.ninix.getFirmware.bind(CentralManager.ninix))))
  yield put(DeviceAction.setRevision(yield call(CentralManager.ninix.getHardwareRevision.bind(CentralManager.ninix))))

}
