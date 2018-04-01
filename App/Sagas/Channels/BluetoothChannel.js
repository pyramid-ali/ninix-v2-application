// Libraries
import { eventChannel } from 'redux-saga'
import { put, take, select } from 'redux-saga/effects'

// Dependencies
import DataAction from '../../Redux/DataRedux'
import BluetoothAction from '../../Redux/BluetoothRedux'
import CentralManager from '../../Bluetooth/CentralManager'

let isSyncing = false

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
      const { bluetooth } = yield select()
      const result = yield take(channel)
      yield put(DataAction.didReceiveData(result))
      if ((result.flashStore || result.ramStore) && !isSyncing) {
        console.tron.log({log: 'sync is ready'})
        isSyncing = true
        yield put(BluetoothAction.startSync())
      }
    }
  }
  finally {
    isSyncing = false
  }
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
      console.tron.log({log: 'setupNinixSyncListener', result})
      yield put(DataAction.didReceiveSync(result))
      yield put(BluetoothAction.didSyncEnd())
      yield put(DataAction.didSyncEnd())
      isSyncing = false
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

export function setupBluetoothConnectionListenerChannel (device) {
  return eventChannel(emit => {
    const listener = (error, device) => {
      emit({error, device})
    }
    const subscription = device.onDisconnected(listener)
    return () => {
      subscription.remove()
    }
  })
}
