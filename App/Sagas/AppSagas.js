import { NetInfo, AppState, BackHandler } from 'react-native'
import { put, call, select, take, fork } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { NavigationActions } from 'react-navigation'

import { getToken, isTokenValid } from '../Services/TokenManager'
import AppAction from '../Redux/AppRedux'
import AuthAction from '../Redux/AuthRedux'
import ParentAction from '../Redux/ParentRedux'
import BabyAction from '../Redux/BabyRedux'
import BluetoothAction from '../Redux/BluetoothRedux'
import DataAction from '../Redux/DataRedux'
import Router from '../Navigation/Router'
import CentralManager from '../Bluetooth/CentralManager'

export function *init (action) {

  const { app } = yield select()

  // RealmStorage.get()
  // setup listeners for app state change and network connectivity
  yield fork(setupAppStatusListener, yield call(setupAppStatusListenerChannel))
  yield fork(setupNetStatusListener, yield call(setupNetStatusListenerChannel))
  yield fork(setupBluetoothStatusListener, yield call(setupBluetoothStatusListenerChannel))
  // yield fork(setupBackHandlerListener, yield call(setupBackHandlerListenerChannel))

  try {

    // we need to know current connectivity status
    const isConnected = yield call(NetInfo.isConnected.fetch)
    yield put(AppAction.didConnectivityChange(isConnected))

    // this section is belong to check user authority
    const token = yield call(getToken)

    // if token doesn't exist, check for app Introduction to showing landing page
    if (!token) {

      if (app.isIntroduced) {
        yield put(Router.navigateToLogin)
      }
      else {
        yield put(Router.navigateToLanding)
      }

      // we don't need go further
      return
    }

    if (!isTokenValid(token)) {
      const refreshToken = token.refreshToken
      if (!refreshToken) {
        yield put(Router.navigateToLogin)
        return
      }

      // TODO: refresh token
    }

    yield put(AuthAction.issueToken(token))
    yield put(AppAction.sync())
    yield put(Router.navigateToMain)

  }
  catch (error) {
    console.tron.error({
      file: 'Sagas/AppSagas.js',
      func: 'init',
      error
    })

    // when an error occurred when initializing app
    if (app.isIntroduced) {
      yield put(Router.navigateToLogin)
    }
    else {
      yield put(Router.navigateToLanding)
    }
  }

}

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
      const { auth } = yield select()
      const isConnected = yield take(channel)
      yield put(AppAction.didConnectivityChange(isConnected))
      if (isConnected && auth.accessToken) {
        yield sync()
      }
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

export function *sync () {
  // 1. get user information
  // 2. get mother and father user information
  yield put(ParentAction.getFatherInformation())
  yield put(ParentAction.getMotherInformation())
  yield put(BabyAction.getInformation())
  yield put(DataAction.syncWithServer())
  // 3. check for parent picture sync
  // 4. check data received from device is sync or not

}

export function *logout (action) {

  yield put(BluetoothAction.disconnect())
  yield put(AuthAction.revokeToken())
  yield put(Router.navigateToLogin)

}
