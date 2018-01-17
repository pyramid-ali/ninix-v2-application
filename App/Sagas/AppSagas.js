import { NetInfo, AppState } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { put, call, select, take, fork, join } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import moment from 'moment';

import { getToken } from '../Services/TokenManager'
import AppAction from '../Redux/AppRedux'
import AuthAction from '../Redux/AuthRedux'
import ParentAction from '../Redux/ParentRedux'
import BabyAction from '../Redux/BabyRedux'
import BluetoothAction from '../Redux/BluetoothRedux'
import Ble from '../Services/Ble'

const gotoLoginPage = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'AuthenticationScreen'})
  ]
})

const gotoIntroduction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'IntroductionPage'})
  ]
})

const gotoMainPage = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})

export function *init (action) {

  const { app } = yield select()

  // setup listeners for app state change and network connectivity
  yield fork(setupAppStatusListener, yield call(setupAppStatusListenerChannel))
  yield fork(setupNetStatusListener, yield call(setupNetStatusListenerChannel))
  yield fork(setupBluetoothStatusListener, yield call(setupBluetoothStatusListenerChannel))

  try {

    // we need to know current connectivity status
    const isConnected = yield call(NetInfo.isConnected.fetch)
    yield put(AppAction.connectivityChanged(isConnected))

    // this section is belong to check user authority
    const token = yield call(getToken)

    if (!app.isIntroduced && !token) {
      yield put(gotoIntroduction)
      return
    }

    if (!token) {
      yield put(gotoLoginPage)
      return
    }


    if (moment(token.expiresAt).diff(moment(), 'hours')  < 1) {
      const refreshToken = token.refreshToken
      if (!refreshToken) {
        yield put(gotoLoginPage)
      }
      // TODO: refresh token, if failed then go to login page
    }


    // TODO: dispatch get user action
    yield put(AuthAction.issueToken(token))
    yield put(AppAction.sync())

    yield put(gotoMainPage)

  }
  catch (error) {
    console.tron.log({
      place: 'init appSaga',
      error
    })
    // TODO: dispatch error in app initialize
    // TODO: goto login page if any error occurred
  }

}

export function *setupAppStatusListener (channel) {
  try {
    while (true) {
      const appState = yield take(channel)
      console.log(appState, 'app state')
      yield put(AppAction.stateChanged(appState))
    }
  }
  finally {
    console.log('app state finally')
  }
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

      yield put(AppAction.connectivityChanged(isConnected))
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
    Ble.addListener(listener, true)
    return () => {
      Ble.removeListener()
    }
  })
}

export function *sync (action) {
  // 1. get user information
  // 2. get mother and father user information
  yield put(ParentAction.getFatherInformation())
  yield put(ParentAction.getMotherInformation())
  yield put(BabyAction.getInformation())
  // 3. check for parent picture sync
  // 4. check data received from device is sync or not

}
