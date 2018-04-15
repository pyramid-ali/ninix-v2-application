import { NetInfo, AppState } from 'react-native'
import { put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import AppAction from '../../Redux/AppRedux'
import BluetoothAction from '../../Redux/BluetoothRedux'
import CentralManager from '../../Bluetooth/CentralManager'

export function *setupAppStatusListener (channel) {
  try {
    while (true) {
      const appState = yield take(channel)
      yield put(AppAction.didStateChange(appState))
    }
  }
  finally {}
}

export function setupAppStatusListenerChannel () {
  return eventChannel(emit => {
    const listener = nextAppState => {
      emit(nextAppState)
    }
    AppState.addEventListener('change', listener)
    return () => {
      AppState.removeEventListener('change', listener)
    }
  })
}

export function *setupNetStatusListener (channel) {
  try {
    while (true) {

      const isConnected = yield take(channel)
      yield put(AppAction.didConnectivityChange(isConnected))
      if (isConnected) yield put(AppAction.sync())
    }
  }
  finally {}
}

export function setupNetStatusListenerChannel () {
  return eventChannel(emit => {
    const listener = isConnected => {
      emit(isConnected)
    }
    NetInfo.isConnected.addEventListener('connectionChange', listener)
    return () => {
      AppState.isConnected.removeEventListener('connectionChange', listener)
    }
  })
}

export function *setupBluetoothStatusListener (channel) {
  try {
    while (true) {
      const state = yield take(channel)
      yield put(BluetoothAction.didStateChange(state))
    }
  }
  finally {}
}

export function setupBluetoothStatusListenerChannel () {
  return eventChannel(emit => {
    const listener = state => {
      emit(state)
    }
    const subscription = CentralManager.addStateListener(listener, true)
    return () => {
      subscription.remove()
    }
  })
}
