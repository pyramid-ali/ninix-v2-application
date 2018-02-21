import { eventChannel } from 'redux-saga'
import { put, call, take, fork } from 'redux-saga/effects'
import BluetoothAction from '../Redux/BluetoothRedux'
import CentralManager from '../Bluetooth/CentralManager'
import DataAction from '../Redux/DataRedux'

export function *connect(action) {
  // TODO: we should save logs in backend server
  const { device } = action
  try {

    const connectedDevice = yield call(CentralManager.connect.bind(CentralManager), device)
    yield fork(setupBluetoothConnectionListener, yield call(setupBluetoothConnectionListenerChannel))
    yield put(BluetoothAction.didConnect(connectedDevice))
    yield call(CentralManager.start.bind(CentralManager))
    yield fork(setupNinixStreamListener, yield call(setupNinixStreamListenerChannel, CentralManager.ninix))

  }
  catch (error) {
    yield CentralManager.disconnect()
    yield put(BluetoothAction.didFail(error.message))
    console.tron.error({log: 'connect', error, 'message': error.message})
  }

}

export function *cancelConnection () {
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

export function *startSync () {
  const ninix = CentralManager.ninix
  console.tron.log({log: 'start sync'})
  const characteristic = yield call(ninix.sendSyncCommand.bind(ninix))
  console.tron.log({log: 'start sync char', characteristic})
  if (characteristic) {
    yield put(BluetoothAction.didSyncBegin())
  }
  yield fork(setupNinixSyncListener, yield call(setupNinixSyncListenerChannel, ninix))
}

export function *setupScanListener (channel) {
  try {
    while (true) {
      const device = yield take(channel)
      yield put(BluetoothAction.didDiscover(CentralManager.scannedDevices))
    }
  }
  finally {}
}

export function setupScanListenerChannel () {
  return eventChannel(emit => {
    const listener = state => {
      emit(state)
    }
    CentralManager.scanForDevices(listener)
    return () => {
      CentralManager.stopScan()
    }
  })
}

export function *setupNinixStreamListener (channel) {
  try {
    while (true) {
      const result = yield take(channel)
      yield put(DataAction.didReceiveData(result))

    }
  }
  finally {}
}

export function setupNinixStreamListenerChannel (ninix) {
  return eventChannel(emit => {
    const listener = result => {
      emit(result)
    }
    const subscription = ninix.stream(listener)
    return () => {
      subscription.remove()
    }
  })
}

export function *setupNinixSyncListener (channel) {
  try {
    while (true) {
      const result = yield take(channel)
      yield put(DataAction.didReceiveSync(result))
    }
  }
  finally {}
}

export function setupNinixSyncListenerChannel (ninix) {
  return eventChannel(emit => {
    const listener = result => {
      emit(result)
    }
    const subscription = ninix.sync(listener)
    return () => {
      subscription.remove()
    }
  })
}

export function *setupBluetoothConnectionListener (channel) {
  try {
    while (true) {
      const { error, device } = yield take(channel)
      yield put(BluetoothAction.didFail(error ? error.message : null))
      yield put(BluetoothAction.didDisconnect())
    }
  }
  finally {}
}

export function setupBluetoothConnectionListenerChannel () {
  return eventChannel(emit => {
    const listener = (error, device) => {
      emit({error, device})
    }
    const subscription = CentralManager.onDisconnected(listener)
    return () => {
      subscription.remove()
    }
  })
}
