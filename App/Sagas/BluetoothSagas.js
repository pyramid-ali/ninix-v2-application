import { eventChannel } from 'redux-saga'
import { put, call, take, fork, cancel } from 'redux-saga/effects'
import BluetoothAction from '../Redux/BluetoothRedux'
import CentralManager from '../Bluetooth/CentralManager'

export function *connect(action) {
  // TODO: we should save logs in backend server
  const { device } = action
  try {
    const ninix = yield CentralManager.connect(device)
    yield call(ninix.bond.bind(ninix))
    yield put(BluetoothAction.didConnect(device))
    yield fork(setupBluetoothConnectionListener, yield call(setupBluetoothConnectionListenerChannel))
    console.tron.log({log: 'connect', ninix})
    yield fork(setupNinixStreamListener, yield call(setupNinixStreamListenerChannel, ninix))
    console.tron.log({log: 'connect end'})
  }
  catch (error) {
    yield CentralManager.disconnect()
    yield put(BluetoothAction.didFail(error.message))
    console.tron.error({log: 'connect', error, 'message': error.message})
  }

}

export function *cancelConnection () {
  // TODO: cancel connect process
  // yield cancel(connect)
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
      const { temperature, respiratory, orientation, humidity } = result
      console.tron.log({log: 'result receive'})
      console.tron.log({result})
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
