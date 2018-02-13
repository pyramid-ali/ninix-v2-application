import { eventChannel } from 'redux-saga'
import { put, call, take, fork } from 'redux-saga/effects'
import BluetoothAction from '../Redux/BluetoothRedux'
import CentralManager from '../Bluetooth/CentralManager'

export function *connect(action) {

  const { device } = action
  try {
    console.tron.log({log: 'connect'})
    const ninix = yield CentralManager.connect(device)
    yield call(ninix.discover.bind(ninix))
    yield call(ninix.bond.bind(ninix))
    yield put(BluetoothAction.didConnect(device))
    yield fork(setupNinixStreamListener, yield call(setupNinixStreamListenerChannel, ninix))
  }
  catch (error) {
    console.tron.error({log: 'connect', error, 'message': error.message})
  }

}

export function *scan() {
  yield fork(setupScanListener, yield call(setupScanListenerChannel))
}

export function *stopScan() {
  CentralManager.stopScan()
}

export function *setupScanListener (channel) {
  try {
    while (true) {
      const device = yield take(channel)
      yield put(BluetoothAction.addScannedDevices(CentralManager.scannedDevices))
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
