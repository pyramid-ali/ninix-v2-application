// Libraries
import { eventChannel } from 'redux-saga'
import { put, take, select } from 'redux-saga/effects'

// Dependencies
import DataAction from '../../Redux/DataRedux'
import BluetoothAction from '../../Redux/BluetoothRedux'
import CentralManager from '../../Bluetooth/CentralManager'
import AlarmAction from '../../Redux/AlarmRedux'
import AlarmService from '../../Services/AlarmService'
import DeviceLogAction from '../../Redux/DeviceLogRedux'
import FirmwareAction from '../../Redux/FirmwareRedux'

let isSyncing = false

export function *setupScanListener (channel) {
  try {
    while (true) {
      const devices = yield take(channel)
      yield put(BluetoothAction.didDiscover(devices))
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
      if ((result.flashStore || result.ramStore) && !isSyncing) {
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

export function *setupNinixAlarmListener (channel) {
  try {
    while (true) {
      const newAlarm = yield take(channel)
      const { alarm } = yield select()
      const output = AlarmService.receive(alarm, newAlarm)
      yield put(AlarmAction.save(output))
    }
  }
  finally {
    isSyncing = false
  }
}

export function setupNinixAlarmListenerChannel (ninix) {
  return eventChannel(emit => {
    const listener = result => {
      emit(result)
    }
    const subscription = ninix.alarmListener(listener)
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
      const state = yield select()
      if (state.firmware.updating) {
        yield put(FirmwareAction.update())
      }
      yield put(DeviceLogAction.didDisconnect({...state.device, error}))
      if (CentralManager.forceDisconnect || state.firmware.updating) {
        yield put(BluetoothAction.didDisconnect())
        CentralManager.forceDisconnect = false
        CentralManager.tries = 0
      }
      else {
        if (CentralManager.tries <= 3) {
          yield put(BluetoothAction.connect(device))
        }
        else {
          yield put(BluetoothAction.didFail(error ? error.message : 'Please clear bound information'))
          CentralManager.tries = 0
        }
      }

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
